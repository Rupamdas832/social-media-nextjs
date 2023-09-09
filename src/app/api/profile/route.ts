import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { Prisma } from "@prisma/client";

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

    const profile = await prisma.profile.findFirst({
      where: {
        id: {
          equals: verifiedTokenData.payload.profileId as number,
        },
      },
      include: {
        user: true,
        posts: true,
      },
    });

    if (profile) {
      return NextResponse.json(
        {
          bio: profile.bio || "",
          name: profile.name || "",
          userHandle: profile.userHandle || "",
          profilePic: profile.profilePic || "",
          posts: profile.posts,
          profileId: profile.id,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Invalid User",
      },
      { status: 400 }
    );
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
