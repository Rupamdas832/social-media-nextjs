import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const CreateCommentSchema = z.object({
  content: z.string(),
  postId: z.number(),
});

export async function GET(req: any) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const verifiedTokenData = await verify(token);
    if (!verifiedTokenData) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const comments = await prisma.comment.findMany({
      select: {
        content: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            userHandle: true,
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  const requestBody = await req.json();

  try {
    const validatedReq = CreateCommentSchema.parse(requestBody);

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const verifiedTokenData = await verify(token);
    if (!verifiedTokenData) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content: validatedReq.content,
        postId: validatedReq.postId,
        authorId: Number(verifiedTokenData.payload.profileId),
      },
    });
    if (comment) {
      return NextResponse.json(comment);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.format();
      return NextResponse.json({ errors }, { status: 400 });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
