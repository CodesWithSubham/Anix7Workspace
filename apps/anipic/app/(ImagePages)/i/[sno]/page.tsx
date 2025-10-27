import { notFound } from "next/navigation";
import getAniPicModel from "@shared/lib/db/models/AniPic";
import ImageDetailClient from "./ImageDetailClient";

interface Props {
  params: Promise<{ sno: string }>;
}

export default async function ImagePage({ params }: Props) {
  const { sno } = await params;
  const AniPic = await getAniPicModel();

  // await new Promise(resolve => setTimeout(resolve, 2000));

  // Fetch image and increment downloads atomically
  const img = await AniPic.findOne({ sno: Number(sno), approved: true }).lean();

  if (!img) return notFound();

  const newImg = {
    sno: img.sno,
    url: img.url,
    tags: img.tags,
    downloads: img.downloads,
  };

  // Pass image data to client component
  return <ImageDetailClient img={newImg} />;
}
