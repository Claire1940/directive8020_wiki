import type { ContentFrontmatter, ContentType } from '@/lib/content'

interface ListStructuredDataProps {
	contentType: ContentType
	locale: string
	items: Array<{ slug: string; frontmatter: ContentFrontmatter }>
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

export function ListStructuredData({ contentType, locale, items }: ListStructuredDataProps) {
	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://directive8020.wiki').replace(/\/$/, '')
	const listUrl =
		locale === 'en' ? `${siteUrl}/${contentType}` : `${siteUrl}/${locale}/${contentType}`

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `Directive 8020 ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`,
		url: listUrl,
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url:
				locale === 'en'
					? `${siteUrl}/${contentType}/${item.slug}`
					: `${siteUrl}/${locale}/${contentType}/${item.slug}`,
			name: normalizeDirectiveText(item.frontmatter.title),
		})),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
