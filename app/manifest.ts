import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'DeepRock Mining Ltd',
        short_name: 'DeepRock',
        description:
            'Responsible gold trading, aggregation, mining, exploration and technical services in Ghana.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F6F3ED',
        theme_color: '#161B1E',
        icons: [
            {
                src: '/favicon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
