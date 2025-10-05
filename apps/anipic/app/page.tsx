import getAniPicModel from "@shared/lib/db/models/AniPic";
import Image from "next/image";
import Link from "next/link";
import HomePage from "./HomePage";

export default async function Page() {
  const AniPic = await getAniPicModel();
  const images = await AniPic.find({ approved: true }).sort({ createdAt: -1 }).limit(50).lean();

  const newMappedImages = images.map((img) => ({
    sno: img.sno,
    url: img.url,
  }));

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">AniPic — Stock Photos</h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <HomePage images={newMappedImages} />
      </div>
    </div>
  );
}
