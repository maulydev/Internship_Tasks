import { Payload } from "@/types";
import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

type PathParams = { params: Promise<{ id: string }> };

export const GET = async (request: NextRequest, { params }: PathParams) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (result.decodedToken as Payload)?.userId;
    const receiverId = (await params).id;

    const receiver = await db.user.findUnique({
      where: { id: receiverId },
      select: { name: true },
    });

    if (!receiver) {
      return NextResponse.json(
        { error: "Receiver not found" },
        { status: 404 }
      );
    }

    const privateChats = await db.message.findMany({
      where: {
        AND: [
          { receiverId: { in: [receiverId, userId] } },
          { senderId: { in: [receiverId, userId] } },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        receiver: { id: receiverId, name: receiver?.name, isGroup: false },
        messages: privateChats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
