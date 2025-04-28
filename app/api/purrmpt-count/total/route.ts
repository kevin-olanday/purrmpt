import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export async function GET() {
  // REMOVE increment logic from here! This endpoint should only READ, not increment.
  // The increment logic should be in your /api/generate endpoint.

  // Get global total
  const global = await prisma.globalCounter.findUnique({
    where: { id: 1 },
  });

  // Get today's total
  const today = format(new Date(), "yyyy-MM-dd");
  const daily = await prisma.dailyCounter.findUnique({
    where: { date: today },
  });

  return NextResponse.json({
    total: global?.count ?? 0,
    today: daily?.count ?? 0,
  });
}

