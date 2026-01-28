"use client";

import { api } from "@/lib/axios";
import { createContext, useContext, useState, PropsWithChildren } from "react";
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
    const { data } = await api.post("auth/login", { username, password });

    const { user, accessToken } = data;
    setUser(user);
    router.push("/");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await api.post("auth/register", { username, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
