import { isAuthorized } from "@/lib/auth";
import { sendNotification } from "@/lib/notify";

async function notify(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return Response.json(await sendNotification());
  } catch (error) {
    console.error("Failed to send notification", error);
    return Response.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}

export const GET = notify;
export const POST = notify;
