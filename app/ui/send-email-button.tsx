"use client";

import { startTransition, useActionState } from "react";
import { sendEmail, type SendEmailState } from "@/app/actions";

export function SendEmailButton() {
  const [state, action, pending] = useActionState<SendEmailState>(
    sendEmail,
    null,
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(action)}
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {pending ? "寄送中…" : "寄出通知信"}
      </button>
      <p
        aria-live="polite"
        className={`min-h-6 text-sm ${state?.ok ? "text-green-600" : "text-red-600"}`}
      >
        {state?.message}
      </p>
    </div>
  );
}
