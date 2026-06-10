import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // SVGs are served as-is by next/image; allow them explicitly.
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // The project uses no symlinked packages; skipping symlink resolution avoids
  // unnecessary fs.readlink calls. See scripts/patch-readlink.cjs for the
  // accompanying Node 24 / Windows EISDIR workaround.
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
