/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
      domains: [
        "lh3.googleusercontent.com",
        "avatars.githubusercontent.com",
        "firebasestorage.googleapis.com",
        "user-avatar-info.s3.ap-south-1.amazonaws.com",
        "instructor-data-bucket.s3.ap-south-1.amazonaws.com",
      ],
    },
  };
  
  export default nextConfig;
  