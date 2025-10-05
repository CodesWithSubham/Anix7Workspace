"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function HomePage({ images = [] }: { images: { sno: number; url: string }[] }) {
  return images.map((img) => (
    <Link key={img.sno} href={`/i/${img.sno}`}>
      <motion.div
        layoutId={`image-${img.sno}`} // 👈 Shared layout ID
        className="relative cursor-pointer overflow-hidden rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1 }}
      >
        <img src={img.url} alt="" width={300} height={300} className="object-cover w-full h-full" />
      </motion.div>
    </Link>
  ));
}
