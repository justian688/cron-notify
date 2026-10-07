import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const recordSchema = new Schema({
  triggeredAt: { type: Date, required: true, default: Date.now },
});

export type RecordDoc = InferSchemaType<typeof recordSchema>;

// Reuse the compiled model across HMR reloads in dev.
const Record: Model<RecordDoc> =
  (models.Record as Model<RecordDoc>) ?? model("Record", recordSchema);

export default Record;
