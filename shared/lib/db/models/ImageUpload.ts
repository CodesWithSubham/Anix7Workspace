import { Schema, Model, Connection } from "mongoose";
import connectToImageUploadDb from "../connections/imageUploadDb";

export interface ImageUpload {
  alias: string;
  deleteHash: string;
  extension: string;
  uploadedBy: string; // References User id
  adsLabel: 0 | 1 | 2 | 3;
  expiredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const imageUploadSchema = new Schema<ImageUpload>(
  {
    alias: { type: String, required: true, unique: true },
    deleteHash: { type: String, required: true },
    extension: { type: String, default: "jpg" },
    uploadedBy: { type: String, required: true, ref: "User" },
    adsLabel: { type: Number, enum: [0, 1, 2, 3], default: 1 },
    expiredAt: { type: Date, default: null },
  },
  { timestamps: true },
);

let cachedModel: Model<ImageUpload> | null = null;

export default async function getImageUploadModel(): Promise<Model<ImageUpload>> {
  const conn: Connection = await connectToImageUploadDb();
  if (!cachedModel) {
    cachedModel =
      conn.models.ImageUpload || conn.model<ImageUpload>("ImageUpload", imageUploadSchema);
  }
  return cachedModel;
}
