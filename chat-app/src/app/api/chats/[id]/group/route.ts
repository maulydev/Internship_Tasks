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

    const groupId = (await params).id;

    const group = await db.group.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        owner: { select: { id: true, name: true } },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const groupChats = await db.message.findMany({
      where: { groupId },
      include: {
        sender: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      { group: { ...group, isGroup: true }, messages: groupChats },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
