"use client";

import { useState } from "react";
import { TAG_CATEGORIES, type TagCategory } from "@/data/taxonomy";
import type { SearchFilters } from "@/lib/search";
import { Input } from "@/components/ui/input";
import { X, ChevronDown, ChevronRight } from "lucide-react";

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultCount: number;
  totalCount: number;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  resultCount,
  totalCount,
}: FilterSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const clearAll = () => {
    onFiltersChange({
      query: "",
      tags: [],
      yearStart: null,
      yearEnd: null,
      sortBy: "number-desc",
    });
  };

  const hasFilters =
    filters.tags.length > 0 ||
    filters.yearStart !== null ||
    filters.yearEnd !== null;

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      {/* Result count & clear */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-navy">
            {resultCount.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            of {totalCount.toLocaleString()} decisions
          </p>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Active filter pills */}
      {filters.tags.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em]">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {filters.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-navy text-cream text-xs font-medium hover:bg-navy/80 transition-colors cursor-pointer"
              >
                {tag}
                <X className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year range */}
      <div className="space-y-2.5 pt-2 border-t border-border/60">
        <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em]">
          Year Range
        </p>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="1940"
            min={1940}
            max={2026}
            value={filters.yearStart ?? ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                yearStart: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="h-8 text-sm bg-white"
          />
          <span className="text-muted-foreground text-xs font-medium">&ndash;</span>
          <Input
            type="number"
            placeholder="2025"
            min={1940}
            max={2026}
            value={filters.yearEnd ?? ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                yearEnd: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="h-8 text-sm bg-white"
          />
        </div>
      </div>

      {/* Tag categories */}
      {(Object.entries(TAG_CATEGORIES) as [TagCategory, readonly string[]][]).map(
        ([category, tags]) => {
          const isCollapsed = collapsed[category] ?? false;
          const activeCount = tags.filter((t) => filters.tags.includes(t)).length;

          return (
            <div key={category} className="border-t border-border/60 pt-3">
              <button
                onClick={() => toggleSection(category)}
                className="flex items-center justify-between w-full group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em]">
                    {category}
                  </p>
                  {activeCount > 0 && (
                    <span className="bg-navy text-cream text-[10px] font-bold rounded-full h-4 w-4 inline-flex items-center justify-center">
                      {activeCount}
                    </span>
                  )}
                </div>
                {isCollapsed ? (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </button>
              {!isCollapsed && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {tags.map((tag) => {
                    const isActive = filters.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-navy text-cream"
                            : "bg-white border border-border/80 text-foreground/70 hover:border-gold/50 hover:text-navy"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
