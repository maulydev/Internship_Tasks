import { auth } from "@/utils/auth";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ groupId: string }> };

export const GET = async (request: NextRequest, { params }: Params) => {
  try {
    const result = await auth(request);

    if (!result || !result.decodedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const groupId = (await params).groupId;

    const group = await db.group.findUnique({
      where: { id: groupId },
      include: {
        owner: { select: { name: true } },
        messages: { where: { groupId }, include: { sender: { select: { name: true } } } },
        _count: { select: { messages: { where: { groupId } } } },
      },
    });

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
