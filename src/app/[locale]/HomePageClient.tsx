"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, lazy } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  Download,
  ExternalLink,
  Gift,
  RefreshCw,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} rounded-xl border border-border bg-white/5 animate-pulse`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

function SectionHeader({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-12 scroll-reveal">
      <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">{title}</h2>
      <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
        {intro}
      </p>
    </div>
  );
}

function NavCard({
  href,
  icon,
  title,
  description,
  delay,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) {
  const sectionId = href.replace("#", "");

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(sectionId);
      }}
      className="scroll-reveal group rounded-2xl border border-border bg-card/90 p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.12)] md:p-6"
      style={{ animationDelay: delay }}
    >
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.22)] md:mb-4 md:h-12 md:w-12">
        {icon}
      </div>
      <h3 className="mb-1.5 text-sm font-semibold md:text-base">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const modules = t.modules as any;
  const toolsCards = t.tools.cards as any[];
  const seoHome = t.seo.home as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.illusionconnectre.wiki";
  const videoId = "_0GgrGHsHb8";
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const googlePlayUrl =
    "https://play.google.com/store/apps/details?id=com.sugargame.mjlj.gp";
  const appStoreUrl =
    "https://apps.apple.com/us/app/illusion-connect-re/id6758970424";
  const discordUrl = "https://discord.gg/hXfJJcKGu2";
  const facebookPageUrl = "https://www.facebook.com/IllusionConnectRe";
  const facebookGroupUrl = "https://www.facebook.com/groups/1681862183164309";
  const mobileBannerAd = getPreferredMobileBannerSelection() || {
    type: "banner-300x250" as const,
    adKey: process.env.NEXT_PUBLIC_AD_BANNER_300X250,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Illusion Connect: Re Wiki",
        description: seoHome.description,
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Illusion Connect: Re key art",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Illusion Connect: Re Wiki",
        alternateName: "Illusion Connect: Re",
        url: siteUrl,
        description: seoHome.ogDescription,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          googlePlayUrl,
          appStoreUrl,
          discordUrl,
          facebookPageUrl,
          facebookGroupUrl,
          youtubeWatchUrl,
        ],
      },
      {
        "@type": "VideoGame",
        name: "Illusion Connect: Re",
        gamePlatform: ["Android", "iOS"],
        applicationCategory: "Game",
        genre: ["RPG", "Strategy", "Gacha", "Anime"],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: googlePlayUrl,
        },
      },
      {
        "@type": "VideoObject",
        name: "Illusion Connect: Re Gameplay Showcase",
        description:
          "Gameplay showcase video for Illusion Connect: Re featuring launch-era combat and character presentation.",
        uploadDate: "2026-06-04",
        thumbnailUrl: youtubeThumbnailUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        url: youtubeWatchUrl,
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <aside
        className="fixed top-20 z-10 hidden w-40 xl:block"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside>

      <aside
        className="fixed top-20 z-10 hidden w-40 xl:block"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside>

      <section className="relative overflow-hidden px-4 pb-14 pt-24 md:pb-20 md:pt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center scroll-reveal">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1.5 md:mb-6 md:px-4 md:py-2">
              <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)] md:px-8 md:py-4 md:text-lg"
              >
                <Gift className="h-5 w-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>

          <div className="mx-auto mt-10 max-w-6xl scroll-reveal">
            <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--nav-theme)/0.25)] bg-black/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--nav-theme))/0.2] via-transparent to-[hsl(var(--nav-theme-light))/0.18]" />
              <Image
                src="/images/hero.webp"
                alt="Illusion Connect: Re hero artwork"
                width={1600}
                height={900}
                priority
                className="h-auto w-full object-cover"
                sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-5xl scroll-reveal">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId={videoId}
              title="Illusion Connect Re Gameplay Showcase"
              posterSrc={youtubeThumbnailUrl}
            />
          </div>
        </div>
      </section>

      <section className="bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center scroll-reveal md:mb-12">
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <NavCard
              href="#codes"
              icon={<Gift className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[0].title}
              description={toolsCards[0].description}
              delay="0ms"
            />
            <NavCard
              href="#release-download"
              icon={<Download className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[1].title}
              description={toolsCards[1].description}
              delay="50ms"
            />
            <NavCard
              href="#tier-list"
              icon={<Trophy className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[2].title}
              description={toolsCards[2].description}
              delay="100ms"
            />
            <NavCard
              href="#reroll-guide"
              icon={<RefreshCw className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[3].title}
              description={toolsCards[3].description}
              delay="150ms"
            />
            <NavCard
              href="#beginner-guide"
              icon={<Compass className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[4].title}
              description={toolsCards[4].description}
              delay="200ms"
            />
            <NavCard
              href="#radiants-and-best-team"
              icon={<Users className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[5].title}
              description={toolsCards[5].description}
              delay="250ms"
            />
            <NavCard
              href="#gameplay-and-battle-system"
              icon={<Swords className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[6].title}
              description={toolsCards[6].description}
              delay="300ms"
            />
            <NavCard
              href="#launch-rewards-and-events"
              icon={<CalendarDays className="h-5 w-5 md:h-6 md:w-6" />}
              title={toolsCards[7].title}
              description={toolsCards[7].description}
              delay="350ms"
            />
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      <AdBanner
        type={mobileBannerAd.type}
        adKey={mobileBannerAd.adKey}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReCodes.title}
            intro={modules.illusionConnectReCodes.intro}
          />

          <div className="mb-8 grid gap-4 lg:grid-cols-[1.35fr,1fr] md:mb-10">
            <div className="space-y-4 scroll-reveal">
              <div className="rounded-2xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.05)] p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Gift className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-lg font-bold">
                    {modules.illusionConnectReCodes.activeTitle}
                  </h3>
                </div>
                <div className="grid gap-3">
                  {modules.illusionConnectReCodes.codes.map((code: any) => (
                    <div
                      key={code.code}
                      className="rounded-xl border border-border bg-card/80 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <code className="text-sm font-semibold text-[hsl(var(--nav-theme-light))] md:text-base">
                          {code.code}
                        </code>
                        <span className="rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] px-2.5 py-1 text-xs font-medium">
                          {code.reward}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white/5 p-5 md:p-6 scroll-reveal">
                <div className="mb-4 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                  <h3 className="text-lg font-bold">
                    {modules.illusionConnectReCodes.expiredTitle}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {modules.illusionConnectReCodes.expiredCodes.map(
                    (code: any) => (
                      <span
                        key={code.code}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        {code.code}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white/5 p-5 md:p-6 scroll-reveal">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="text-lg font-bold">
                  {modules.illusionConnectReCodes.stepsTitle}
                </h3>
              </div>
              <ol className="space-y-3">
                {modules.illusionConnectReCodes.steps.map(
                  (step: string, index: number) => (
                    <li key={step} className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm text-muted-foreground md:text-base">
                        {step}
                      </p>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      <section id="release-download" className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReReleaseDownload.title}
            intro={modules.illusionConnectReReleaseDownload.intro}
          />

          <div className="grid gap-3 scroll-reveal">
            {modules.illusionConnectReReleaseDownload.items.map((item: any) => (
              <div
                key={item.label}
                className="grid gap-2 rounded-2xl border border-border bg-card/80 p-4 md:grid-cols-[220px,1fr] md:items-center md:p-5"
              >
                <div className="text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                  {item.label}
                </div>
                <div className="text-sm text-muted-foreground md:text-base">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-[hsl(var(--nav-theme-light))]"
                    >
                      {item.value}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReTierList.title}
            intro={modules.illusionConnectReTierList.intro}
          />

          <div className="space-y-5 scroll-reveal">
            {modules.illusionConnectReTierList.tiers.map((tier: any) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-border bg-white/5 p-5 md:p-6"
              >
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium">
                    {tier.focus}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {tier.characters.map((character: any) => (
                    <div
                      key={character.name}
                      className="rounded-xl border border-border bg-card/80 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h4 className="font-semibold">{character.name}</h4>
                        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                          {character.role}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-[hsl(var(--nav-theme-light))]">
                        {character.bestFor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {character.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reroll-guide" className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReRerollGuide.title}
            intro={modules.illusionConnectReRerollGuide.intro}
          />

          <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-2xl border border-border bg-white/5 p-5 md:p-6 scroll-reveal">
              <h3 className="mb-4 text-lg font-bold">
                {modules.illusionConnectReRerollGuide.stepsTitle}
              </h3>
              <div className="space-y-3">
                {modules.illusionConnectReRerollGuide.steps.map(
                  (step: any, index: number) => (
                    <div
                      key={step.title}
                      className="rounded-xl border border-border bg-card/80 p-4"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4 scroll-reveal">
              <div className="rounded-2xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.05)] p-5 md:p-6">
                <h3 className="mb-4 text-lg font-bold">
                  {modules.illusionConnectReRerollGuide.targetsTitle}
                </h3>
                <div className="space-y-3">
                  {modules.illusionConnectReRerollGuide.targets.map(
                    (target: any) => (
                      <div
                        key={target.name}
                        className="rounded-xl border border-border bg-card/80 p-4"
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <h4 className="font-semibold">{target.name}</h4>
                          <span className="text-xs text-[hsl(var(--nav-theme-light))]">
                            {target.role}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {target.reason}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white/5 p-5 md:p-6">
                <h3 className="mb-4 text-lg font-bold">
                  {modules.illusionConnectReRerollGuide.stopTitle}
                </h3>
                <ul className="space-y-2">
                  {modules.illusionConnectReRerollGuide.stopRules.map(
                    (rule: string) => (
                      <li key={rule} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">
                          {rule}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReBeginnerGuide.title}
            intro={modules.illusionConnectReBeginnerGuide.intro}
          />

          <div className="mb-8 space-y-3 md:mb-10 md:space-y-4 scroll-reveal">
            {modules.illusionConnectReBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-2xl border border-border bg-white/5 p-4 md:gap-4 md:p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-lg font-bold md:mb-2 md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground md:text-base">
                      {step.description}
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] p-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                          Priority
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.priority}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-card/80 p-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                          Avoid
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.avoid}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="radiants-and-best-team" className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReRadiantsAndBestTeam.title}
            intro={modules.illusionConnectReRadiantsAndBestTeam.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 scroll-reveal">
            {modules.illusionConnectReRadiantsAndBestTeam.items.map(
              (item: any) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card/80 p-5"
                >
                  <div className="mb-3 inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {item.role}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="rounded-xl border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.08)] p-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme-light))]">
                      Best Use
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.bestUse}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="gameplay-and-battle-system" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReGameplayAndBattleSystem.title}
            intro={modules.illusionConnectReGameplayAndBattleSystem.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 scroll-reveal">
            {modules.illusionConnectReGameplayAndBattleSystem.items.map(
              (item: any) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-white/5 p-5 md:p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Swords className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="mb-3 text-sm text-[hsl(var(--nav-theme-light))]">
                    {item.summary}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.details}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="launch-rewards-and-events" className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            title={modules.illusionConnectReLaunchRewardsAndEvents.title}
            intro={modules.illusionConnectReLaunchRewardsAndEvents.intro}
          />

          <div className="grid gap-4 md:grid-cols-2 scroll-reveal">
            {modules.illusionConnectReLaunchRewardsAndEvents.items.map(
              (item: any) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card/80 p-5"
                >
                  <div className="mb-3 inline-flex rounded-full border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.12)] px-3 py-1 text-xs font-medium text-[hsl(var(--nav-theme-light))]">
                    {item.type}
                  </div>
                  <h3 className="mb-3 text-lg font-bold">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {item.requirement}
                  </p>
                  <div className="space-y-2">
                    {item.rewards.map((reward: string) => (
                      <div
                        key={reward}
                        className="flex gap-2 rounded-xl border border-border bg-white/5 p-3"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <p className="text-sm text-muted-foreground">
                          {reward}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      <footer className="border-t border-border bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href={facebookGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href={googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={locale === "en" ? "/about" : `/${locale}/about`}
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/privacy-policy"
                        : `/${locale}/privacy-policy`
                    }
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en"
                        ? "/terms-of-service"
                        : `/${locale}/terms-of-service`
                    }
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "en" ? "/copyright" : `/${locale}/copyright`
                    }
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <div className="rounded-2xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.08)] p-5">
                <h4 className="mb-2 font-semibold text-[hsl(var(--nav-theme-light))]">
                  {t.gameFeature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t.gameFeature.description}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{t.footer.copyright}</p>
            <p className="mt-2">{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
