import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Giving is handled by Planning Center's Church Center
        source: "/give",
        destination: "https://risedn.churchcenter.com/giving",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
