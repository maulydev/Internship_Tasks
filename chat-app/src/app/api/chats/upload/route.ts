import { Payload } from "@/types";
import { verifyJwt } from "@/utils/jwt";
import db from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  await fs.writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

export const POST = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = authHeader.split(" ")[1];
    const decodedToken = verifyJwt(accessToken, "access") as Payload;

    if (!decodedToken || !decodedToken?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const receiverId = formData.get("receiverId") as string | null;
    const groupId = formData.get("groupId") as string | null;
    const isSystem = formData.get("isSystem") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file & get URL
    const fileUrl = await saveFile(file);

    // Save as a chat message in DB
    const message = await db.message.create({
      data: {
        content: fileUrl, // store the URL in content
        senderId: decodedToken.userId,
        receiverId: receiverId || undefined,
        groupId: groupId || undefined,
        isSystem,
      },
      include: {
        sender: { select: { name: true } },
      },
    });

    return NextResponse.json({ data: message }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
};
