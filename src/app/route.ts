import { db } from "@/server/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paramUserId =  searchParams.get("userId")

  if (!(await db.user.findFirst())) {
    const promises = [1006091, 1006092].map(async (id) => {
      await db.user.create({
        data: {
          userId: id,
          staff: {
            create: {
              isActive: true,
            },
          },
        },
      });
    });
    await Promise.all(promises);
  }
  const userId = typeof Number(paramUserId) === "number" ? Number(paramUserId): 1006091;

  const user = await db.user.findUnique({
    where: {
      userId: Number(userId),
      staff: {
        isActive: true,
      },
    },
  });
  const user2 = await db.user.findUnique({
    where: {
      userId: Number(userId),
    },
    include: {
      staff: true,
    },
  });

  return NextResponse.json({ user, user2 });
}
