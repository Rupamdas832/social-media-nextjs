import { CreateSeed } from "@/seed/createUser";
import { NextResponse } from "next/server";

export async function GET() {
  CreateSeed();
  return NextResponse.json({ message: "seed executed" }, { status: 200 });
}
