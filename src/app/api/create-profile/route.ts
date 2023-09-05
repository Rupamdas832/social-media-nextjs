import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const CreateProfileSchema = z.object({
  name: z.string(),
  bio: z.string() || null,
  userHandle: z.string(),
});

export async function POST(req: any) {
  const requestBody = await req.json();

  try {
    const validatedReq = CreateProfileSchema.parse(requestBody);

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

    const requestedUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: verifiedTokenData.payload.email as string,
        },
      },
      include: {
        profile: true,
      },
    });

    if (requestedUser) {
      const profile = await prisma.profile.create({
        data: {
          bio: validatedReq?.bio,
          name: validatedReq.name,
          userHandle: validatedReq.userHandle,
          userId: requestedUser.id,
        },
      });
      if (profile) {
        return NextResponse.json(profile);
      }
    }

    return NextResponse.json(
      {
        message: "Invalid User",
      },
      { status: 400 }
    );
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
