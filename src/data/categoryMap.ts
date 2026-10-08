export interface TermItem {
  slug: string;
  title: string;
  devanagari?: string;
  iast?: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  termSlugs: string[];
}

export interface PartCategory {
  id: string;
  number: number;
  title: string;
  description?: string;
  subcategories: SubCategory[];
}

/*
 * Load the knowledge-base Markdown as raw text.
 *
 * This makes indianphilosophykb.md the source of truth for the
 * Part/category/term hierarchy.
 */
const kbSource = import.meta.glob(
  '../content/kb/indianphilosophykb.md',
  {
    eager: true,
    query: '?raw',
    import: 'default',
  }
);

const kbMarkdown = Object.values(kbSource)[0];

if (typeof kbMarkdown !== 'string') {
  throw new Error(
    'Unable to load src/content/kb/indianphilosophykb.md'
  );
}

/*
 * Preserve the IDs already used by the current site.
 *
 * New Parts/categories will receive automatically generated IDs.
 */
const LEGACY_PART_IDS = new Map<number, string>([
  [1, 'part-1-epistemology'],
  [2, 'part-2-ontology'],
  [3, 'part-3-cosmology'],
  [4, 'part-4-psychology'],
  [5, 'part-5-embodiment'],
  [6, 'part-6-practical-discipline'],
  [7, 'part-7-traditions-and-texts'],
]);

const LEGACY_SUBCATEGORY_IDS = new Map<string, string>([
  [
    'Sṛṣṭi (Creation and cosmic emanation)',
    'srshti',
  ],
  [
    'Buddhist and Jain concepts',
    'buddhist-and-jain',
  ],
]);

/**
 * Extract an optional explicit ID from a heading.
 *
 * Example:
 *
 *   ### Jñāna (Knowledge) {#jnana}
 *
 * becomes:
 *
 *   title = "Jñāna (Knowledge)"
 *   id    = "jnana"
 *
 * This is useful when you want to rename a heading later without
 * changing the URL/hash ID used by breadcrumbs or navigation.
 */
function extractExplicitId(value: string): {
  title: string;
  id?: string;
} {
  const match = value.match(
    /\s+\{#([A-Za-z0-9][A-Za-z0-9_-]*)\}\s*$/
  );

  if (!match) {
    return {
      title: value.trim(),
    };
  }

  return {
    title: value.slice(0, match.index).trim(),
    id: match[1],
  };
}

/**
 * Convert a heading into a URL/hash-friendly ID.
 *
 * Examples:
 *
 *   Jñāna (Knowledge)
 *     → jnana
 *
 *   Śakti, Kāla, and Māyā
 *     → sakti-kala-and-maya
 *
 *   Part 8: Consciousness and cognition
 *     → consciousness-and-cognition
 */
function slugify(value: string): string {
  return value
    .replace(/\([^)]*\)/g, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique ID if two future headings happen to produce
 * the same slug.
 */
function makeUniqueId(
  baseId: string,
  usedIds: Set<string>
): string {
  if (!usedIds.has(baseId)) {
    usedIds.add(baseId);
    return baseId;
  }

  let counter = 2;
  let candidate = `${baseId}-${counter}`;

  while (usedIds.has(candidate)) {
    counter += 1;
    candidate = `${baseId}-${counter}`;
  }

  usedIds.add(candidate);

  return candidate;
}

function getPartId(
  number: number,
  title: string,
  explicitId: string | undefined,
  usedIds: Set<string>
): string {
  if (explicitId) {
    return makeUniqueId(explicitId, usedIds);
  }

  const legacyId = LEGACY_PART_IDS.get(number);

  if (legacyId) {
    usedIds.add(legacyId);
    return legacyId;
  }

  const cleanTitle = title.replace(
    /^Part\s+\d+\s*:\s*/i,
    ''
  );

  return makeUniqueId(
    `part-${number}-${slugify(cleanTitle)}`,
    usedIds
  );
}

function getSubcategoryId(
  title: string,
  explicitId: string | undefined,
  usedIds: Set<string>
): string {
  if (explicitId) {
    return makeUniqueId(explicitId, usedIds);
  }

  const legacyId = LEGACY_SUBCATEGORY_IDS.get(title);

  if (legacyId) {
    usedIds.add(legacyId);
    return legacyId;
  }

  return makeUniqueId(
    slugify(title),
    usedIds
  );
}

function isStandaloneItalic(line: string): boolean {
  const trimmed = line.trim();

  const asteriskItalic = /^\*[^*].*\*$/;
  const asteriskBold = /^\*\*.*\*\*$/;
  const underscoreItalic = /^_[^_].*_$/;
  const underscoreBold = /^__.*__$/;

  return (
    (asteriskItalic.test(trimmed) &&
      !asteriskBold.test(trimmed)) ||
    (underscoreItalic.test(trimmed) &&
      !underscoreBold.test(trimmed))
  );
}

function extractItalicText(line: string): string {
  const trimmed = line.trim();

  if (
    trimmed.startsWith('*') &&
    trimmed.endsWith('*')
  ) {
    return trimmed.slice(1, -1).trim();
  }

  if (
    trimmed.startsWith('_') &&
    trimmed.endsWith('_')
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function isStandaloneBold(line: string): boolean {
  const trimmed = line.trim();

  return (
    /^\*\*.+\*\*$/.test(trimmed) ||
    /^__.+__$/.test(trimmed)
  );
}

function isHtmlComment(line: string): boolean {
  return /^<!--.*-->$/.test(line.trim());
}

/**
 * Extract local Markdown links pointing to .md files.
 *
 * A link counts as a term regardless of whether it appears as:
 *
 *   1. [Term](term.md)
 *   - [Term](term.md)
 *   See: [Term](term.md)
 *   [Term](term.md)
 *
 * The important rule is that it must be a local .md link inside
 * the current ### category.
 *
 * Duplicates within the same category are removed while preserving
 * the first occurrence.
 */
function extractTermSlugs(
  line: string
): string[] {
  const slugs: string[] = [];

  const linkPattern =
    /(!?)\[([^\]]+)\]\(([^)]+)\)/g;

  for (const match of line.matchAll(linkPattern)) {
    const isImage = match[1] === '!';

    if (isImage) {
      continue;
    }

    const destination = match[3].trim();

    if (
      destination.startsWith('http://') ||
      destination.startsWith('https://') ||
      destination.startsWith('mailto:') ||
      destination.startsWith('//')
    ) {
      continue;
    }

    /*
     * Remove optional link title, fragment, and query string.
     */
    const target = destination
      .split(/\s+/)[0]
      .split('#')[0]
      .split('?')[0];

    if (!/\.md$/i.test(target)) {
      continue;
    }

    const filename = target.split('/').pop();

    if (!filename) {
      continue;
    }

    const slug = filename.replace(
      /\.md$/i,
      ''
    );

    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  }

  return slugs;
}

function parseKnowledgeBase(
  markdown: string
): PartCategory[] {
  const lines = markdown
    .replace(/\r\n/g, '\n')
    .split('\n');

  const parts: PartCategory[] = [];

  let currentPart: PartCategory | null = null;
  let currentSubcategory: SubCategory | null = null;

  /*
   * These states solve the description problems:
   *
   * Part descriptions are only considered immediately after a
   * Part heading.
   *
   * Subcategory descriptions are only considered immediately after
   * a ### heading, allowing blank lines and standalone bold labels.
   */
  let partDescriptionPending = false;
  let subcategoryDescriptionPending = false;

  const usedPartIds = new Set<string>();
  const usedSubcategoryIds = new Set<string>();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const isBlank = line.length === 0;

    /*
     * -------------------------------------------------------------
     * PART HEADING
     * -------------------------------------------------------------
     */
    const partMatch = line.match(
      /^##\s+(Part\s+(\d+)\s*:\s*.+?)\s*$/
    );

    if (partMatch) {
      const rawTitle = partMatch[1].trim();
      const number = Number(partMatch[2]);

      const { title, id: explicitId } =
        extractExplicitId(rawTitle);

      currentPart = {
        id: getPartId(
          number,
          title,
          explicitId,
          usedPartIds
        ),
        number,
        title,
        subcategories: [],
      };

      parts.push(currentPart);

      currentSubcategory = null;

      partDescriptionPending = true;
      subcategoryDescriptionPending = false;

      continue;
    }

    /*
     * Any other ## heading ends the current hierarchy.
     *
     * This allows headings such as ## Overview to exist without
     * accidentally being treated as Parts.
     */
    if (/^##\s+/.test(line)) {
      currentPart = null;
      currentSubcategory = null;

      partDescriptionPending = false;
      subcategoryDescriptionPending = false;

      continue;
    }

    /*
     * -------------------------------------------------------------
     * PART DESCRIPTION
     * -------------------------------------------------------------
     *
     * We look only immediately after the Part heading.
     *
     * Blank lines are allowed.
     *
     * Once the first meaningful non-italic line is encountered,
     * description detection ends permanently for that Part.
     */
    if (
      currentPart &&
      !currentSubcategory &&
      partDescriptionPending
    ) {
      if (isBlank || isHtmlComment(line)) {
        continue;
      }

      if (isStandaloneItalic(line)) {
        currentPart.description =
          extractItalicText(line);

        partDescriptionPending = false;

        continue;
      }

      partDescriptionPending = false;
    }

    /*
     * -------------------------------------------------------------
     * SUBCATEGORY HEADING
     * -------------------------------------------------------------
     */
    const subcategoryMatch = line.match(
      /^###\s+(.+?)\s*$/
    );

    if (
      subcategoryMatch &&
      currentPart
    ) {
      const rawTitle =
        subcategoryMatch[1].trim();

      const { title, id: explicitId } =
        extractExplicitId(rawTitle);

      currentSubcategory = {
        id: getSubcategoryId(
          title,
          explicitId,
          usedSubcategoryIds
        ),
        title,
        termSlugs: [],
      };

      currentPart.subcategories.push(
        currentSubcategory
      );

      subcategoryDescriptionPending = true;

      continue;
    }

    if (!currentPart) {
      continue;
    }

    if (!currentSubcategory) {
      continue;
    }

    /*
     * -------------------------------------------------------------
     * SUBCATEGORY DESCRIPTION
     * -------------------------------------------------------------
     *
     * This is deliberately limited to the beginning of a category.
     *
     * Blank lines are allowed.
     *
     * Standalone bold lines are also allowed because some categories
     * currently have an internal bold subsection heading before their
     * first italic description.
     *
     * Once a real content line is encountered, description detection
     * ends permanently. Therefore a later italic note cannot
     * accidentally become the category description.
     */
    if (subcategoryDescriptionPending) {
      if (isBlank || isHtmlComment(line)) {
        continue;
      }

      if (isStandaloneItalic(line)) {
        currentSubcategory.description =
          extractItalicText(line);

        subcategoryDescriptionPending = false;

        continue;
      }

      if (isStandaloneBold(line)) {
        continue;
      }

      subcategoryDescriptionPending = false;
    }

    /*
     * -------------------------------------------------------------
     * TERM LINKS
     * -------------------------------------------------------------
     *
     * Every local .md link inside the current category contributes
     * to that category's term list.
     *
     * This is intentionally independent of Markdown list formatting.
     */
    const termSlugs = extractTermSlugs(line);

    for (const slug of termSlugs) {
      if (
        !currentSubcategory.termSlugs.includes(slug)
      ) {
        currentSubcategory.termSlugs.push(slug);
      }
    }
  }

  return parts;
}

export const CATEGORY_MAP: PartCategory[] =
  parseKnowledgeBase(kbMarkdown);

/**
 * Find the first Part/category containing a term.
 *
 * If a term is listed in multiple categories, the first occurrence
 * in the Markdown hierarchy is used for breadcrumbs and category
 * context.
 */
export function getCategoryForTerm(
  slug: string
): {
  part: PartCategory;
  subcategory: SubCategory;
} | undefined {
  for (const part of CATEGORY_MAP) {
    for (const subcategory of part.subcategories) {
      if (
        subcategory.termSlugs.includes(slug)
      ) {
        return {
          part,
          subcategory,
        };
      }
    }
  }

  return undefined;
}

/**
 * Return terms in navigation order.
 *
 * A term can belong to multiple categories, but Prev/Next navigation
 * should contain each term only once.
 */
export function getAllOrderedSlugs(): string[] {
  const slugs: string[] = [];
  const seen = new Set<string>();

  for (const part of CATEGORY_MAP) {
    for (const subcategory of part.subcategories) {
      for (const slug of subcategory.termSlugs) {
        if (seen.has(slug)) {
          continue;
        }

        seen.add(slug);
        slugs.push(slug);
      }
    }
  }

  return slugs;
}