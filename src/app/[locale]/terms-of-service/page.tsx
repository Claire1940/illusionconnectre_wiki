import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const LAST_UPDATED = 'June 4, 2026'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.illusionconnectre.wiki'
  const path = '/terms-of-service'
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: 'Terms of Service - Illusion Connect: Re Wiki',
    description:
      'Terms of Service for Illusion Connect: Re Wiki covering acceptable use, intellectual property, disclaimers, and limitations of liability.',
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
      title: 'Terms of Service - Illusion Connect: Re Wiki',
      description:
        'Read the rules and legal terms for using Illusion Connect: Re Wiki.',
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
      title: 'Terms of Service - Illusion Connect: Re Wiki',
      description: 'Read the rules and legal terms for using Illusion Connect: Re Wiki.',
      images: [heroImage],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Terms of Service
          </h1>
          <p className="mb-2 text-lg text-slate-300">
            Terms and conditions for using Illusion Connect: Re Wiki
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Illusion Connect: Re Wiki, you agree to these Terms of Service.
              If you do not agree, do not use the site.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Illusion Connect: Re Wiki is an unofficial fan-made website that publishes wiki pages,
              guides, social links, launch information, and other reference material related to
              Illusion Connect: Re.
            </p>

            <h2>3. Acceptable Use</h2>
            <ul>
              <li>Use the site only for lawful purposes.</li>
              <li>Do not attempt to disrupt, overload, scrape, or gain unauthorized access to the site.</li>
              <li>Do not impersonate us or falsely claim affiliation with the site.</li>
              <li>Do not repost our original site copy at scale without permission and attribution.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original website copy, layouts, and branding for Illusion Connect: Re Wiki belong to
              the site owners unless otherwise noted. Illusion Connect: Re, related game assets, and
              platform branding remain the property of their respective owners.
            </p>

            <h2>5. Unofficial Status</h2>
            <p>
              Illusion Connect: Re Wiki is not affiliated with, endorsed by, or sponsored by
              SUGARGAME NETWORK LIMITED, Google Play, Apple, Discord, Facebook, Reddit, YouTube, or
              any other third-party platform linked from the site.
            </p>

            <h2>6. No Warranties</h2>
            <p>
              The site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not guarantee
              accuracy, completeness, availability, or uninterrupted access. Game patches, launch
              changes, and platform updates may make some information outdated.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent allowed by law, Illusion Connect: Re Wiki will not be liable for
              indirect, incidental, special, consequential, or punitive damages arising from your use
              of the site or reliance on its content.
            </p>

            <h2>8. External Links</h2>
            <p>
              We link to third-party websites for downloads, social communities, videos, and official
              information. Those sites are governed by their own terms and policies.
            </p>

            <h2>9. Changes</h2>
            <p>
              We may change these Terms of Service at any time. Continued use of the site after
              changes are published means you accept the updated terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a
                href="mailto:legal@illusionconnectre.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                legal@illusionconnectre.wiki
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
