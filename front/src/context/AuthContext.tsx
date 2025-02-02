/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ILoginForm } from "@/Interfaces/ILoginForm";
import { IUser } from "@/Interfaces/IUsers";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IRegisterForm } from "@/Interfaces/IRegisterForm";
import { IProduct } from "@/Interfaces/IProduct";

const APIFETCH = process.env.NEXT_PUBLIC_APIFETCH;

interface IAuthContext {
  user: IUser | null;
  login: (LoginForm: ILoginForm) => Promise<void>;
  isAuth: boolean;
  logout: () => void;
  token: string | null;
  register: (RegisterForm: IRegisterForm) => void;
  GetProducts: () => Promise<IProduct[]>;
  GetProductById: (id: string) => Promise<IProduct | undefined>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: async (LoginForm: ILoginForm) => {},
  logout: () => {},
  isAuth: false,
  token: null,
  register: async (RegisterForm: IRegisterForm) => {},
  GetProducts: async () => [],
  GetProductById: async (id: string) => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuth(true);
    } else {
      setUser(null);
      setIsAuth(false);
    }
  }, []);

  useEffect(()=> {
    localStorage.removeItem("cart");
  }, []);

  const login = async (LoginForm: ILoginForm) => {
    if (!LoginForm) return; // Evita la advertencia de que no se usa
    const res = await axios.post(`${APIFETCH}/users/login`, LoginForm);
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    setIsAuth(true);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart")

    router.push("/");
  };

  const register = async (RegisterForm: IRegisterForm) => {
    if (!RegisterForm) return; 
    const res = await axios.post(`${APIFETCH}/users/register`, RegisterForm);
    router.push("/login")
    return res;
  };

  const GetProducts = async (): Promise<IProduct[]> => {
    const res = await axios.get(`${APIFETCH}/products`);
    return res.data;
  };

  const GetProductById = async (id: string): Promise<IProduct | undefined> => {
    const products = await GetProducts();
    const product = products.find((product) => product.id.toString() === id);
    return product;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuth, token, register, GetProducts, GetProductById }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
