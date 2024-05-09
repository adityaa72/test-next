import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
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

  const userId = 1006091;

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
