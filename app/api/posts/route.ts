import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

import connectToDB from "@/utils";
import prisma from '../../../prisma/index';

// create posts
export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  try {
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title, content } = await request.json();
    await connectToDB();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorEmail: session.user.email,
      },
    });
    return NextResponse.json({ message: "OK", newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
