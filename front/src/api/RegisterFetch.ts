import { IRegisterForm } from "@/Interfaces/IRegisterForm";


const APIFETCH = process.env.NEXT_PUBLIC_APIFETCH;

export const register = async (formData: IRegisterForm) => {
  try {
    const res = await fetch(`${APIFETCH}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
    }

    return {
      success: true,
      message: "You have been registered successfully.",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Registration failed.",
    };
  }
};
