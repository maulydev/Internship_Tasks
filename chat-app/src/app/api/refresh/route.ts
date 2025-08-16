import { Payload } from "@/types";
import { signJwt, verifyJwt } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decodedRefresh = verifyJwt(refreshToken, "refresh") as Payload;

    console.log(decodedRefresh);

    if (!decodedRefresh)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const newAccessToken = signJwt(
      {
        name: decodedRefresh?.name,
        userId: decodedRefresh.userId,
      },
      "access"
    );

    return NextResponse.json({ access: newAccessToken }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
