import type { Metadata } from "next";
import ImageGrid, { SafeImages } from "@/components/imageGrid";
import { IMAGE_LIMIT_PER_PAGE } from "@/utils/const";
import getAniPicModel from "@/lib/db/models/AniPic";
import { cacheLife, cacheTag } from "next/cache";
import { buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";
import { Button } from "@shared/components/ui/Button";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  "use cache";
  cacheLife("max");
  cacheTag("anipicImagePages");
  cacheTag("anipicImagePage:0");

  const AniPic = await getAniPicModel();

  const images = await AniPic.find({ approved: true })
    .sort({ createdAt: -1 })
    .limit(IMAGE_LIMIT_PER_PAGE)
    .lean();

  const safeImages: SafeImages[] = images.map((img) => ({
    sno: img.sno,
    thumbnailUrl: img.thumbnailUrl,
    width: img.width,
    height: img.height,
    title: buildSeoTitle(img.tags),
  }));

  return (
    <section>
      <ImageGrid images={safeImages} />

      {/* Pagination controls */}
      <div className="flex justify-end mt-6">
        <Button href="/page/1">Next →</Button>
      </div>
    </section>
  );
}
