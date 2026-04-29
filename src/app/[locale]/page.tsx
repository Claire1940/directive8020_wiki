import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'Directive 8020'
const SITE_URL_FALLBACK = 'https://directive8020.wiki'
const HERO_ALT = 'Directive 8020 - Cinematic Sci-Fi Survival Horror'
const HOME_TITLE = 'Directive 8020 - Release Date, Trailer & Guide'
const HOME_DESCRIPTION =
  'Explore Directive 8020 release date, Steam preorder info, trailers, story, characters, co-op mode, Turning Points, and survival horror guides in one place.'
const FEATURED_VIDEO = {
  videoId: 'gaQkzfA14G4',
  title: 'Directive 8020 | Official 60 Second Trailer',
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL_FALLBACK).replace(/\/$/, '')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`

  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: pageUrl,
      siteName: SITE_NAME,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [
        {
          url: heroImageUrl,
          width: 1920,
          height: 1080,
          alt: HERO_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [heroImageUrl],
      creator: '@TheDarkPictures',
    },
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": SITE_NAME,
        "description": HOME_DESCRIPTION,
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
          "caption": HERO_ALT,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": SITE_NAME,
        "alternateName": "Directive 8020 Wiki",
        "url": siteUrl,
        "description": "Directive 8020 Wiki tracks release details, official trailers, platforms, co-op information, story guides, characters, and survival horror resources.",
        "logo": {
          "@type": "ImageObject",
          "url": new URL('/android-chrome-512x512.png', siteUrl).toString(),
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": heroImageUrl,
          "width": 1920,
          "height": 1080,
          "caption": HERO_ALT,
        },
        "sameAs": [
          "https://www.directive8020.com/",
          "https://www.thedarkpictures.com/games/directive-8020",
          "https://www.supermassivegames.com/games/directive8020",
          "https://store.steampowered.com/app/2255370/Directive_8020/",
          "https://steamcommunity.com/app/2255370",
          "https://discord.com/invite/supermassivegames",
          "https://www.youtube.com/@SupermassiveGamesOfficial",
          "https://x.com/TheDarkPictures",
          "https://www.reddit.com/r/DarkPicturesAnthology/",
        ],
      },
      {
        "@type": "VideoGame",
        "name": "Directive 8020",
        "url": "https://www.directive8020.com/",
        "image": heroImageUrl,
        "applicationCategory": "Game",
        "gamePlatform": ["PC", "Steam", "PlayStation 5", "Xbox Series X|S"],
        "genre": ["Cinematic horror", "Sci-fi", "Survival horror", "Adventure"],
        "numberOfPlayers": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 5,
        },
        "offers": {
          "@type": "Offer",
          "price": "49.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/PreOrder",
          "url": "https://store.steampowered.com/app/2255370/Directive_8020/",
        },
      },
      {
        "@type": "VideoObject",
        "name": FEATURED_VIDEO.title,
        "description": "Official Directive 8020 60 second trailer from Supermassive Games.",
        "thumbnailUrl": [heroImageUrl],
        "contentUrl": "https://www.youtube.com/watch?v=gaQkzfA14G4",
        "embedUrl": "https://www.youtube.com/embed/gaQkzfA14G4",
      },
    ],
  }

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient
        latestArticles={latestArticles}
        moduleLinkMap={moduleLinkMap}
        locale={locale}
        featuredVideo={FEATURED_VIDEO}
      />
    </>
  )
}
