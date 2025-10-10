"use server";

import { auth } from "@shared/lib/auth";
import getAniPicModel from "@shared/lib/db/models/AniPic";
// import { revalidatePath } from "next/cache";

// Type of the return state
export type UploadImageState =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      message: string;
    };

// 🧠 Server Action
export async function uploadImageAction(_prevState: UploadImageState, formData: FormData): Promise<UploadImageState> {
  const session = await auth();
  // Temporary for admin and owner access
  if (
    !session ||
    !session.user ||
    !(session?.user?.role === "admin" || session?.user?.role === "owner")
  )
    return { success: false, error: "Unauthorized" };

  const user = session.user;

  const url = formData.get("url") as string;
  const tags = (formData.get("tags") as string)
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!url || !url.startsWith("http"))
    return { success: false, error: "Please enter a valid image URL." };

  try {
    const AniPic = await getAniPicModel();
    const last = await AniPic.findOne().sort({ sno: -1 });
    const sno = last ? last.sno + 1 : 1;
    // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay for demo purposes
    // throw new Error("Simulated failure"); // Simulate failure for demo purposes

    const data = {
      sno,
      url,
      uploadedBy: 1, // Replace with logged-in user ID later
      approved: user.role === "admin" || user.role === "owner",
      tags,
      downloads: 0,
    };

    console.log("data", data);
    await AniPic.create(data);

    // revalidatePath("/");
    return { success: true, message: "✅ Image uploaded (pending admin approval)" };
  } catch (err) {
    console.error("Upload failed:", err);
    return { success: false, error: "Upload failed. Try again later." };
  }
}
