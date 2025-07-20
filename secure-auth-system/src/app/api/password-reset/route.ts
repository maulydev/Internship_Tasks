import { hashPass } from "@/utils/hash";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, otp, password } = body;

    if (!otp)
      return NextResponse.json(
        {
          message: "Kindly verify your email and submit the verification code",
        },
        { status: 400 }
      );

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const data = await db.otp.findUnique({ where: { email, otp } });

    if (!data || (data && data?.expiresAt <= new Date())) {
      return NextResponse.json(
        { message: "Invalid or Expired verification code" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPass(password);

    const userExist = await db.user.findUnique({ where: { email } });

    if (!userExist) {
      return NextResponse.json(
        { message: "Email not associated with any account" },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      data: { password: hashedPassword },
      where: { email },
    });

    if (updatedUser) {
      await db.otp.delete({ where: { email } });

      return NextResponse.json(
        { message: "Your password has been successfully reset" },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 500 }
    );
  }
};
