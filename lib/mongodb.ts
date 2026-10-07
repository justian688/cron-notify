import mongoose from "mongoose";

// Reuse the connection across HMR reloads in dev so we don't exhaust connections.
const globalForMongoose = globalThis as typeof globalThis & {
  _mongoosePromise?: Promise<typeof mongoose>;
};

export default function connectDb(): Promise<typeof mongoose> {
  if (!globalForMongoose._mongoosePromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Missing MONGODB_URI environment variable");
    }
    globalForMongoose._mongoosePromise = mongoose
      .connect(uri)
      .catch((error) => {
        globalForMongoose._mongoosePromise = undefined;
        throw error;
      });
  }
  return globalForMongoose._mongoosePromise;
}
