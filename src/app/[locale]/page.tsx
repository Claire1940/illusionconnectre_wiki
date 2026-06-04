import type { Metadata } from 'next'
import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import { getTranslations } from 'next-intl/server'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.home' })
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.illusionconnectre.wiki'
  const canonicalUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'Illusion Connect: Re Wiki',
      title: t('ogTitle'),
      description: t('ogDescription'),
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
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [heroImage],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  const latestArticles = await getLatestArticles(locale as Language, 30)

  return <HomePageClient latestArticles={latestArticles} locale={locale} />
}
