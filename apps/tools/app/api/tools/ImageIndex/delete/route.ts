import { auth } from "@shared/auth";
import getImageUploadModel from "@shared/lib/db/models/ImageUpload";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const uploadedBy = session.user.id;

    const { alias } = await req.json();

    if (!alias) {
      return NextResponse.json({ success: false, error: "Invalid Image Alias!" }, { status: 400 });
    }

    const ImageUpload = await getImageUploadModel();
    const image = await ImageUpload.findOne({ alias, uploadedBy });
    if (!image) {
      return NextResponse.json({ error: "Nothing to Delete!", success: false }, { status: 400 });
    }

    const response = await fetch(`https://api.imgur.com/3/image/${image.deleteHash}`, {
      method: "DELETE",
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID_1}`,
      },
    });
    const data = await response.json();

    if (!response.ok && response.status !== 404) {
      return NextResponse.json(
        {
          success: false,
          error: data.data?.error || "Failed to delete image!",
        },
        { status: response.status }
      );
    }

    await image.deleteOne();
    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error during deletion" },
      { status: 500 }
    );
  }
}
