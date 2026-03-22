import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // 允许外部图片源（角色头像等）
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
