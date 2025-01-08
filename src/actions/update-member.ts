"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";

export async function updateMember(id: number, member: Partial<Member>) {
  return await prisma.member.update({
    where: { id },
    data: member,
  });
}
