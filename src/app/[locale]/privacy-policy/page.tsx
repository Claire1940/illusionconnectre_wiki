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
  const path = '/privacy-policy'
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: 'Privacy Policy - Illusion Connect: Re Wiki',
    description:
      'Privacy Policy for Illusion Connect: Re Wiki. Learn what limited data we collect, how analytics and ads are used, and how to contact us about privacy requests.',
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
      title: 'Privacy Policy - Illusion Connect: Re Wiki',
      description:
        'Learn how Illusion Connect: Re Wiki handles analytics, cookies, advertising, and privacy requests.',
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
      title: 'Privacy Policy - Illusion Connect: Re Wiki',
      description:
        'Learn how Illusion Connect: Re Wiki handles analytics, cookies, advertising, and privacy requests.',
      images: [heroImage],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-2 text-lg text-slate-300">
            How Illusion Connect: Re Wiki collects, uses, and protects limited visitor data
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              Illusion Connect: Re Wiki is an unofficial fan-made resource site focused on guides,
              launch information, social links, and reference material for Illusion Connect: Re.
              This Privacy Policy explains what information we collect when you use the site.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Basic device and browser data such as IP address, browser type, and operating system.</li>
              <li>Usage information such as page views, scroll behavior, and navigation events.</li>
              <li>Language and theme preferences stored locally in your browser for site functionality.</li>
              <li>Advertising and referral information from third-party ad providers, if enabled.</li>
            </ul>

            <h2>3. How We Use Data</h2>
            <ul>
              <li>Operate and improve Illusion Connect: Re Wiki.</li>
              <li>Measure which guides, pages, and social links are useful to visitors.</li>
              <li>Detect abuse, performance issues, and broken links.</li>
              <li>Support advertising, analytics, and content planning.</li>
            </ul>

            <h2>4. Cookies and Similar Technologies</h2>
            <p>
              We may use cookies, local storage, and similar technologies to remember preferences,
              measure traffic, and support advertising delivery. You can clear or block these
              technologies through your browser settings, but some site features may behave
              differently afterwards.
            </p>

            <h2>5. Analytics and Advertising</h2>
            <p>
              We may use Google Analytics, Microsoft Clarity, Google AdSense, or similar tools to
              understand usage and fund the site. These providers may process technical data subject
              to their own privacy policies.
            </p>
            <p>
              You can review Google&apos;s privacy information at{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                policies.google.com/privacy
              </a>{' '}
              and Microsoft&apos;s privacy information at{' '}
              <a
                href="https://privacy.microsoft.com/en-us/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                privacy.microsoft.com
              </a>
              .
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Illusion Connect: Re Wiki links to third-party services including Google Play, the App
              Store, Discord, Facebook, Reddit, YouTube, and other community resources. We do not
              control those services and are not responsible for their privacy practices.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain analytics and operational data only for as long as reasonably necessary to
              operate, secure, and improve the site, or as required by applicable law.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              This website is intended for a general audience and is not directed to children under
              13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>9. International Visitors</h2>
            <p>
              The site may be hosted or processed in countries other than your own. By using Illusion
              Connect: Re Wiki, you understand that your information may be transferred to and
              processed in those jurisdictions.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              Last Updated date on this page.
            </p>

            <h2>11. Contact</h2>
            <p>
              For privacy questions or requests, contact{' '}
              <a
                href="mailto:privacy@illusionconnectre.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                privacy@illusionconnectre.wiki
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
