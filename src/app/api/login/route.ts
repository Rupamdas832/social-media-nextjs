import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { compare } from "@/lib/hash";
import { sign } from "@/lib/jwt";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const ExpenseSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(req: any) {
  const requestBody = await req.json();

  try {
    const validatedReq = ExpenseSchema.parse(requestBody);

    const requestedUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: validatedReq.email,
        },
      },
      include: {
        profile: true,
      },
    });

    if (requestedUser && requestedUser.password) {
      const isValidPassword = await compare(
        validatedReq.password,
        requestedUser.password
      );

      if (isValidPassword === true) {
        const token = await sign({
          email: requestedUser.email,
          userId: requestedUser.id,
          profileId: requestedUser?.profile?.id ?? null,
        });
        const oneHour = 60 * 60 * 1000;

        cookies().set({
          name: "token",
          value: token,
          httpOnly: true,
          expires: Date.now() + oneHour,
        });

        return NextResponse.json(
          {
            email: requestedUser.email,
            id: requestedUser.id,
            redirect: requestedUser.profile ? "feed" : "create-profile",
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      {
        message: "Invalid credentials",
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
