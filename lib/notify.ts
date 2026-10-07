import getResend from "@/lib/resend";

// Without a verified domain, Resend only allows this sender.
const FROM = "Cron Notify <onboarding@resend.dev>";

export async function sendNotification() {
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
  return { id: data?.id, sentAt };
}
