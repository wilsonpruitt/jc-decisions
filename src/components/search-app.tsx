"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import type { Decision, DecisionMap } from "@/types";
import type { SearchFilters } from "@/lib/search";
import { searchDecisions, DEFAULT_FILTERS } from "@/lib/search";
import { DecisionCard } from "@/components/decision-card";
import { DecisionDetail } from "@/components/decision-detail";
import { FilterSidebar } from "@/components/filter-sidebar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Scale, SlidersHorizontal, Search, ChevronDown } from "lucide-react";

const PAGE_SIZE = 25;

interface SearchAppProps {
  decisions: DecisionMap;
}

export function SearchApp({ decisions }: SearchAppProps) {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const allDecisions = useMemo(
    () => Object.values(decisions) as Decision[],
    [decisions]
  );

  const results = useMemo(
    () => searchDecisions(allDecisions, filters),
    [allDecisions, filters]
  );

  const visibleResults = useMemo(
    () => results.slice(0, visibleCount),
    [results, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const handleQueryChange = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        query: value,
        sortBy: value.trim() ? "relevance" : "number-desc",
      }));
    }, 200);
  }, []);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (!newFilters.query && searchRef.current) {
      searchRef.current.value = "";
    }
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setFilters((prev) => {
      if (prev.tags.includes(tag)) return prev;
      return { ...prev, tags: [...prev.tags, tag] };
    });
  }, []);

  const handleDecisionClick = useCallback(
    (number: number) => {
      const d = decisions[String(number)];
      if (d) {
        setSelectedDecision(d as Decision);
        setDetailOpen(true);
      }
    },
    [decisions]
  );

  const activeFilterCount = filters.tags.length +
    (filters.yearStart !== null ? 1 : 0) +
    (filters.yearEnd !== null ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-navy text-cream shrink-0">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Scale className="h-5 w-5 text-gold" />
            <span className="font-display text-base font-semibold tracking-tight">
              JC Decisions
            </span>
          </Link>
          <p className="text-cream/40 text-sm hidden sm:block">
            {allDecisions.length.toLocaleString()} decisions &middot; 1940&ndash;present
          </p>
        </div>
      </header>

      {/* Search bar */}
      <div className="bg-white border-b border-border shrink-0 shadow-sm">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex gap-3 items-center max-w-4xl">
            {/* Mobile filter toggle */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="lg:hidden shrink-0 inline-flex items-center justify-center gap-1.5 rounded border border-border h-11 px-3 hover:bg-muted cursor-pointer text-sm font-medium">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="bg-gold text-navy text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto bg-cream">
                <SheetHeader>
                  <SheetTitle className="font-display text-navy">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={(f) => {
                      handleFiltersChange(f);
                      setSheetOpen(false);
                    }}
                    resultCount={results.length}
                    totalCount={allDecisions.length}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
              <Input
                ref={searchRef}
                placeholder="Search decisions, topics, ¶ paragraphs, parties..."
                className="pl-11 h-11 bg-cream/50 border-border text-base placeholder:text-muted-foreground/60 focus:bg-white"
                onChange={(e) => handleQueryChange(e.target.value)}
              />
            </div>

            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: value as SearchFilters["sortBy"],
                }))
              }
            >
              <SelectTrigger className="w-44 shrink-0 hidden sm:flex h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number-desc">Newest first</SelectItem>
                <SelectItem value="number-asc">Oldest first</SelectItem>
                <SelectItem value="year-desc">Year (newest)</SelectItem>
                <SelectItem value="year-asc">Year (oldest)</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 xl:w-80 border-r bg-cream/50 overflow-y-auto shrink-0">
          <div className="p-5">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={results.length}
              totalCount={allDecisions.length}
            />
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="px-4 lg:px-8 py-5 max-w-4xl">
            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {results.length.toLocaleString()}
                </span>{" "}
                {results.length === 1 ? "decision" : "decisions"}
                {filters.tags.length > 0 || filters.query ? " found" : ""}
              </p>
            </div>

            {/* Decision cards */}
            <div className="space-y-3">
              {visibleResults.map((d, i) => (
                <div
                  key={d.number}
                  className="animate-fade-slide-up"
                  style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
                >
                  <DecisionCard
                    decision={d}
                    onTagClick={handleTagClick}
                    onDecisionClick={handleDecisionClick}
                  />
                </div>
              ))}
            </div>

            {visibleCount < results.length && (
              <div className="text-center py-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-cream px-6 py-3 rounded font-medium text-sm transition-colors cursor-pointer"
                >
                  <ChevronDown className="h-4 w-4" />
                  Load more ({(results.length - visibleCount).toLocaleString()} remaining)
                </button>
              </div>
            )}

            {results.length === 0 && (
              <div className="text-center py-20">
                <Scale className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-display text-xl text-navy mb-2">
                  No decisions found
                </p>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <DecisionDetail
        decision={selectedDecision}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onTagClick={handleTagClick}
        onDecisionClick={handleDecisionClick}
      />
    </div>
  );
}
