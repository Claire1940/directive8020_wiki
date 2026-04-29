import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://directive8020.wiki').replace(/\/$/, '')
  const path = '/about'

  return {
    title: 'About Directive 8020 Wiki - Release, Trailer & Story Resource',
    description: 'Learn about Directive 8020 Wiki, an unofficial resource hub for release date details, trailers, platforms, story, characters, co-op, and survival horror guides.',
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
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Directive 8020 Wiki',
      title: 'About Directive 8020 Wiki',
      description: 'Learn about our mission to provide the best Directive 8020 game resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Directive 8020 Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Directive 8020 Wiki',
      description: 'Learn about our mission to provide the best Directive 8020 game resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Directive 8020 Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for Directive 8020
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: April 29, 2026
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Directive 8020 Wiki</h2>
            <p>
              Directive 8020 Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              follow the cinematic sci-fi survival horror game "Directive 8020". We are a community-driven platform that provides release details,
              trailer coverage, story context, character references, co-op notes, and survival horror guides.
            </p>
            <p>
              Whether you are tracking the May 12, 2026 release date, comparing platforms, or catching up on the Cassiopeia mission,
              Directive 8020 Wiki is here to keep the important details in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to organize accurate, up-to-date Directive 8020 information</strong>
              so players can quickly understand what is official, what has changed, and where to go next. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep release date, platform, preorder, and edition details aligned with official sources</li>
              <li><strong>Summarize official media:</strong> Track trailers, official pages, and community announcements without mixing them with rumor</li>
              <li><strong>Foster community:</strong> Create a useful space where players can learn, compare notes, and discuss the game together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Directive 8020 Wiki as the <strong>go-to destination</strong> for every Directive 8020 player seeking
              to understand the game before and after launch. We want to be the resource that players trust and rely on, whether they need
              release information, trailer context, character details, co-op notes, or survival horror guidance.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release Guides</h3>
              <p className="text-slate-300">
                Clear release date, platform, Steam preorder, edition, and price information for Directive 8020.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailer Coverage</h3>
              <p className="text-slate-300">
                Official trailer links, video summaries, and quick context for major scenes, reveals, and announcements.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🛰️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Story Reference</h3>
              <p className="text-slate-300">
                Background on the Cassiopeia, Tau Ceti f, the alien threat, and the survival horror premise.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">Characters and Cast</h3>
              <p className="text-slate-300">
                Character profiles, crew roles, cast notes, and relationship context as official details emerge.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🧭</div>
              <h3 className="text-xl font-semibold text-white mb-2">Choices and Co-op</h3>
              <p className="text-slate-300">
                Turning Points, branching outcomes, Movie Night, and co-op information for players planning a shared run.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages including English, Russian, Portuguese,
                German, Spanish, Japanese, Korean, and French.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Directive 8020 Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community discoveries:</strong> Questions from Steam, Discord, Reddit, and social channels help shape new guides</li>
              <li><strong>Official updates:</strong> We monitor official announcements and adjust our content accordingly</li>
              <li><strong>Launch changes:</strong> We update platform, co-op, preorder, and story coverage as new information becomes available</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you found a new official source, noticed an outdated release detail,
              or have suggestions for new guides, we'd love to hear from you. Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Directive 8020 Wiki is maintained by a small team of game fans and web developers who follow
              Directive 8020 closely. We track official sources, organize information, and keep the site usable as
              release details and community questions evolve.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Game research:</strong> Careful tracking of official Directive 8020 information and community questions</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Cassiopeia" - Tracking the mission together.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Directive 8020 Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Supermassive Games, Bandai Namco Entertainment, The Dark Pictures Anthology,
              Steam, Sony, Microsoft, or any official Directive 8020 publisher or platform holder.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Directive 8020 Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found a bug, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@directive8020.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@directive8020.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Bug Reports</h3>
                <a href="mailto:support@directive8020.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@directive8020.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@directive8020.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@directive8020.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@directive8020.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@directive8020.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest guides, tips, and Directive 8020 news.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
