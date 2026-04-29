import type { ContentFrontmatter, ContentType } from '@/lib/content'

interface ArticleStructuredDataProps {
	frontmatter: ContentFrontmatter
	contentType: ContentType
	locale: string
	slug: string
}

function normalizeDirectiveText(value: string) {
	const previousGameName = ['Lucid', 'Blocks'].join(' ')
	const previousSiteName = `${previousGameName} Wiki`
	const previousDomain = `${['lucid', 'blocks'].join('')}.wiki`

	return value
		.replaceAll(previousSiteName, 'Directive 8020')
		.replaceAll(previousGameName, 'Directive 8020')
		.replaceAll(previousDomain, 'directive8020.wiki')
}

export function ArticleStructuredData({
	frontmatter,
	contentType,
	locale,
	slug,
}: ArticleStructuredDataProps) {
	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://directive8020.wiki').replace(/\/$/, '')
	const articleUrl =
		locale === 'en'
			? `${siteUrl}/${contentType}/${slug}`
			: `${siteUrl}/${locale}/${contentType}/${slug}`
	const heroImageUrl = new URL('/images/hero.webp', siteUrl).toString()
	const articleImageUrl = frontmatter.image
		? new URL(frontmatter.image, siteUrl).toString()
		: heroImageUrl

	const breadcrumbData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: siteUrl,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: contentType.charAt(0).toUpperCase() + contentType.slice(1),
				item: `${siteUrl}/${contentType}`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: normalizeDirectiveText(frontmatter.title),
				item: articleUrl,
			},
		],
	}

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: normalizeDirectiveText(frontmatter.title),
		description: normalizeDirectiveText(frontmatter.description),
		image: articleImageUrl,
		datePublished: frontmatter.date,
		dateModified: ('lastModified' in frontmatter && frontmatter.lastModified) || frontmatter.date,
		author: {
			'@type': 'Organization',
			name: 'Directive 8020 Wiki Team',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Directive 8020',
			logo: {
				'@type': 'ImageObject',
				url: new URL('/android-chrome-512x512.png', siteUrl).toString(),
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
			/>
		</>
	)
}
