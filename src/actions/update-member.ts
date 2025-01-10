"use server";

import { prisma } from "@/lib/prisma";
import { Member } from "@prisma/client";
import { boolean, date, number, object, string } from "yup";

const memberSchema = object({
  id: number().required(),
  firstName: string().required(),
  lastName: string(),
  institution: string().required(),
  faculty: string(),
  department: string(),
  major: string().optional(),
  email: string().email(),
  studentId: string(),
  entrancedYear: number(),
  birthday: date().required(),
  hasKey505: boolean().required(),
  hasKeyPictlab: boolean().required(),
  joinedAt: date().required(),
  leftAt: date().nullable(),
  comment: string(),
});

export async function updateMember(id: number, member: Partial<Member>): Promise<{
  isSuccessful: true;
  body: Member;
} | {
  isSuccessful: false;
  message: string;
  }> {
  try {
    const validatedMember = await memberSchema.validate(member);
    const updated = await prisma.member.update({
      where: { id },
      data: validatedMember,
    });
    return {
      isSuccessful: true,
      body: updated,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        isSuccessful: false,
        message: e.message,
      };
    } else {
      return {
        isSuccessful: false,
        message: "Unknown error",
      };
    }
  }
}
