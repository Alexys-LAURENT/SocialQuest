// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.state.gov',
                port: "",
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: "",
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                port: "",
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: "",
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*',
                port: "",
                pathname: '/**',
            }
        ]
    },
}


// module.exports = withBundleAnalyzer(nextConfig)
module.exports = nextConfig
