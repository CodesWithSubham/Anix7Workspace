import sharedNextConfig from "@shared/config/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...sharedNextConfig,

  cacheComponents: true,
};
export default nextConfig;
