/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    CHORE_MASTER_API_HOST: process.env.CHORE_MASTER_API_HOST,
    CHORE_MASTER_PROJECT_API_KEY: process.env.CHORE_MASTER_PROJECT_API_KEY,
  },
}

export default nextConfig
