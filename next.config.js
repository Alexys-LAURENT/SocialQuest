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
        ]
    },
}


module.exports = nextConfig
