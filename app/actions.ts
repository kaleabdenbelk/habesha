"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: {
  name: string;
  email: string;
  intent: string;
  message: string;
}) {
  try {
    await prisma.contact.create({
      data: {
        name: formData.name,
        email: formData.email,
        intent: formData.intent,
        message: formData.message,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Transmission error:", error);
    return { success: false, error: "INTERRUPT: UNABLE TO TRANSMIT DATA" };
  }
}

export async function submitJoin(formData: {
  email: string;
  specialization: string;
}) {
  try {
    await prisma.joinApplication.create({
      data: {
        email: formData.email,
        specialization: formData.specialization,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Join submission error:", error);
    return { success: false, error: "ERROR: UNABLE TO JOIN INNER CIRCLE" };
  }
}
