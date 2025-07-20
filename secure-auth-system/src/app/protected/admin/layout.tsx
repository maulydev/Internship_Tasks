import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  if (!session || session.session.role !== "ADMIN") {
    redirect("/not-found");
  }

  return <div>{children}</div>;
};

export default AdminLayout;
