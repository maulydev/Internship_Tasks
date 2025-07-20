import GetApi from "@/components/get-api";
import SignOut from "@/components/signout";
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
      <div className="min-h-svh flex flex-col justify-center items-center">
        {children}
        <div className="flex items-center mt-8">
          <SignOut />
          <GetApi />
        </div>
      </div>
    );
  } catch (error) {
    redirect("/signin");
  }
};

export default ProtectedLayout;
