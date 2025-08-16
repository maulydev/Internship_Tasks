import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import { Payload } from "@/types";

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) return null;

  const payload = verifyJwt(token, "refresh") as Payload;
  if (!payload) return null;

  return {
    session: { userId: payload.userId, name: payload.name },
    authenticated: true,
  };
};
