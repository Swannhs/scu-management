const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**"
      }
    ]
  }
});
