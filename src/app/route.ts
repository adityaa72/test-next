import { db } from "@/server/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")!;

  //   await db.user.create({
  //     data: {
  //       userId: 1006094,
  //       Staff: {
  //         create: {
  //           isActive: true,
  //         },
  //       },
  //     },
  //   });

  //   await db.user.create({
  //     data: {
  //       userId: 1006091,
  //       Staff: {
  //         create: {
  //           isActive: true,
  //         },
  //       },
  //     },
  //   });

  const user = await db.user.findUnique({
    where: {
      userId: Number(userId),
      Staff: {
          isActive: false,
      },
    },
  });
  const user2 = await db.user.findUnique({
    where: {
      userId: Number(userId),
    },
    include: {
      Staff: true,
    },
  });

  return NextResponse.json({ user, user2 });
}
