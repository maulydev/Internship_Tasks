import { Payload } from "@/types";
import { verifyJwt } from "@/utils/jwt";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");

    const accessToken = authHeader.split(" ")[1];
    const decodedToken = verifyJwt(accessToken, "access") as Payload;

    if (!decodedToken || !decodedToken?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, senderId, receiverId, groupId, isSystem } = body;

    const message = await db.message.create({
      data: { content, senderId, receiverId, groupId, isSystem },
      include: { sender: { select: { name: true } } },
    });

    return NextResponse.json({ data: message }, { status: 200 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
