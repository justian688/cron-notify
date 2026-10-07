import { isAuthorized } from "@/lib/auth";
import connectDb from "@/lib/mongodb";
import Ping from "@/models/Ping";

async function createPing(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDb();
    const ping = await Ping.create({ triggeredAt: new Date() });
    return Response.json(
      { id: ping._id.toString(), triggeredAt: ping.triggeredAt },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save ping", error);
    return Response.json({ error: "Failed to save ping" }, { status: 500 });
  }
}

export const GET = createPing;
export const POST = createPing;
