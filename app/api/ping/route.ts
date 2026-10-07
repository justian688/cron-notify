import connectDb from "@/lib/mongodb";
import Ping from "@/models/Ping";

async function createPing() {
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
