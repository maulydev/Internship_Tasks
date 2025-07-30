import { auth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = (request: NextRequest) => {
  // const result = auth(request);

  

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
