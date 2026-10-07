import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const pingSchema = new Schema({
  triggeredAt: { type: Date, required: true, default: Date.now },
});

export type PingDoc = InferSchemaType<typeof pingSchema>;

// Reuse the compiled model across HMR reloads in dev.
const Ping: Model<PingDoc> =
  (models.Ping as Model<PingDoc>) ?? model("Ping", pingSchema);

export default Ping;
