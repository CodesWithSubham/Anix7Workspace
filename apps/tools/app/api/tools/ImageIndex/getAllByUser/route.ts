import { auth } from "@shared/auth";
import getImageUploadModel from "@shared/lib/db/models/ImageUpload";
import { headers } from "next/headers";

import { NextResponse } from "next/server";

// Function to get URLs by uploadedBy with pagination (start and limit of 10)
async function getImagesByUploadedBy(uploadedBy: string, start = 0, limit = 10) {
  const ImageUpload = await getImageUploadModel();

  // Get the URLs for a given uploadedBy with pagination
  const images = await ImageUpload.find({ uploadedBy })
    .select("alias extension adsLabel createdAt")
    .sort({ createdAt: -1 }) // Sort by creation date (descending)
    .skip(start) // Skip the first 'start' number of documents
    .limit(limit) // Limit to the next 10 URLs after 'start'
    .lean();

  // Get total count of URLs for a given uploadedBy
  const totalImagesCount = await ImageUpload.countDocuments({ uploadedBy });

  return {
    images,
    totalImagesCount,
    IMAGE_INDEX_URL: `${process.env.BASE_URL}/i`,
    IMGUR_IMAGE_URL: process.env.IMGUR_IMAGE_URL,
  };
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = session.user;

    const { page } = await req.json(); // Destructure directly from req.json()

    const limit = 12;
    const skip = page ? (page - 1) * limit : 0;

    // Get the URL using the id
    const results = await getImagesByUploadedBy(id, skip, limit);

    // Return the response with availability status
    return NextResponse.json({
      success: true,
      results, // If url is null or undefined, available will be true
    });
  } catch (error) {
    console.error("Error occurred:", error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
