// import { auth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  // const result = await auth(request);

  // if (!result || !result.decodedToken) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const response = NextResponse.json(
    { message: "Hope to see you again! 😌" },
    { status: 200 }
  );

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    expires: new Date(0),
  });

  return response;
};
