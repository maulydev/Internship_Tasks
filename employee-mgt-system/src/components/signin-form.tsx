/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { validateEmail, validatePassword } from "@/utils/validator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLock } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";

type FormData = { user_email: string; user_password: string };
type InputError = { emailError: string; passwordError: string };

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<InputError>({
    emailError: "",
    passwordError: "",
  });
  const [formData, setFormData] = useState<FormData>({
    user_email: "",
    user_password: "",
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

      const emailValidation = validateEmail(formData.user_email);
      const passwordValidation = validatePassword(formData.user_password);

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
        router.replace("/admin");
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
      <h1 className="text-3xl font-bold text-center text-blue-500 mt-8">
        Sign In
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Fill out the form below to login
      </p>
      <div>
        <div className="bg-gray-100 flex items-center pl-4 peer">
          <CgMail className="text-2xl text-gray-400" />
          <input
            id="email"
            name="user_email"
            type="email"
            placeholder="Email"
            autoComplete="new-password"
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
            name="user_password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            minLength={8}
            className="px-3 py-4 w-full outline-none"
            autoComplete="new-password"
            onChange={handleInputChange}
          />

          {formData?.user_password?.trim() !== "" && (
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
        disabled={isSubmitting || !formData.user_email || !formData.user_password}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 w-full cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <VscLoading className="text-2xl animate-spin mx-auto" />
        ) : (
          "Sign In"
        )}
      </button>

      <div className="text-center text-gray-500 mt-2">
        <Link href="/password-reset" className="text-sm hover:underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
