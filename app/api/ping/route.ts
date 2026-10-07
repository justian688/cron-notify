import connectDb from "@/lib/mongodb";
import Record from "@/models/Record";

async function createRecord() {
  try {
    await connectDb();
    const record = await Record.create({ triggeredAt: new Date() });
    return Response.json(
      { id: record._id.toString(), triggeredAt: record.triggeredAt },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save record", error);
    return Response.json({ error: "Failed to save record" }, { status: 500 });
  }
}

export const GET = createRecord;
export const POST = createRecord;
