import ImageGrid from "@/components/imageGrid";
import { IMAGE_LIMIT_PER_PAGE } from "@/utils/const";
import getAniPicModel, { IAniPic } from "@shared/lib/db/models/AniPic";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";

export default async function HomePage() {
  "use cache";
  cacheLife("max");
  cacheTag("anipicImagePages");

  const AniPic = await getAniPicModel();

  const images = await AniPic.find({ approved: true })
    .sort({ createdAt: -1 })
    .limit(IMAGE_LIMIT_PER_PAGE)
    .lean<IAniPic[]>();

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-4">
        AniPics (Page {pageNum} of {totalPages})
      </h1> */}

      <ImageGrid images={images} />

      {/* Pagination controls */}
      <div className="flex justify-between mt-6">
        <Link href={`/page/1`} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
          Next →
        </Link>
      </div>
    </main>
  );
}
