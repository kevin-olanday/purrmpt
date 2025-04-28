import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result = await prisma.purrmptCounter.aggregate({
    _sum: { count: true },
  });
  return NextResponse.json({ total: result._sum.count ?? 0 });
}