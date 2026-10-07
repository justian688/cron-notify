import { SendEmailButton } from "@/app/ui/send-email-button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 px-16 py-32 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Cron Notify
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          按下按鈕會寄出一封通知信。
        </p>
        <SendEmailButton />
      </main>
    </div>
  );
}
