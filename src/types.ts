export interface Decision {
  number: number;
  title: string;
  date: string;
  year: number | null;
  digest: string;
  summary: string;
  keyHolding: string;
  tags: string[];
  paragraphs: string[];
  crossRefs: number[];
  parties: string;
  outcome: string;
  url: string;
  pdfUrl: string | null;
  fetchedAt: string;
}

export type DecisionMap = Record<string, Decision>;
