import connectToDB from "@/utils";
import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../prisma/index';


//create comments

export async function POST(request: NextRequest) {
  const session = await getAuthSession();

  try {
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { text, postId } = await request.json();

    await connectToDB();
    const newComment = await prisma.comment.create({
      data: {
        text,
        authorEmail: session.user.email,
        postId,
      },
    });
    return NextResponse.json({ message: "OK", newComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
