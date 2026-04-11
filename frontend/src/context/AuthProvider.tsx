"use client";

import { api } from "@/lib/axios";
import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
};

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const { data } = await api.post("/auth/login", { username, password });

    const { user, accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    setUser(user);
    router.push("/Client");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await api.post("auth/register", { username, email, password });
  };

  useEffect(() => {
    const fetchMe = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const { data } = await api.get<{ user: User }>("/auth/me", {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
