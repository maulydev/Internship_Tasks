import { generateOTP, generateOTPExpiry } from "@/utils/otp";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, otpFor } = body;

    if (!email)
      return NextResponse.json({
        message: "Missing field: <email>",
        status: 400,
      });

    const otp = generateOTP(8);
    const otpExpiry = generateOTPExpiry(); // this defaults to 5min

    const emailExist = await db.user.findUnique({ where: { email } });

    if (emailExist && otpFor === "signup")
      return NextResponse.json(
        { message: "Email already registered!" },
        { status: 302 }
      );

    const data = await db.otp.create({
      data: { email: email, otp: otp, expiresAt: otpExpiry },
    });

    // SEND OTP TO EMAIL
    console.log("OTP data", data);

    return NextResponse.json(
      {
        message: `Kindly check your email for the verification code ${data.otp}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "OTP Failed" }, { status: 500 });
  }
};
