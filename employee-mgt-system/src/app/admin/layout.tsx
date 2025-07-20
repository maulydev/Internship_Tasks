import { verifyJwt } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return redirect("/signin");

  try {
    verifyJwt(refreshToken, "refresh");

    return <div>{children}</div>;
  } catch (error) {
    redirect("/signin");
  }
};

export default AdminLayout;
