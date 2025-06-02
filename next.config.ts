import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  ...withPWA({
    dest: 'public',                                   // 서비스 워커 파일의 위치
    register: true,                                   // 서비스 워커 자동 등록
    skipWaiting: true,                                // 새로운 서비스 워커가 즉시 활성화되도록 설정
    disable: false //process.env.NODE_ENV === 'development',  // 개발 환경에서는 PWA 비활성화
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;