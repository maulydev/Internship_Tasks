import { checkPass } from "@/utils/hash";
import { signJwt } from "@/utils/jwt";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json(
        { message: "Invalid credentails" },
        { status: 400 }
      );

    const isAuthenticated = await checkPass(password, user.password);

    if (!isAuthenticated) {
      return NextResponse.json(
        { message: "Invalid credentails" },
        { status: 400 }
      );
    }

    const payload = { name: user.name, userId: user?.id };
    const access = signJwt(payload, "access") || "";
    const refresh = signJwt(payload, "refresh") || "";

    const response = NextResponse.json(
      { message: `Welcome back, ${user?.name.split(" ")[0]} 👋`, data: { access } },
      { status: 200 }
    );

    response.cookies.set("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
