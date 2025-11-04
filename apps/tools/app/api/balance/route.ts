// /app/api/balance/route.js
import { connection, NextResponse } from "next/server";
import { auth } from "@shared/lib/auth";
import getUserModel from "@shared/lib/db/models/User";

export async function GET() {
  await connection();

  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const User = await getUserModel();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Return the balance
    return NextResponse.json({ success: true, balance: user.balance }, { status: 200 });
  } catch (error) {
    console.error("Error in balance API:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
