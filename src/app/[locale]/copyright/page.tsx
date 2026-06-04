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
  const path = '/copyright'
  const heroImage = `${siteUrl}/images/hero.webp`

  return {
    title: 'Copyright Notice - Illusion Connect: Re Wiki',
    description:
      'Copyright notice for Illusion Connect: Re Wiki including fair-use statements, trademark ownership, and DMCA contact information.',
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
      title: 'Copyright Notice - Illusion Connect: Re Wiki',
      description:
        'Review copyright, trademark, fair-use, and DMCA information for Illusion Connect: Re Wiki.',
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
      title: 'Copyright Notice - Illusion Connect: Re Wiki',
      description:
        'Review copyright, trademark, fair-use, and DMCA information for Illusion Connect: Re Wiki.',
      images: [heroImage],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative border-b border-border px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Copyright Notice
          </h1>
          <p className="mb-2 text-lg text-slate-300">
            Intellectual property, fair use, and reporting information
          </p>
          <p className="text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Website Copyright</h2>
            <p>
              © 2026 Illusion Connect: Re Wiki. Original site copy, layouts, and editorial material
              published on this website are protected by copyright unless otherwise stated.
            </p>

            <h2>2. Game Assets and Trademarks</h2>
            <p>
              Illusion Connect: Re, related names, logos, character art, screenshots, store assets,
              and platform marks are the property of their respective owners. This site is unofficial
              and claims no ownership over third-party game or platform assets.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We may display limited game artwork, screenshots, logos, trailers, and references for
              commentary, identification, archival, educational, and informational purposes. We
              believe this use is transformative and non-official in context.
            </p>

            <h2>4. Copyright Complaints</h2>
            <p>
              If you believe content on Illusion Connect: Re Wiki infringes your rights, send a
              notice that includes:
            </p>
            <ul>
              <li>Your name and contact details.</li>
              <li>The copyrighted work you believe is infringed.</li>
              <li>The exact URL or description of the material at issue.</li>
              <li>A statement that you have a good-faith belief the use is unauthorized.</li>
              <li>A statement that your notice is accurate and submitted under penalty of perjury where required.</li>
            </ul>

            <h2>5. DMCA Contact</h2>
            <p>
              Send copyright or DMCA notices to{' '}
              <a
                href="mailto:dmca@illusionconnectre.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                dmca@illusionconnectre.wiki
              </a>
              .
            </p>

            <h2>6. Counter Notices</h2>
            <p>
              If you believe material was removed in error, you may submit a counter notice with the
              information required by applicable law to the same contact address.
            </p>

            <h2>7. Contact</h2>
            <p>
              General copyright questions can be sent to{' '}
              <a
                href="mailto:copyright@illusionconnectre.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                copyright@illusionconnectre.wiki
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
