"use client";

import type { Decision } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eraLabel } from "@/lib/utils";
import { ExternalLink, FileText, Scale } from "lucide-react";

interface DecisionDetailProps {
  decision: Decision | null;
  open: boolean;
  onClose: () => void;
  onTagClick: (tag: string) => void;
  onDecisionClick: (number: number) => void;
}

const OUTCOME_BADGE: Record<string, string> = {
  Affirmed: "bg-outcome-affirmed/10 text-outcome-affirmed",
  Reversed: "bg-outcome-reversed/10 text-outcome-reversed",
  Constitutional: "bg-outcome-constitutional/10 text-outcome-constitutional",
  Unconstitutional: "bg-outcome-unconstitutional/10 text-outcome-unconstitutional",
  Modified: "bg-outcome-modified/10 text-outcome-modified",
  Remanded: "bg-outcome-remanded/10 text-outcome-remanded",
  "No Jurisdiction": "bg-outcome-nojurisdiction/10 text-outcome-nojurisdiction",
  Moot: "bg-outcome-moot/10 text-outcome-moot",
};

export function DecisionDetail({
  decision,
  open,
  onClose,
  onTagClick,
  onDecisionClick,
}: DecisionDetailProps) {
  if (!decision) return null;
  const d = decision;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-cream">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-3">
            <Scale className="h-6 w-6 text-gold mt-0.5 shrink-0" />
            <div>
              <DialogTitle className="font-display text-2xl text-navy">
                Decision {d.number}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {eraLabel(d.number)} &middot; {d.date}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Title */}
          <h3 className="font-display text-base font-semibold text-navy leading-snug">
            {d.title}
          </h3>

          {/* Parties */}
          {d.parties && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/70">Parties:</span>{" "}
              {d.parties}
            </p>
          )}

          {/* Links */}
          <div className="flex gap-2">
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-navy text-cream px-3 py-1.5 text-sm font-medium hover:bg-navy/90 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              ResourceUMC
            </a>
            {d.pdfUrl && (
              <a
                href={d.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                PDF
              </a>
            )}
          </div>

          <div className="gold-rule" />

          {/* Summary */}
          <div>
            <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-1.5">
              Summary
            </p>
            <p className="text-sm leading-relaxed">{d.summary}</p>
          </div>

          {/* Key Holding */}
          {d.keyHolding && (
            <div className="rounded bg-white border border-gold/15 px-4 py-3">
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-1.5">
                Key Holding
              </p>
              <p className="text-sm italic text-navy/80 leading-relaxed font-display">
                {d.keyHolding}
              </p>
            </div>
          )}

          {/* Digest */}
          {d.digest && (
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-1.5">
                Digest
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/80">
                {d.digest}
              </p>
            </div>
          )}

          {/* Outcome */}
          {d.outcome && (
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-1.5">
                Outcome
              </p>
              <p className="text-sm font-medium">{d.outcome}</p>
            </div>
          )}

          <div className="gold-rule" />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {d.tags.map((tag) => {
              const badgeStyle = OUTCOME_BADGE[tag];
              return (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick(tag);
                    onClose();
                  }}
                  className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    badgeStyle
                      ? badgeStyle
                      : "bg-muted text-muted-foreground hover:bg-gold/10 hover:text-navy"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Paragraphs */}
          {d.paragraphs.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-1.5">
                Discipline References
              </p>
              <p className="text-sm font-mono text-foreground/70">
                {d.paragraphs.join(" \u00b7 ")}
              </p>
            </div>
          )}

          {/* Cross-refs */}
          {d.crossRefs.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gold uppercase tracking-[0.15em] mb-2">
                Related Decisions
              </p>
              <div className="flex flex-wrap gap-2">
                {d.crossRefs.map((ref) => (
                  <button
                    key={ref}
                    onClick={() => onDecisionClick(ref)}
                    className="inline-flex items-center gap-1 rounded border border-navy/20 px-3 py-1.5 text-sm font-semibold text-navy hover:bg-navy hover:text-cream transition-colors cursor-pointer"
                  >
                    Decision {ref}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
