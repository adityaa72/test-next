import { db } from "@/server/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")!;

//   const promises = [1006090, 1006091, 1006092].map(async (id) => {
//     await db.user.create({
//       data: {
//         userId: id,
//         Staff: {
//           create: {
//             isActive: true,
//           },
//         },
//       },
//     });
//   });
//   await Promise.all(promises);

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
