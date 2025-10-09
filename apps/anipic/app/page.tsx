import getAniPicModel from "@shared/lib/db/models/AniPic";
import HomePage from "./(ImagePages)/HomePage";

export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const AniPic = await getAniPicModel();
  const images = await AniPic.find({ approved: true }).sort({ createdAt: -1 }).limit(50).lean();

  const newMappedImages = images.map((img) => ({
    sno: img.sno,
    url: img.url,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">AniPic — Stock Photos</h1>

      <HomePage images={newMappedImages} />
    </div>
  );
}
