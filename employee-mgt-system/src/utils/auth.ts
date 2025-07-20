import { verifyJwt } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const auth = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken || !verifyJwt(refreshToken, "refresh")) return null;
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");

    const accessToken = authHeader.split(" ")[1];
    const decodedToken = verifyJwt(accessToken, "access");

    // console.log("_decodedToken", decodedToken)

    // if (!decodedToken) return null;

    return { decodedToken };
  } catch {
    return null;
  }
};
