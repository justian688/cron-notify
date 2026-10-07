import { isAuthorized } from "@/lib/auth";
import getResend from "@/lib/resend";

// Without a verified domain, Resend only allows this sender.
const FROM = "Cron Notify <onboarding@resend.dev>";

async function sendNotification(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const to = process.env.NOTIFY_EMAIL;
    if (!to) {
      throw new Error("Missing NOTIFY_EMAIL environment variable");
    }
    const sentAt = new Date();
    const time = sentAt.toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      hour12: false,
    });
    const { data, error } = await getResend().emails.send({
      from: FROM,
      to,
      subject: `Cron 通知 ${time}`,
      text: `這是 cron-notify 的通知信。\n觸發時間：${time}（台灣時間）`,
    });
    if (error) {
      throw new Error(error.message);
    }
    return Response.json({ id: data?.id, sentAt });
  } catch (error) {
    console.error("Failed to send notification", error);
    return Response.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}

export const GET = sendNotification;
export const POST = sendNotification;
