import { hashPass } from "@/utils/hash";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, email, otp, password } = body;

    if (!otp)
      return NextResponse.json(
        {
          message: "Kindly verify your email and submit the verification code",
        },
        { status: 400 }
      );

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const data = await db.otp.findUnique({ where: { email, otp } });

    if (data && data?.expiresAt <= new Date()) {
      return NextResponse.json(
        { message: "Invalid or Expired verification code" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPass(password);

    const userExist = await db.user.findUnique({ where: { email } });

    if (userExist) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 302 }
      );
    }

    const newUser = await db.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    if (newUser) {
      const status = await db.otp.delete({ where: { email } });

      console.log("OTP USED", status);

      return NextResponse.json(
        { message: "Your account has been successfully created" },
        { status: 201 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 500 }
    );
  }
};
