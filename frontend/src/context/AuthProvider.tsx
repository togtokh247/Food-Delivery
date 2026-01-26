"use client";

import { api } from "@/lib/axios";
import { createContext, useContext, useState, PropsWithChildren } from "react";

type AuthContextType = {
  user: User | null;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const { data } = await api.post("auth/login", {
      username,
      password,
    });

    const { user, accessToken } = data;

    setUser(user);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await api.post("auth/register", {
      username,
      email,
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
