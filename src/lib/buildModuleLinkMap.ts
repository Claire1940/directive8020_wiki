import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content'

export interface ArticleLink {
  url: string
  title: string
}

export type ModuleLinkMap = Record<string, ArticleLink | null>

interface ArticleWithType extends ContentItem {
  contentType: string
}

// Module sub-field mapping: moduleKey -> { field, nameKey }
const MODULE_FIELDS: Record<string, { field: string; nameKey: string }> = {
  directive8020ReleaseDate: { field: 'cards', nameKey: 'label' },
  directive8020SteamPreOrder: { field: 'stores', nameKey: 'platform' },
  directive8020SystemRequirements: { field: 'requirements', nameKey: 'requirement' },
  directive8020Gameplay: { field: 'features', nameKey: 'title' },
  directive8020Story: { field: 'items', nameKey: 'question' },
  directive8020Trailer: { field: 'videos', nameKey: 'title' },
  directive8020Characters: { field: 'crew', nameKey: 'name' },
  directive8020CoOpMultiplayer: { field: 'steps', nameKey: 'title' },
  directive8020TurningPoints: { field: 'steps', nameKey: 'title' },
  directive8020Platforms: { field: 'platforms', nameKey: 'name' },
  directive8020DigitalDeluxeEdition: { field: 'benefits', nameKey: 'title' },
  directive8020BeginnerGuide: { field: 'steps', nameKey: 'title' },
  directive8020ChoicesConsequences: { field: 'items', nameKey: 'title' },
  directive8020DarkPicturesConnection: { field: 'items', nameKey: 'title' },
  directive8020AgeRating: { field: 'items', nameKey: 'category' },
  directive8020LatestNews: { field: 'items', nameKey: 'title' },
}

// Extra semantic keywords per module to boost matching for h2 titles
// These supplement the module title text when matching against articles
const MODULE_EXTRA_KEYWORDS: Record<string, string[]> = {
  directive8020ReleaseDate: ['may 12', 'launch date', 'release timing', 'cassiopeia', 'tau ceti'],
  directive8020SteamPreOrder: ['steam', 'pre order', 'price', 'digital deluxe', 'store options'],
  directive8020SystemRequirements: ['system requirements', 'windows', 'ram', 'rtx 2060', 'pc specs'],
  directive8020Gameplay: ['survival horror', 'alien threat', 'stealth', 'trust system', 'branching choices'],
  directive8020Story: ['cassiopeia', 'tau ceti f', 'mimic threat', 'earth is dying', 'crew survival'],
  directive8020Trailer: ['official trailer', 'story reveal', 'pre order trailer', 'movie night', 'playlist'],
  directive8020Characters: ['brianna young', 'lashana lynch', 'nolan stafford', 'cassiopeia crew', 'cast'],
  directive8020CoOpMultiplayer: ['movie night', 'couch co op', 'online multiplayer', 'five players', 'shared decisions'],
  directive8020TurningPoints: ['turning points', 'story tree', 'rewind choices', 'alternate routes', 'survival mode'],
  directive8020Platforms: ['pc steam', 'playstation 5', 'xbox series', 'platforms', 'physical edition'],
  directive8020DigitalDeluxeEdition: ['digital deluxe', 'outfit pack', 'collectibles', 'artbook', 'soundtrack'],
  directive8020BeginnerGuide: ['beginner guide', 'survive cassiopeia', 'stealth first', 'qte', 'trust no one'],
  directive8020ChoicesConsequences: ['choices', 'consequences', 'fatal moments', 'trust decisions', 'branching story'],
  directive8020DarkPicturesConnection: ['dark pictures', 'supermassive games', 'until dawn', 'the quarry', 'sci fi anthology'],
  directive8020AgeRating: ['age rating', 'esrb', 'pegi', 'blood and gore', 'content warnings'],
  directive8020LatestNews: ['latest news', 'official updates', 'trailers', 'release update', 'steam community'],
}

const FILLER_WORDS = ['directive', '8020', '2026', '2025', 'complete', 'the', 'and', 'for', 'how', 'with', 'our', 'this', 'your', 'all', 'from', 'learn', 'master']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSignificantTokens(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 2 && !FILLER_WORDS.includes(w))
}

function matchScore(queryText: string, article: ArticleWithType, extraKeywords?: string[]): number {
  const normalizedQuery = normalize(queryText)
  const normalizedTitle = normalize(article.frontmatter.title)
  const normalizedDesc = normalize(article.frontmatter.description || '')
  const normalizedSlug = article.slug.replace(/-/g, ' ').toLowerCase()

  let score = 0

  // Exact phrase match in title (stripped of "Directive 8020")
  const strippedQuery = normalizedQuery.replace(/directive\s*8020\s*/g, '').trim()
  const strippedTitle = normalizedTitle.replace(/directive\s*8020\s*/g, '').trim()
  if (strippedQuery.length > 3 && strippedTitle.includes(strippedQuery)) {
    score += 100
  }

  // Token overlap from query text
  const queryTokens = getSignificantTokens(queryText)
  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 20
    if (normalizedDesc.includes(token)) score += 5
    if (normalizedSlug.includes(token)) score += 15
  }

  // Extra keywords scoring (for module h2 titles)
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const normalizedKw = normalize(kw)
      if (normalizedTitle.includes(normalizedKw)) score += 15
      if (normalizedDesc.includes(normalizedKw)) score += 5
      if (normalizedSlug.includes(normalizedKw)) score += 10
    }
  }

  return score
}

function findBestMatch(
  queryText: string,
  articles: ArticleWithType[],
  extraKeywords?: string[],
  threshold = 20,
): ArticleLink | null {
  let bestScore = 0
  let bestArticle: ArticleWithType | null = null

  for (const article of articles) {
    const score = matchScore(queryText, article, extraKeywords)
    if (score > bestScore) {
      bestScore = score
      bestArticle = article
    }
  }

  if (bestScore >= threshold && bestArticle) {
    return {
      url: `/${bestArticle.contentType}/${bestArticle.slug}`,
      title: bestArticle.frontmatter.title,
    }
  }

  return null
}

export async function buildModuleLinkMap(locale: Language): Promise<ModuleLinkMap> {
  // 1. Load all articles across all content types
  const allArticles: ArticleWithType[] = []
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    for (const item of items) {
      allArticles.push({ ...item, contentType })
    }
  }

  // 2. Load module data from en.json (use English for keyword matching)
  const enMessages = (await import('../locales/en.json')).default as any

  const linkMap: ModuleLinkMap = {}

  // 3. For each module, match h2 title and sub-items
  for (const [moduleKey, fieldConfig] of Object.entries(MODULE_FIELDS)) {
    const moduleData = enMessages.modules?.[moduleKey]
    if (!moduleData) continue

    // Match module h2 title (use extra keywords + lower threshold for broader matching)
    const moduleTitle = moduleData.title as string
    if (moduleTitle) {
      const extraKw = MODULE_EXTRA_KEYWORDS[moduleKey] || []
      linkMap[moduleKey] = findBestMatch(moduleTitle, allArticles, extraKw, 15)
    }

    // Match sub-items
    const subItems = moduleData[fieldConfig.field] as any[]
    if (Array.isArray(subItems)) {
      for (let i = 0; i < subItems.length; i++) {
        const itemName = subItems[i]?.[fieldConfig.nameKey] as string
        if (itemName) {
          const key = `${moduleKey}::${fieldConfig.field}::${i}`
          linkMap[key] = findBestMatch(itemName, allArticles)
        }
      }
    }
  }

  return linkMap
}
