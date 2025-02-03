"use client";
import { useState } from "react";
import { FormInput } from "@/component/FormInput";
import { Toast } from "@/component/Toast";
import { ILoginForm } from "@/Interfaces/ILoginForm";
import { ValidateLogingForm } from "@/helpers/validations";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";



export default function LoginForm() {
  const { login } = useAuth();

  const [form, setForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = ValidateLogingForm(form);
    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(form);
      Toast.fire("Logged Successfully", "success");
    } catch (error: unknown) {
      Toast.fire("Invalid Credentials, Please try again", "error");
      console.log(error);
      
    }
  };

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldErrors = ValidateLogingForm({
      ...form,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof typeof fieldErrors],
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-black">Log In</h1>
        <form onSubmit={HandleSubmit} className="mt-6 space-y-4">
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email || ""}
            onChange={ChangeHandler}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password || ""}
            onChange={ChangeHandler}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center text-gray-600 font-semibold">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}