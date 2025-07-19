import { signJwt, verifyJwt } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decodedRefresh = verifyJwt(refreshToken, "refresh") as any;

    console.log(decodedRefresh)

    if (!decodedRefresh)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const newAccessToken = signJwt(
      {
        name: decodedRefresh?.name,
        userId: decodedRefresh.userId,
        role: decodedRefresh.role,
      },
      "access"
    );

    return NextResponse.json({ access: newAccessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
