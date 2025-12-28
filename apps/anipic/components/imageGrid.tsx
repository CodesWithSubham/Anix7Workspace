import { IAniPic } from "@/lib/db/models/AniPic";
import Image from "next/image";
import Link from "next/link";

export default function ImageGrid({ images }: { images: IAniPic[] }) {
  return (
    <div className="columns-2 sm:columns-3 gap-4">
      {images.map((img, index) => (
        <Link
          key={img.sno}
          href={`/i/${img.sno}`}
          className="block mb-4 break-inside-avoid rounded-xl overflow-hidden"
        >
          <Image
            src={img.thumbnailUrl}
            unoptimized
            width={img.width || 320}
            height={img.height || 320}
            alt={img.tags.join(", ")}
            className="w-full h-auto object-cover rounded-lg"
            loading={index < 8 ? "eager" : "lazy"}
          />
          {/* Hidden tags for seo */}
          <p className="hidden">{img.tags.join(", ")}</p>
        </Link>
      ))}
    </div>
  );
}
