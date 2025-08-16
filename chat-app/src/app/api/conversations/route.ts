import { Conversations, Payload } from "@/types";
import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = (result.decodedToken as Payload)?.userId;

    const messages = await db.message.findMany({
      where: {
        groupId: null,
        OR: [{ senderId: currentUserId }, { receiverId: currentUserId }],
      },
      select: {
        senderId: true,
        receiverId: true,
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
        content: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const partnersMap = new Map<string, Conversations >();

    for (const msg of messages) {
      // Determine the conversation partner (the other user)
      const partner =
        msg.senderId === currentUserId ? msg.receiver : msg.sender;

      if (!partner) continue;

      // Only add if this partner isn't already added
      if (!partnersMap.has(partner.id)) {
        partnersMap.set(partner.id, {
          id: partner.id,
          name: partner.name,
          lastMessage: msg.content,
          lastMessageAt: msg.createdAt.toString(),
        });
      }
    }

    const conversations = Array.from(partnersMap.values());

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("❌ Conversations error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
