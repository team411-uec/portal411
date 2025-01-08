"use server";

import { prisma } from "@/lib/prisma";

export async function updateMember(id: number, member: Partial<Member>) {
  return await prisma.member.update({
    where: { id },
    data: member,
  });
}
