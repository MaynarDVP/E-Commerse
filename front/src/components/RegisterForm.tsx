"use client";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { Toast } from "./Toast";
import { IRegisterForm } from "@/Interfaces/IRegisterForm";
import { ValidateRegister } from "@/helpers/validations";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterForm() {
  const { register } = useAuth();

  const [form, setForm] = useState<IRegisterForm>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = ValidateRegister(form);
    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.address ||
      validationErrors.phone
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(form);
      Toast.fire("Registered Successfully", "success");
    } catch (error: unknown) {
      Toast.fire("Registration failed, please try again", "error");
      console.log(error);
      
    }
  };

  const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = name === "phone" ? parseInt(e.target.value) || 0 : e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldErrors = ValidateRegister({
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
        <h1 className="text-2xl font-semibold text-center text-black">Create an Account</h1>
        <form onSubmit={HandleSubmit}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={form.name}
            onChange={ChangeHandler}
            error={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={ChangeHandler}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={ChangeHandler}
            error={errors.password}
          />
          <FormInput
            label="Address"
            type="text"
            name="address"
            value={form.address}
            onChange={ChangeHandler}
            error={errors.address}
          />
          <FormInput
            label="Phone"
            type="number"
            name="phone"
            value={form.phone.toString()}
            onChange={ChangeHandler}
            error={errors.phone}
          />
          <button
            type="submit"
            className=" Button-Form"
          >
            Register
          </button>
          <p className="mt-4 text-sm text-center text-gray-600 font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
