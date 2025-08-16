/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLock } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "@/utils/validator";
import { CgMail } from "react-icons/cg";

type FormData = {
  email: string;
  otp: string;
  otpFor: "signup" | "reset";
  password: string;
};

type InputError = {
  emailError: string;
  passwordError: string;
};

const PasswordResetForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
    otpFor: "reset",
    password: "",
  });
  const [error, setError] = useState<InputError>({
    emailError: "",
    passwordError: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearInput = () => {
    setFormData({ email: "", otp: "", otpFor: "reset", password: "" });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post("/api/send-otp", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setIsOtpSent(true);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unknown error, Contact Support"
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailValidation = validateEmail(formData.email);
      const passwordValidation = validatePassword(formData.password);

      setError({
        emailError: emailValidation.error,
        passwordError: passwordValidation.error,
      });

      if (emailValidation.error || passwordValidation.error) {
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("/api/password-reset", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success(response.data?.message);
        handleClearInput();
        router.push("/signin");
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
      className="bg-white p-8 space-y-4 w-full max-w-md"
    >
      <h1 className="text-3xl font-bold text-center text-blue-500">
        Reset Password
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Reset your old password
      </p>

      <div>
        <div className="bg-gray-100 flex items-center pl-4">
          <CgMail className="text-2xl text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="px-3 py-4 w-full outline-none peer"
            onChange={handleInputChange}
          />
          {formData?.email && (
            <button
              type="button"
              onClick={handleEmailVerification}
              className="px-4 py-5 font-bold text-white text-xs bg-amber-500 cursor-pointer hidden peer-valid:block"
            >
              Verify
            </button>
          )}
        </div>
        {error.emailError && (
          <p className="text-xs text-red-500 pt-2">{error.emailError}</p>
        )}
      </div>

      {isOtpSent && (
        <div>
          <div className="bg-gray-100 flex items-center pl-4">
            <GoNumber className="text-2xl text-gray-400" />
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Verification Code"
              className="px-3 py-4 w-full outline-none"
              onChange={handleInputChange}
              minLength={8}
              maxLength={8}
            />
          </div>
        </div>
      )}

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
          {formData.password.trim() !== "" && (
            <div className="text-gray-500 pr-4">
              <button
                type="button"
                onClick={handleTogglePassword}
                className="cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}
        </div>
        {error.passwordError && (
          <p className="text-xs text-red-500 pt-2">{error.passwordError}</p>
        )}
      </div>

      <button
        disabled={isSubmitting || !formData.email || !formData.password}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 w-full cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <VscLoading className="text-2xl animate-spin mx-auto" />
        ) : (
          "Sign Up"
        )}
      </button>

      <p className="text-center text-gray-500 text-sm">
        Got your password?{" "}
        <Link href="/signin" className="text-blue-500 font-bold">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default PasswordResetForm;
