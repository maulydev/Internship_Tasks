/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Payload } from "@/types";
import { validateEmail, validatePassword } from "@/utils/validator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

type FormData = { email: string; password: string };
type InputError = { emailError: string; passwordError: string };

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<InputError>({
    emailError: "",
    passwordError: "",
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const emailValidation = validateEmail(formData.email);
      const passwordValidation = validatePassword(formData.password);

      setError({
        emailError: emailValidation.error,
        passwordError: passwordValidation.error,
      });

      if (emailValidation.error || passwordValidation.error) {
        return;
      }

      setIsSubmitting(true);

      const response = await axios.post("/api/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.status === 200) {
        const accessToken = response?.data?.data?.access;

        if (!accessToken) {
          toast.error("Missing access");
          return;
        }

        localStorage.setItem("access", accessToken);
        toast.success(response?.data?.message || "Sign In successful");

        const access = jwtDecode(accessToken) as Payload;

        if (access?.role === "ADMIN") {
          router.replace("/protected/admin");
        } else if (access?.role === "USER") {
          router.replace("/protected/user");
        } else {
          router.replace("/not-found");
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 space-y-4 w-full max-w-sm"
    >
      {/* <div className="bg-gray-100 w-max p-8 rounded-full mx-auto -mt-22 border-[16px] border-blue-500">
        <FaUser className="text-4xl" />
      </div> */}
      <h1 className="text-3xl font-bold text-center text-blue-500 mt-8">
        Sign In
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Fill out the form below to login
      </p>
      <div>
        <div className="bg-gray-100 flex items-center pl-4 peer">
          <BiUser className="text-2xl text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="px-3 py-4 w-full outline-none"
            onChange={handleInputChange}
          />
        </div>
        {error.emailError && (
          <p className="text-xs text-red-500 pt-2">{error.emailError}</p>
        )}
      </div>
      <div>
        <div className="bg-gray-100 flex items-center pl-4">
          <BiLock className="text-2xl text-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            minLength={8}
            className="px-3 py-4 w-full outline-none"
            onChange={handleInputChange}
          />

          {formData?.password?.trim() !== "" && (
            <div className="text-gray-500 pr-4 [&>*]:cursor-pointer">
              {!showPassword ? (
                <button type="button" onClick={handleTogglePassword}>
                  <FaEye />
                </button>
              ) : (
                <button type="button" onClick={handleTogglePassword}>
                  <FaEyeSlash />
                </button>
              )}
            </div>
          )}
        </div>
        {error?.passwordError && (
          <p className="text-xs text-red-500 pt-2">{error?.passwordError}</p>
        )}
      </div>

      <button
        disabled={isSubmitting || !formData.email || !formData.password}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 w-full cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <VscLoading className="text-2xl animate-spin mx-auto" />
        ) : (
          "Sign In"
        )}
      </button>

      <div className="flex items-center justify-center gap-x-4 text-gray-500 mt-2">
        <Link href="/password-reset" className="text-sm hover:underline">
          Forgot password?
        </Link>
        |
        <p className="text-sm">
          New here?{" "}
          <Link href="/signup" className="text-blue-500 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
