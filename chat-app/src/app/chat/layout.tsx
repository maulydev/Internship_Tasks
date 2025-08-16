import Sidebar from "@/components/chat/sidebar";
import { verifyJwt } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return redirect("/signin");

  try {
    verifyJwt(refreshToken, "refresh");

    return (
      <div className="max-w-6xl mx-auto flex">
        <Sidebar />
        {children}
      </div>
    );
  } catch (error) {
    console.log(error);
    redirect("/signin");
  }
};

export default ProtectedLayout;
