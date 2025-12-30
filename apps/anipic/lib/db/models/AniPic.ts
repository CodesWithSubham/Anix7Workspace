import "server-only";
import { Schema, Model, Document, Connection } from "mongoose";
import connectToAniPicDb from "../connections/aniPicDb";

export interface IAniPic extends Document {
  sno: number;

  originalUrl: string;
  displayUrl: string;
  thumbnailUrl: string;

  uploadedBy: string;
  approved: boolean;

  tags: string[];

  width: number;
  height: number;

  downloads: number;
  views: number;
  likes: number;

  isDeleted: boolean;
  dmcaFlag: boolean;
  dmcaReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const aniPicSchema = new Schema<IAniPic>(
  {
    sno: { type: Number, required: true, unique: true, index: true },
    originalUrl: { type: String, required: true, unique: true },
    displayUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },

    uploadedBy: { type: String, required: true, ref: "User", index: true },
    approved: { type: Boolean, default: false, index: true },

    tags: { type: [String], default: [], index: true },

    width: Number,
    height: Number,

    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    isDeleted: { type: Boolean, default: false, index: true },
    dmcaFlag: { type: Boolean, default: false, index: true },
    dmcaReason: { type: String },
  },
  { timestamps: true }
);

// Index for sorting and searching efficiently
aniPicSchema.index({ createdAt: -1 });

let cachedModel: Model<IAniPic> | null = null;

export default async function getAniPicModel(): Promise<Model<IAniPic>> {
  const conn: Connection = await connectToAniPicDb();
  if (!cachedModel) {
    cachedModel = conn.models.AniPic || conn.model<IAniPic>("AniPic", aniPicSchema);
  }
  return cachedModel;
}
