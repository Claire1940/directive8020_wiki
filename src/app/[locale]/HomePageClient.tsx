'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  Check,
  ChevronDown,
  Clapperboard,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Eye,
  Film,
  FlaskConical,
  Gamepad2,
  Hammer,
  HeartPulse,
  Home,
  ListVideo,
  MessageCircle,
  MonitorPlay,
  Orbit,
  Package,
  PlayCircle,
  Radio,
  Rocket,
  RotateCcw,
  Satellite,
  Settings,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  UserCircle,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useMessages } from 'next-intl'
import enMessages from '@/locales/en.json'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  locale: string
  featuredVideo: {
    videoId: string
    title: string
  }
}

export default function HomePageClient({ latestArticles, locale, featuredVideo }: HomePageClientProps) {
  const messages = useMessages() as any
  const t = messages.tools?.title === 'Directive 8020' ? messages : enMessages as any
  const storyOverviewIcons: LucideIcon[] = [Rocket, Orbit, AlertTriangle, Home]
  const storyItemIcons: LucideIcon[] = [BookOpen, AlertTriangle, Home, MessageCircle, Star]
  const trailerIcons: LucideIcon[] = [PlayCircle, Users, MonitorPlay, Clapperboard, Film, ListVideo]
  const characterIcons: LucideIcon[] = [
    UserCircle,
    Shield,
    Brain,
    Wrench,
    HeartPulse,
    FlaskConical,
    Rocket,
    Clock,
    Satellite,
    Building2,
  ]
  const coopStepIcons: LucideIcon[] = [UserCircle, Users, Gamepad2, RotateCcw, BadgeCheck, Radio]
  const turningPointStepIcons: LucideIcon[] = [BadgeCheck, Brain, RotateCcw, Eye, Star, Shield]
  const platformIcons: LucideIcon[] = [MonitorPlay, Gamepad2, Shield, AlertTriangle]
  const deluxeBenefitIcons: LucideIcon[] = [Package, UserCircle, ClipboardCheck, Film, BookOpen, Radio]
  const beginnerStepIcons: LucideIcon[] = [Clapperboard, AlertTriangle, Eye, Shield, Clock, BookOpen, Users, RotateCcw]
  const choicesConsequenceIcons: LucideIcon[] = [MessageCircle, AlertTriangle, Brain, Shield, Users]
  const darkPicturesIcons: LucideIcon[] = [BookOpen, Clapperboard, Orbit, Eye, Users]
  const ageRatingIcons: LucideIcon[] = [ClipboardCheck, Shield, BadgeCheck, MonitorPlay, Rocket, AlertTriangle, MessageCircle, HeartPulse]
  const latestNewsIcons: LucideIcon[] = [ListVideo, Clapperboard, Clock, Radio, MessageCircle]

  // Accordion states for modules that contain expandable choices.
  const [choicesExpanded, setChoicesExpanded] = useState<number | null>(null)

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://www.directive8020.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-background rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/2255370/Directive_8020/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId={featuredVideo.videoId}
              title={featuredVideo.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Tools Grid - 16 Navigation Cards */}
      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}{' '}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <a href="#release-date" onClick={(event) => { event.preventDefault(); scrollToSection('release-date'); window.history.replaceState(null, '', '#release-date') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[0].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>
            <a href="#steam-pre-order" onClick={(event) => { event.preventDefault(); scrollToSection('steam-pre-order'); window.history.replaceState(null, '', '#steam-pre-order') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[1].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>
            <a href="#system-requirements" onClick={(event) => { event.preventDefault(); scrollToSection('system-requirements'); window.history.replaceState(null, '', '#system-requirements') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[2].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>
            <a href="#gameplay" onClick={(event) => { event.preventDefault(); scrollToSection('gameplay'); window.history.replaceState(null, '', '#gameplay') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[3].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>
            <a href="#story" onClick={(event) => { event.preventDefault(); scrollToSection('story'); window.history.replaceState(null, '', '#story') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[4].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>
            <a href="#trailer" onClick={(event) => { event.preventDefault(); scrollToSection('trailer'); window.history.replaceState(null, '', '#trailer') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[5].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>
            <a href="#characters" onClick={(event) => { event.preventDefault(); scrollToSection('characters'); window.history.replaceState(null, '', '#characters') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[6].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>
            <a href="#co-op-multiplayer" onClick={(event) => { event.preventDefault(); scrollToSection('co-op-multiplayer'); window.history.replaceState(null, '', '#co-op-multiplayer') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[7].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>
            <a href="#turning-points" onClick={(event) => { event.preventDefault(); scrollToSection('turning-points'); window.history.replaceState(null, '', '#turning-points') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[8].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[8].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[8].description}</p>
            </a>
            <a href="#platforms" onClick={(event) => { event.preventDefault(); scrollToSection('platforms'); window.history.replaceState(null, '', '#platforms') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[9].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[9].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[9].description}</p>
            </a>
            <a href="#digital-deluxe-edition" onClick={(event) => { event.preventDefault(); scrollToSection('digital-deluxe-edition'); window.history.replaceState(null, '', '#digital-deluxe-edition') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[10].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[10].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[10].description}</p>
            </a>
            <a href="#beginner-guide" onClick={(event) => { event.preventDefault(); scrollToSection('beginner-guide'); window.history.replaceState(null, '', '#beginner-guide') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[11].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[11].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[11].description}</p>
            </a>
            <a href="#choices-and-consequences" onClick={(event) => { event.preventDefault(); scrollToSection('choices-and-consequences'); window.history.replaceState(null, '', '#choices-and-consequences') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[12].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[12].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[12].description}</p>
            </a>
            <a href="#dark-pictures-connection" onClick={(event) => { event.preventDefault(); scrollToSection('dark-pictures-connection'); window.history.replaceState(null, '', '#dark-pictures-connection') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[13].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[13].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[13].description}</p>
            </a>
            <a href="#age-rating" onClick={(event) => { event.preventDefault(); scrollToSection('age-rating'); window.history.replaceState(null, '', '#age-rating') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[14].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[14].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[14].description}</p>
            </a>
            <a href="#latest-news" onClick={(event) => { event.preventDefault(); scrollToSection('latest-news'); window.history.replaceState(null, '', '#latest-news') }} className="scroll-reveal group p-6 rounded-xl border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]">
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[15].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[15].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[15].description}</p>
            </a>
          </div>
        </div>
      </section>

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Directive 8020 Release Date */}
      <section id="release-date" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.directive8020ReleaseDate.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.directive8020ReleaseDate.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {t.modules.directive8020ReleaseDate.cards.map((card: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">{card.badge}</span>
                  <Clock className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{card.label}</h3>
                <p className="text-2xl font-bold text-[hsl(var(--nav-theme-light))] mb-3">{card.value}</p>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-lg">{t.modules.directive8020ReleaseDate.notesTitle}</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.directive8020ReleaseDate.notes.map((note: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Directive 8020 Steam Pre-Order */}
      <section id="steam-pre-order" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020SteamPreOrder.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020SteamPreOrder.intro}</p>
          </div>

          <div className="scroll-reveal overflow-hidden border border-border rounded-xl mb-8">
            <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_1.6fr_.8fr] gap-4 px-5 py-4 bg-[hsl(var(--nav-theme)/0.08)] text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
              <span>Store</span>
              <span>Status</span>
              <span>Price</span>
              <span>Included Bonus</span>
              <span>Link</span>
            </div>
            {t.modules.directive8020SteamPreOrder.stores.map((store: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.6fr_.8fr] gap-3 md:gap-4 px-5 py-5 border-t border-border bg-white/5">
                <div>
                  <p className="md:hidden text-xs text-muted-foreground mb-1">Store</p>
                  <p className="font-bold">{store.platform}</p>
                  <p className="text-xs text-muted-foreground mt-1">{store.detail}</p>
                </div>
                <div>
                  <p className="md:hidden text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm">{store.status}</p>
                </div>
                <div>
                  <p className="md:hidden text-xs text-muted-foreground mb-1">Price</p>
                  <p className="text-sm font-semibold text-[hsl(var(--nav-theme-light))]">{store.price}</p>
                </div>
                <div>
                  <p className="md:hidden text-xs text-muted-foreground mb-1">Included Bonus</p>
                  <p className="text-sm text-muted-foreground">{store.bonus}</p>
                </div>
                <a
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[hsl(var(--nav-theme)/0.3)] px-3 py-2 text-sm hover:bg-[hsl(var(--nav-theme)/0.12)] transition-colors"
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            {t.modules.directive8020SteamPreOrder.bonuses.map((bonus: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm">
                <Package className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />{bonus}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Directive 8020 System Requirements */}
      <section id="system-requirements" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020SystemRequirements.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020SystemRequirements.intro}</p>
          </div>

          <div className="scroll-reveal overflow-hidden border border-border rounded-xl mb-8">
            <div className="hidden md:grid grid-cols-[1fr_1.4fr_1.4fr_1.4fr] gap-4 px-5 py-4 bg-[hsl(var(--nav-theme)/0.08)] text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
              <span>Requirement</span>
              <span>Minimum</span>
              <span>Recommended</span>
              <span>Player Note</span>
            </div>
            {t.modules.directive8020SystemRequirements.requirements.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr_1.4fr] gap-3 md:gap-4 px-5 py-5 border-t border-border bg-white/5">
                <div className="font-bold flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                  {item.requirement}
                </div>
                <p className="text-sm text-muted-foreground">{item.minimum}</p>
                <p className="text-sm text-muted-foreground">{item.recommended}</p>
                <p className="text-sm">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.directive8020SystemRequirements.summary.map((item: string, index: number) => (
              <div key={index} className="p-5 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Directive 8020 Gameplay */}
      <section id="gameplay" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020Gameplay.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020Gameplay.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {t.modules.directive8020Gameplay.features.map((feature: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{feature.type}</span>
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.mechanics.map((mechanic: string, i: number) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.08)] text-[hsl(var(--nav-theme-light))]">{mechanic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold">{t.modules.directive8020Gameplay.notesTitle}</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.directive8020Gameplay.survivalNotes.map((note: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: Directive 8020 Story */}
      <section id="story" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020Story.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] text-base font-medium max-w-3xl mx-auto mb-3">
              {t.modules.directive8020Story.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020Story.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-6 items-start mb-8">
            <aside className="lg:sticky lg:top-24 p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-center gap-3 mb-5">
                <Rocket className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-lg">{t.modules.directive8020Story.overviewTitle}</h3>
              </div>
              <div className="space-y-3">
                {t.modules.directive8020Story.overviewStats.map((stat: any, index: number) => {
                  const Icon = storyOverviewIcons[index % storyOverviewIcons.length]
                  return (
                    <div key={stat.label} className="flex items-center gap-3 p-3 bg-white/5 border border-border rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </aside>

            <div className="space-y-3">
              {t.modules.directive8020Story.items.map((item: any, index: number) => {
                const Icon = storyItemIcons[index % storyItemIcons.length]
                return (
                  <details key={item.question} className="group border border-border rounded-xl overflow-hidden bg-white/5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/5 transition-colors">
                      <span className="flex items-center gap-3 font-semibold">
                        <span className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                        </span>
                        {item.question}
                      </span>
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 pl-16 text-muted-foreground text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.modules.directive8020Story.highlights.map((highlight: string) => (
              <div key={highlight} className="p-4 bg-white/5 border border-border rounded-xl text-center">
                <Sparkles className="w-6 h-6 text-[hsl(var(--nav-theme-light))] mx-auto mb-2" />
                <p className="text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Directive 8020 Trailer */}
      <section id="trailer" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020Trailer.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] text-base font-medium max-w-3xl mx-auto mb-3">
              {t.modules.directive8020Trailer.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020Trailer.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {t.modules.directive8020Trailer.videos.map((video: any, index: number) => {
              const Icon = trailerIcons[index % trailerIcons.length]
              return (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-[hsl(var(--nav-theme)/0.05)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                      <Icon className="w-4 h-4" />
                      {video.type}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--nav-theme-light))] transition-colors" />
                  </div>
                  <h3 className="font-bold mb-2">{video.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{video.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 7: Directive 8020 Characters */}
      <section id="characters" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020Characters.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] text-base font-medium max-w-3xl mx-auto mb-3">
              {t.modules.directive8020Characters.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020Characters.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.directive8020Characters.crew.map((member: any, index: number) => {
              const Icon = characterIcons[index % characterIcons.length]
              return (
                <div key={member.name} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <h3 className="font-bold">{member.name}</h3>
                        <p className="text-xs text-muted-foreground">{member.cast}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))] whitespace-nowrap">
                      {member.age}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full border border-border bg-white/5">{member.role}</span>
                    {member.relationships.map((relationship: string) => (
                      <span key={relationship} className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.08)] text-[hsl(var(--nav-theme-light))]">
                        {relationship}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 8: Directive 8020 Co-Op Multiplayer */}
      <section id="co-op-multiplayer" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020CoOpMultiplayer.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] text-base font-medium max-w-3xl mx-auto mb-3">
              {t.modules.directive8020CoOpMultiplayer.subtitle}
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020CoOpMultiplayer.intro}</p>
          </div>
          <div className="scroll-reveal relative mb-8">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--nav-theme)/0.3)]" />
            <div className="space-y-4">
              {t.modules.directive8020CoOpMultiplayer.steps.map((step: any, index: number) => {
                const Icon = coopStepIcons[index % coopStepIcons.length]
                const isEven = index % 2 === 0
                const stepCard = (
                  <div className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.12)] text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                          <span className="text-xs px-2 py-1 rounded-full border border-border bg-white/5">{step.availability}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
                return (
                  <div key={step.title} className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEven ? (
                      <>
                        {stepCard}
                        <div className="hidden md:block" />
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block" />
                        {stepCard}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.modules.directive8020CoOpMultiplayer.modes.map((mode: string) => (
              <span key={mode} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm">
                <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />{mode}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* Module 9: Directive 8020 Turning Points */}
      <section id="turning-points" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020TurningPoints.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium mb-3">{t.modules.directive8020TurningPoints.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020TurningPoints.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
            <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-px before:bg-[hsl(var(--nav-theme)/0.3)]">
              {t.modules.directive8020TurningPoints.steps.map((step: any, index: number) => {
                const Icon = turningPointStepIcons[index % turningPointStepIcons.length]
                return (
                  <div key={index} className="relative p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="absolute -left-[1.85rem] top-6 w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="sticky top-24 p-6 bg-[hsl(var(--nav-theme)/0.06)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold">{t.modules.directive8020TurningPoints.previewTitle}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{t.modules.directive8020TurningPoints.previewDescription}</p>
              <div className="space-y-3">
                {t.modules.directive8020TurningPoints.uses.map((use: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 10: Directive 8020 Platforms */}
      <section id="platforms" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020Platforms.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium mb-3">{t.modules.directive8020Platforms.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020Platforms.intro}</p>
          </div>
          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border bg-white/5">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                <tr>
                  <th className="p-4 text-left font-semibold">Platform</th>
                  <th className="p-4 text-left font-semibold">Release</th>
                  <th className="p-4 text-left font-semibold">Format</th>
                  <th className="p-4 text-left font-semibold">Multiplayer</th>
                  <th className="p-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {t.modules.directive8020Platforms.platforms.map((platform: any, index: number) => {
                  const Icon = platformIcons[index % platformIcons.length]
                  return (
                    <tr key={index} className="align-top hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                          </div>
                          <div>
                            <p className="font-bold">{platform.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{platform.storefront}</p>
                            <span className="inline-flex mt-2 text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">{platform.preOrderStatus}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{platform.releaseDate}</td>
                      <td className="p-4 text-muted-foreground">{platform.format}</td>
                      <td className="p-4 text-muted-foreground">{platform.multiplayer}</td>
                      <td className="p-4 text-muted-foreground">{platform.notes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:hidden">
            {t.modules.directive8020Platforms.platforms.map((platform: any, index: number) => {
              const Icon = platformIcons[index % platformIcons.length]
              return (
                <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-bold">{platform.name}</h3>
                      <p className="text-sm text-muted-foreground">{platform.storefront}</p>
                    </div>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Release</dt>
                      <dd className="text-right">{platform.releaseDate}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Format</dt>
                      <dd className="text-right">{platform.format}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Pre-order</dt>
                      <dd className="text-right">{platform.preOrderStatus}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground mb-1">Multiplayer</dt>
                      <dd>{platform.multiplayer}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground mb-1">Notes</dt>
                      <dd>{platform.notes}</dd>
                    </div>
                  </dl>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 11: Directive 8020 Digital Deluxe Edition */}
      <section id="digital-deluxe-edition" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020DigitalDeluxeEdition.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium mb-3">{t.modules.directive8020DigitalDeluxeEdition.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020DigitalDeluxeEdition.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.directive8020DigitalDeluxeEdition.benefits.map((benefit: any, index: number) => {
              const Icon = deluxeBenefitIcons[index % deluxeBenefitIcons.length]
              return (
                <div key={index} className="p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">{benefit.category}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{benefit.description}</p>
                  <p className="text-xs text-muted-foreground border-t border-border pt-3">{benefit.availability}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 12: Directive 8020 Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Hammer className="w-8 h-8 text-[hsl(var(--nav-theme-light))]" />
              <h2 className="text-4xl md:text-5xl font-bold">{t.modules.directive8020BeginnerGuide.title}</h2>
            </div>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium mb-3">{t.modules.directive8020BeginnerGuide.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020BeginnerGuide.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.directive8020BeginnerGuide.steps.map((step: any, index: number) => {
              const Icon = beginnerStepIcons[index % beginnerStepIcons.length]
              return (
                <div key={index} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[hsl(var(--nav-theme-light))]">{step.step}</span>
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 13: Directive 8020 Choices and Consequences */}
      <section id="choices-and-consequences" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm text-[hsl(var(--nav-theme-light))] mb-4">
              <MessageCircle className="w-4 h-4" />
              {t.modules.directive8020ChoicesConsequences.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020ChoicesConsequences.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-3">{t.modules.directive8020ChoicesConsequences.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020ChoicesConsequences.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-[1.35fr_0.75fr] gap-6 items-start">
            <div className="space-y-3">
              {t.modules.directive8020ChoicesConsequences.items.map((item: any, index: number) => {
                const Icon = choicesConsequenceIcons[index % choicesConsequenceIcons.length]
                return (
                  <div key={item.title} className="border border-border rounded-xl overflow-hidden bg-white/5">
                    <button
                      onClick={() => setChoicesExpanded(choicesExpanded === index ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[hsl(var(--nav-theme)/0.06)] transition-colors"
                    >
                      <span className="flex items-center gap-3 font-semibold">
                        <span className="w-11 h-11 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                        </span>
                        {item.title}
                      </span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${choicesExpanded === index ? 'rotate-180' : ''}`} />
                    </button>
                    {choicesExpanded === index && (
                      <div className="px-5 pb-5 pl-20">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.content}</p>
                        <ul className="space-y-2">
                          {item.points.map((point: string) => (
                            <li key={point} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <aside className="lg:sticky lg:top-24 p-6 rounded-xl bg-[hsl(var(--nav-theme)/0.06)] border border-[hsl(var(--nav-theme)/0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-lg">{t.modules.directive8020ChoicesConsequences.summaryTitle}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{t.modules.directive8020ChoicesConsequences.summaryDescription}</p>
              <div className="space-y-3">
                {t.modules.directive8020ChoicesConsequences.summaryPoints.map((point: string) => (
                  <div key={point} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-border">
                    <ArrowRight className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Module 14: Directive 8020 The Dark Pictures Connection */}
      <section id="dark-pictures-connection" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm text-[hsl(var(--nav-theme-light))] mb-4">
              <Sparkles className="w-4 h-4" />
              {t.modules.directive8020DarkPicturesConnection.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020DarkPicturesConnection.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-3">{t.modules.directive8020DarkPicturesConnection.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020DarkPicturesConnection.intro}</p>
          </div>
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {t.modules.directive8020DarkPicturesConnection.items.map((item: any, index: number) => {
              const Icon = darkPicturesIcons[index % darkPicturesIcons.length]
              return (
                <div key={item.title} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <span className="inline-flex text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))] mb-3">{item.meta}</span>
                  <h3 className="font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 15: Directive 8020 Age Rating */}
      <section id="age-rating" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm text-[hsl(var(--nav-theme-light))] mb-4">
              <ClipboardCheck className="w-4 h-4" />
              {t.modules.directive8020AgeRating.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020AgeRating.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-3">{t.modules.directive8020AgeRating.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020AgeRating.intro}</p>
          </div>

          <div className="scroll-reveal hidden md:block overflow-hidden rounded-xl border border-border bg-white/5">
            <table className="w-full text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)] text-[hsl(var(--nav-theme-light))]">
                <tr>
                  <th className="p-4 text-left font-semibold">Directive 8020 Rating Area</th>
                  <th className="p-4 text-left font-semibold">Value</th>
                  <th className="p-4 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {t.modules.directive8020AgeRating.items.map((item: any, index: number) => {
                  const Icon = ageRatingIcons[index % ageRatingIcons.length]
                  return (
                    <tr key={item.category} className="align-top hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                          </div>
                          <span className="font-bold">{item.category}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-[hsl(var(--nav-theme-light))]">{item.value}</td>
                      <td className="p-4 text-muted-foreground leading-relaxed">{item.details}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal grid grid-cols-1 gap-4 md:hidden">
            {t.modules.directive8020AgeRating.items.map((item: any, index: number) => {
              const Icon = ageRatingIcons[index % ageRatingIcons.length]
              return (
                <div key={item.category} className="p-5 bg-white/5 border border-border rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.category}</h3>
                      <p className="text-[hsl(var(--nav-theme-light))] text-sm font-semibold mt-1">{item.value}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.details}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module 16: Directive 8020 Latest News */}
      <section id="latest-news" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm text-[hsl(var(--nav-theme-light))] mb-4">
              <Clock className="w-4 h-4" />
              {t.modules.directive8020LatestNews.eyebrow}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.directive8020LatestNews.title}</h2>
            <p className="text-[hsl(var(--nav-theme-light))] font-medium max-w-3xl mx-auto mb-3">{t.modules.directive8020LatestNews.subtitle}</p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.directive8020LatestNews.intro}</p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {t.modules.directive8020LatestNews.items.map((item: any, index: number) => {
              const Icon = latestNewsIcons[index % latestNewsIcons.length]
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-[hsl(var(--nav-theme)/0.05)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--nav-theme)/0.3)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--nav-theme-light))] transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">{item.date}</span>
                    <span className="text-xs px-2 py-1 rounded-full border border-border bg-white/5">{item.category}</span>
                  </div>
                  <h3 className="font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/supermassivegames"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/TheDarkPictures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/DarkPicturesAnthology/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@SupermassiveGamesOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/2255370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/2255370/Directive_8020/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.directive8020.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.officialSite}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
