import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_IMAGEUPLOADS;

const cached = global._imageUploadDb || { conn: null, promise: null };

export default async function connectToImageUploadDb() {
  if (!uri) throw new Error("❌ MONGODB_URI_IMAGEUPLOADS not found");
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    console.log("🔄 Connecting to imageUpload DB...");
    cached.promise = mongoose.createConnection(uri, {
      dbName: "imageUploadsDb",
      bufferCommands: false,
    }).asPromise().then((conn) => {
      console.log("✅ Connected to imageUpload DB");
      return conn;
    });
  }

  cached.conn = await cached.promise;
  global._imageUploadDb = cached;
  return cached.conn;
}
