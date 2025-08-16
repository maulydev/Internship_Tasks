"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignOut = () => {
  const router = useRouter();

  const handleSignout = async () => {
    const response = await axios.post("/api/signout");

    if (response?.status === 200) {
      toast.warn(response?.data?.message);
      router.replace("/signin");
      localStorage.clear();
    }
  };
  return (
    <button
      onClick={handleSignout}
      className="bg-red-500 text-white px-8 py-4 w-max cursor-pointer hover:bg-red-400"
    >
      Logout
    </button>
  );
};

export default SignOut;
