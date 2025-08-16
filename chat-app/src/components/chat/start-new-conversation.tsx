"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const StartConversation = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleShowForm = () => setShowForm((prev) => !prev);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitConversation = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setIsPending(true);

      const res = await axios.post(
        "/api/conversations/startnew",
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const { id, name } = res.data;
      toast.success(`Starting chat with ${name}`);
      setShowForm(false);
      setEmail("");

      router.push(`/chat/${id}?_p=1`);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Failed to find user");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShowForm}
        className="text-lg bg-blue-500 px-4 py-2 cursor-pointer text-white rounded-lg"
      >
        <BiPlus />
      </button>

      <div
        className={`${
          showForm ? "visible" : "invisible"
        } bg-black/50 fixed inset-0 text-gray-800 z-50`}
      >
        <form
          onSubmit={submitConversation}
          className={`${
            showForm ? "translate-y-0" : "-translate-y-[110%]"
          } duration-700 bg-gray-700 shadow-xl p-6 container mx-auto my-4 grid grid-cols-1 gap-4 max-w-xl relative font-medium rounded-lg`}
        >
          <button
            disabled={isPending}
            onClick={handleShowForm}
            type="button"
            className="absolute right-5 top-5 text-xl cursor-pointer text-white disabled:cursor-not-allowed"
          >
            <CgClose />
          </button>

          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-100">
              Start New Conversation
            </h1>
            <p className="text-gray-300 font-normal">
              Enter the user’s email to start chatting.
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-gray-200">
              Email
            </label>
            <input
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={email}
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              className="py-4 outline-none bg-gray-800 px-4 text-gray-100 rounded-lg"
            />
          </div>

          <button
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-4 p-4 cursor-pointer rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && <VscLoading className="animate-spin text-lg" />}
            <span>Start Chat</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default StartConversation;
