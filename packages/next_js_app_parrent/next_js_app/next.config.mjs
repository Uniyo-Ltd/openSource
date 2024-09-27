/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    experimental: {
      esmExternals: true,
    },
  };

export default nextConfig;



// You are connected to database "searchlandai" as user "postgres" via socket in "/tmp" at port "5432".