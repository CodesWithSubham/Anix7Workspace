import { Schema, Model, Document, Connection } from "mongoose";
import connectToAniPicDb from "../connections/aniPicDb";

export interface IAniPic extends Document {
  sno: number;
  url: string;
  uploadedBy: number; // References User.userId
  approved: boolean; // Admin approval flag
  tags: string[];
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

const aniPicSchema = new Schema<IAniPic>(
  {
    sno: { type: Number, required: true, unique: true, index: true },
    url: { type: String, required: true, unique: true },
    uploadedBy: { type: Number, required: true, ref: "User", index: true },
    approved: { type: Boolean, default: false, index: true },
    tags: { type: [String], default: [], index: true },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Index for sorting and searching efficiently
aniPicSchema.index({ createdAt: -1 });
aniPicSchema.index({ approved: 1, visibility: 1 });

let cachedModel: Model<IAniPic> | null = null;

export default async function getAniPicModel(): Promise<Model<IAniPic>> {
  const conn: Connection = await connectToAniPicDb();
  if (!cachedModel) {
    cachedModel = conn.models.AniPic || conn.model<IAniPic>("AniPic", aniPicSchema);
  }
  return cachedModel;
}
