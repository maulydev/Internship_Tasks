import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  console.log("session", session)

  if (!session || session.session.role !== "USER") {
    redirect("/not-found");
  }

  return <div>{children}</div>;
};

export default UserLayout;
