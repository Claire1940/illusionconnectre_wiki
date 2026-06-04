import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.illusionconnectre.wiki'
  const path = '/about'
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: 'About Illusion Connect: Re Wiki',
    description:
      'Learn about Illusion Connect: Re Wiki, an unofficial fan-made hub for guides, codes coverage, reroll tips, character references, and launch resources.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Illusion Connect: Re Wiki',
      title: 'About Illusion Connect: Re Wiki',
      description:
        'Learn about the mission, scope, and unofficial status of Illusion Connect: Re Wiki.',
      images: [
        {
          url: heroImage,
          width: 1920,
          height: 1080,
          alt: 'Illusion Connect: Re Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Illusion Connect: Re Wiki',
      description:
        'Learn about the mission, scope, and unofficial status of Illusion Connect: Re Wiki.',
      images: [heroImage],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            About Illusion Connect: Re Wiki
          </h1>
          <p className="text-lg text-slate-300">
            An unofficial fan-made resource hub for Illusion Connect: Re players
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Is</h2>
            <p>
              Illusion Connect: Re Wiki is a community-oriented reference site built to organize
              practical information around Illusion Connect: Re, including launch resources, gameplay
              videos, social links, reroll coverage, codes tracking, and future guide content.
            </p>

            <h2>What We Aim to Publish</h2>
            <ul>
              <li>Codes and redemption coverage</li>
              <li>Reroll and beginner onboarding information</li>
              <li>Character, team, and combat reference content</li>
              <li>Platform, launch, and event updates</li>
              <li>Useful official and community links</li>
            </ul>

            <h2>Unofficial Status</h2>
            <p>
              This is an unofficial fan-made website. It is not operated by or affiliated with
              SUGARGAME NETWORK LIMITED or any distribution platform linked on the site.
            </p>

            <h2>Contact</h2>
            <p>
              General questions, corrections, or partnership requests can be sent to{' '}
              <a
                href="mailto:contact@illusionconnectre.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                contact@illusionconnectre.wiki
              </a>
              .
            </p>

            <div className="mt-10 border-t border-border pt-6">
              <Link
                href="/"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                Return to Illusion Connect: Re Wiki
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
