import type { Metadata } from 'next'
import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.illusionconnectre.wiki'
  const canonicalUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: 'Illusion Connect: Re Wiki - Codes, Tier List & Reroll',
    description:
      'Illusion Connect: Re wiki with codes, tier list, reroll tips, characters, team builds, combat guide, home features, launch news, and beginner help.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Illusion Connect: Re Wiki',
      title: 'Illusion Connect: Re Wiki - Codes, Tier List & Reroll',
      description:
        'Illusion Connect: Re wiki with codes, tier list, reroll tips, characters, team builds, combat guide, home features, launch news, and beginner help.',
      images: [
        {
          url: heroImage,
          width: 1920,
          height: 1080,
          alt: 'Illusion Connect: Re hero artwork',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Illusion Connect: Re Wiki - Codes, Tier List & Reroll',
      description:
        'Illusion Connect: Re wiki with codes, tier list, reroll tips, characters, team builds, and beginner help.',
      images: [heroImage],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)

  return <HomePageClient latestArticles={latestArticles} moduleLinkMap={moduleLinkMap} locale={locale} />
}
