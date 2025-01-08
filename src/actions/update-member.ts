"use server";

import { Member, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateMember(id: number, member: Partial<Member>) {
  return await prisma.member.update({
    where: { id },
    data: member,
  });
}
