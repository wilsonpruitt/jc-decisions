"use client";

import type { Decision } from "@/types";
import { eraLabel } from "@/lib/utils";
import { ExternalLink, FileText } from "lucide-react";

interface DecisionCardProps {
  decision: Decision;
  onTagClick: (tag: string) => void;
  onDecisionClick: (number: number) => void;
}

const OUTCOME_STYLES: Record<string, { border: string; badge: string }> = {
  Affirmed: {
    border: "outcome-border-affirmed",
    badge: "bg-outcome-affirmed/10 text-outcome-affirmed",
  },
  Reversed: {
    border: "outcome-border-reversed",
    badge: "bg-outcome-reversed/10 text-outcome-reversed",
  },
  Constitutional: {
    border: "outcome-border-constitutional",
    badge: "bg-outcome-constitutional/10 text-outcome-constitutional",
  },
  Unconstitutional: {
    border: "outcome-border-unconstitutional",
    badge: "bg-outcome-unconstitutional/10 text-outcome-unconstitutional",
  },
  Modified: {
    border: "outcome-border-modified",
    badge: "bg-outcome-modified/10 text-outcome-modified",
  },
  Remanded: {
    border: "outcome-border-remanded",
    badge: "bg-outcome-remanded/10 text-outcome-remanded",
  },
  "No Jurisdiction": {
    border: "outcome-border-nojurisdiction",
    badge: "bg-outcome-nojurisdiction/10 text-outcome-nojurisdiction",
  },
  Moot: {
    border: "outcome-border-moot",
    badge: "bg-outcome-moot/10 text-outcome-moot",
  },
};

function getOutcomeTag(tags: string[]): string | null {
  const outcomes = ["Affirmed", "Reversed", "Constitutional", "Unconstitutional", "Modified", "Remanded", "No Jurisdiction", "Moot"];
  return tags.find((t) => outcomes.includes(t)) ?? null;
}

export function DecisionCard({ decision, onTagClick, onDecisionClick }: DecisionCardProps) {
  const d = decision;
  const outcomeTag = getOutcomeTag(d.tags);
  const outcomeStyle = outcomeTag ? OUTCOME_STYLES[outcomeTag] : null;
  const otherTags = d.tags.filter((t) => t !== outcomeTag);

  return (
    <div
      className={`bg-white rounded border border-border/80 hover:shadow-md transition-shadow ${outcomeStyle?.border ?? "border-l-3 border-l-border"}`}
    >
      {/* Header row */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <button
                onClick={() => onDecisionClick(d.number)}
                className="font-display text-lg font-bold text-navy hover:text-gold transition-colors cursor-pointer"
              >
                Decision {d.number}
              </button>
              {outcomeTag && outcomeStyle && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${outcomeStyle.badge}`}
                >
                  {outcomeTag}
                </span>
              )}
              <span className="text-xs text-muted-foreground/60 font-medium">
                {eraLabel(d.number)}
              </span>
            </div>
            <h3 className="text-sm font-medium leading-snug text-foreground/85 line-clamp-2">
              {d.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {d.pdfUrl && (
              <a
                href={d.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/50 hover:text-gold transition-colors"
                aria-label="View PDF"
              >
                <FileText className="h-4 w-4" />
              </a>
            )}
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/50 hover:text-gold transition-colors"
              aria-label="View on ResourceUMC"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {d.date}
          {d.parties && (
            <>
              {" "}&middot;{" "}
              <span className="text-foreground/60">{d.parties}</span>
            </>
          )}
        </p>
      </div>

      {/* Body */}
      <div className="px-5 pb-4 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/80">{d.summary}</p>

        {d.keyHolding && (
          <div className="rounded bg-cream border border-gold/10 px-4 py-3">
            <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-1">
              Key Holding
            </p>
            <p className="text-sm italic text-navy/80 leading-relaxed font-display">
              {d.keyHolding}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {otherTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted/70 text-muted-foreground hover:bg-gold/10 hover:text-navy transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Meta */}
        {(d.paragraphs.length > 0 || d.crossRefs.length > 0) && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground/70 pt-1 border-t border-border/50">
            {d.paragraphs.length > 0 && (
              <span className="font-mono text-[11px]">
                {d.paragraphs.join(" \u00b7 ")}
              </span>
            )}
            {d.crossRefs.length > 0 && (
              <span>
                See also:{" "}
                {d.crossRefs.map((ref, i) => (
                  <span key={ref}>
                    {i > 0 && ", "}
                    <button
                      onClick={() => onDecisionClick(ref)}
                      className="text-navy/60 hover:text-gold font-semibold cursor-pointer transition-colors"
                    >
                      #{ref}
                    </button>
                  </span>
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
