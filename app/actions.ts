"use server";

import { sendNotification } from "@/lib/notify";

export type SendEmailState = { ok: boolean; message: string } | null;

export async function sendEmail(): Promise<SendEmailState> {
  try {
    const { sentAt } = await sendNotification();
    const time = sentAt.toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      hour12: false,
    });
    return { ok: true, message: `信件已寄出（${time}）` };
  } catch (error) {
    console.error("Failed to send notification", error);
    return { ok: false, message: "寄信失敗，請稍後再試" };
  }
}
