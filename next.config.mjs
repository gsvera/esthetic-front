/** @type {import('next').NextConfig} */
const nextConfig = {async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8002/api/:path*' // Cambia esto según la URL de tu servicio Java
      }
    ];
  }};

export default nextConfig;
