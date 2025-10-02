import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_ANIPIC;

let cached = global._aniPicDb || { conn: null, promise: null };

export default async function connectToAniPicDb() {
  if (!uri) throw new Error("❌ MONGODB_URI_ANIPIC not found");
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔄 Connecting to aniPic DB...");
    cached.promise = mongoose
      .createConnection(uri, {
        dbName: "aniPicDb",
        bufferCommands: false,
      })
      .asPromise()
      .then((conn) => {
        console.log("✅ Connected to aniPic DB");
        return conn;
      });
  }

  cached.conn = await cached.promise;
  global._aniPicDb = cached;
  return cached.conn;
}
