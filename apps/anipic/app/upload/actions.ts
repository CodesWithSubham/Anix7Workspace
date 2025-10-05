"use server";

import { auth } from "@shared/lib/auth";
import getAniPicModel from "@shared/lib/db/models/AniPic";
// import { revalidatePath } from "next/cache";

// 🧠 Server Action
export async function uploadImageAction(_prevState: any, formData: FormData) {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !(session?.user?.role === "admin" || session?.user?.role === "owner")
  )
    return { success: false, error: "Unauthorized" };

  const url = formData.get("url") as string;
  const tags = (formData.get("tags") as string)
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!url || !url.startsWith("http"))
    return { success: false, message: "Please enter a valid image URL." };

  try {
    const AniPic = await getAniPicModel();
    const last = await AniPic.findOne().sort({ sno: -1 });
    const sno = last ? last.sno + 1 : 1;
    // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay for demo purposes
    // throw new Error("Simulated failure"); // Simulate failure for demo purposes
    console.log("data", {
      sno,
      url,
      uploadedBy: 1, // Replace with logged-in user ID later
      approved: false,
      tags,
      downloads: 0,
    });

    await AniPic.create({
      sno,
      url,
      uploadedBy: 1, // Replace with logged-in user ID later
      approved: false,
      tags,
      downloads: 0,
    });

    // revalidatePath("/");
    return { success: true, message: "✅ Image uploaded (pending admin approval)" };
  } catch (err) {
    console.error("Upload failed:", err);
    return { success: false, message: "Upload failed. Try again later." };
  }
}
