import axios from "axios";
import { ILoginForm } from "@/Interfaces/ILoginForm";

const APIFETCH = process.env.NEXT_PUBLIC_APIFETCH;

export const login = async (LoginForm: ILoginForm) => {
  try {
    const res = await axios.post(`${APIFETCH}/users/login`, LoginForm, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token, user } = res.data;

    return {
      success: true,
      message: "Login successful.",
      token,
      user,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed.",
    };
  }
};
