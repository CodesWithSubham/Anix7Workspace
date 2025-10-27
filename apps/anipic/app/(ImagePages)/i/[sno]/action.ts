"use server";

import getAniPicModel from "@shared/lib/db/models/AniPic";

export default async function updateDownloads(sno: number) {
  try {
    const AniPic = await getAniPicModel();

    const result = await AniPic.updateOne(
      { sno, approved: true },
      { $inc: { downloads: 1 } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, message: "Image not found or not approved", code: 404 };
    }

    return { success: true, message: "Update success" };
  } catch (error) {
    console.error("Error occurred in updateDownloads:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      code: 500,
    };
  }
}
