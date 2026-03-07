import type { Decision } from "@/types";

export interface SearchFilters {
  query: string;
  tags: string[];
  yearStart: number | null;
  yearEnd: number | null;
  sortBy: "number-desc" | "number-asc" | "year-desc" | "year-asc" | "relevance";
}

export const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  tags: [],
  yearStart: null,
  yearEnd: null,
  sortBy: "number-desc",
};

export function searchDecisions(
  decisions: Decision[],
  filters: SearchFilters
): Decision[] {
  const { query, tags, yearStart, yearEnd, sortBy } = filters;
  const lowerQuery = query.toLowerCase().trim();
  const queryTerms = lowerQuery.split(/\s+/).filter(Boolean);

  let results = decisions;

  // Filter by tags (AND logic — must have all selected tags)
  if (tags.length > 0) {
    results = results.filter((d) =>
      tags.every((tag) => d.tags.includes(tag))
    );
  }

  // Filter by year range
  if (yearStart !== null) {
    results = results.filter((d) => d.year !== null && d.year >= yearStart);
  }
  if (yearEnd !== null) {
    results = results.filter((d) => d.year !== null && d.year <= yearEnd);
  }

  // Filter by text query
  if (queryTerms.length > 0) {
    results = results.filter((d) => {
      const searchable = [
        d.title,
        d.summary,
        d.keyHolding,
        d.digest,
        d.parties,
        d.outcome,
        String(d.number),
        ...d.paragraphs,
        ...d.tags,
      ]
        .join(" ")
        .toLowerCase();
      return queryTerms.every((term) => searchable.includes(term));
    });
  }

  // Sort
  if (sortBy === "relevance" && queryTerms.length > 0) {
    results.sort((a, b) => {
      const scoreA = relevanceScore(a, queryTerms);
      const scoreB = relevanceScore(b, queryTerms);
      return scoreB - scoreA;
    });
  } else if (sortBy === "number-desc") {
    results.sort((a, b) => b.number - a.number);
  } else if (sortBy === "number-asc") {
    results.sort((a, b) => a.number - b.number);
  } else if (sortBy === "year-desc") {
    results.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  } else if (sortBy === "year-asc") {
    results.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
  }

  return results;
}

function relevanceScore(d: Decision, terms: string[]): number {
  let score = 0;
  const titleLower = d.title.toLowerCase();
  const summaryLower = d.summary.toLowerCase();
  const keyHoldingLower = d.keyHolding.toLowerCase();
  const numberStr = String(d.number);

  for (const term of terms) {
    if (numberStr === term) score += 100;
    if (titleLower.includes(term)) score += 10;
    if (keyHoldingLower.includes(term)) score += 8;
    if (summaryLower.includes(term)) score += 5;
  }

  return score;
}
