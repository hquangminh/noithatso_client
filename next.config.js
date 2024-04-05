/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      // Product
      { source: '/san-pham', destination: '/product' },
      { source: '/san-pham/:productID', destination: '/product/:productID' },
      // Blog
      { source: '/bai-viet', destination: '/blog' },
      { source: '/bai-viet/:category', destination: '/blog/:category' },
      { source: '/bai-viet/:category/:blogID', destination: '/blog/:category/:blogID' },
      // Portfolio
      { source: '/y-tuong-thiet-ke', destination: '/portfolio' },
      { source: '/y-tuong-thiet-ke/:portfolioID', destination: '/portfolio/:portfolioID' },
      // Other
      { source: '/tim-kiem', destination: '/search' },
      { source: '/gio-hang', destination: '/cart' },
      { source: '/hoan-tat-dat-hang', destination: '/checkout' },
      { source: '/kiem-tra-don-hang', destination: '/tracking' },
      { source: '/phuong-cham-ban-hang', destination: '/help-center/sales-motto' },
      { source: '/chinh-sach-bao-mat', destination: '/help-center/privacy-policy' },
      { source: '/dieu-khoan-su-dung', destination: '/help-center/terms-of-use' },
      { source: '/thoa-thuan-nguoi-dung', destination: '/help-center/user-agreement' },
      { source: '/nghia-vu-va-chinh-sach-chung', destination: '/help-center/obligations-and-policies' },
    ];
  },
};

module.exports = nextConfig;
