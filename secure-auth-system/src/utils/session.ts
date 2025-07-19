import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) return null;

  const payload = verifyJwt(token, "refresh");
  if (!payload) return null;

  return { session: {}, authenticated: true };
};
