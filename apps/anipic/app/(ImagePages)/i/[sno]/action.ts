"use server";

import getAniPicModel from "@/lib/db/models/AniPic";
import { createDownloadToken } from "@/utils/createDownloadToken";

const DOWNLOAD_BASE = process.env.DOWNLOAD_BASE;

if (!DOWNLOAD_BASE) {
  throw new Error("DOWNLOAD_BASE is not defined");
}

export default async function getDownloadUrl(sno: number) {
  try {
    const AniPic = await getAniPicModel();

    const img = await AniPic.findOneAndUpdate(
      { sno, approved: true },
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!img) return { success: false, message: "Image not found or not approved" };

    const title = `AniPic image of ${img.tags[0]}, ${img.tags[1]}, ${img.tags[2]}`;

    const downloadToken = createDownloadToken({
      u: img.originalUrl,
      w: img.width || 4000,
      h: img.height || 4000,
      t: title,
    });

    const downloadUrl = new URL(`?token=${downloadToken}`, DOWNLOAD_BASE).toString();

    return { success: true, message: "Update success", downloadUrl };
  } catch (error) {
    console.error("Error occurred in getDownloadUrl:", error);

    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
