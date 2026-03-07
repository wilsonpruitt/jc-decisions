import Link from "next/link";
import { OFFICERS, MEMBERS, ALTERNATES, STATS } from "@/data/members";
import {
  Scale,
  Search,
  BookOpen,
  ArrowRight,
  Gavel,
  Users,
  Calendar,
  Hash,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-navy text-cream">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-gold" />
            <span className="font-display text-lg font-semibold tracking-tight">
              JC Decisions
            </span>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-gold/90 hover:bg-gold text-navy px-4 py-2 rounded text-sm font-semibold transition-colors"
          >
            <Search className="h-4 w-4" />
            Search Decisions
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-navy text-cream hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/50" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-3xl">
            <p className="text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              The United Methodist Church
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Judicial Council
              <br />
              <span className="text-gold-light">Decisions</span>
            </h1>
            <div className="gold-rule w-24 mb-6" />
            <p className="text-cream/80 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              The definitive searchable archive of every Judicial Council
              decision from 1940 to present &mdash; the highest court of the
              United Methodist Church.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-light text-navy px-7 py-3.5 rounded font-bold text-base transition-colors"
              >
                Search All Decisions
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border border-cream/30 hover:border-cream/60 text-cream px-7 py-3.5 rounded font-medium text-base transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy border-t border-gold/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Hash className="h-5 w-5" />}
              value={STATS.totalDecisions.toLocaleString()}
              label="Decisions Indexed"
            />
            <StatCard
              icon={<Calendar className="h-5 w-5" />}
              value={`${STATS.yearStart}–${STATS.yearEnd}`}
              label="Years Covered"
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5" />}
              value="255"
              label="Methodist Church Era"
            />
            <StatCard
              icon={<Gavel className="h-5 w-5" />}
              value="1,218"
              label="UMC Era"
            />
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="paper-texture">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">
                About
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
                The Denomination&rsquo;s
                <br />Highest Court
              </h2>
              <div className="gold-rule w-16 mb-6" />
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  The Judicial Council is the highest judicial body of The
                  United Methodist Church. Established by the Constitution of
                  the Church, it serves as the court of final appeal and has
                  the authority to determine the constitutionality of acts of
                  the General Conference, jurisdictional conferences, central
                  conferences, and annual conferences.
                </p>
                <p>
                  Since its first decision in 1940 during the Methodist Church
                  era, the Council has issued over 1,500 numbered decisions
                  spanning topics from church property and clergy rights to
                  questions of constitutional governance and judicial process.
                </p>
                <p>
                  This database provides full-text search, structured tagging by
                  topic and outcome, cross-references between related
                  decisions, and links to the original documents on ResourceUMC.
                </p>
              </div>
            </div>

            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">
                Features
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
                What You Can Do
              </h2>
              <div className="gold-rule w-16 mb-6" />
              <div className="space-y-5">
                <FeatureItem
                  title="Full-Text Search"
                  description="Search across titles, summaries, holdings, parties, and Discipline paragraph references."
                />
                <FeatureItem
                  title="Filter by Topic & Outcome"
                  description="Narrow results by church body, legal topic, decision type, and outcome using structured tags."
                />
                <FeatureItem
                  title="Cross-Reference Navigation"
                  description="Follow cross-references between related decisions to trace the evolution of church law."
                />
                <FeatureItem
                  title="AI-Generated Summaries"
                  description="Every decision includes a plain-language summary and key holding, making complex rulings accessible."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Members */}
      <section className="bg-navy text-cream">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold text-sm uppercase tracking-[0.2em] mb-3">
              2024–2028 Quadrennium
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Current Members
            </h2>
            <div className="gold-rule w-16 mx-auto mb-4" />
            <p className="text-cream/70 max-w-lg mx-auto">
              Nine members elected by the General Conference to serve as the
              denomination&rsquo;s court of last resort.
            </p>
          </div>

          {/* Officers */}
          <div className="mb-8">
            <p className="text-gold/70 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Officers
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OFFICERS.map((m) => (
                <MemberCard key={m.name} name={m.name} credentials={m.credentials} label={m.role} type={m.type} />
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="mb-8">
            <p className="text-gold/70 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Members
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MEMBERS.map((m) => (
                <MemberCard key={m.name} name={m.name} credentials={m.credentials} label={m.type === "C" ? "Clergy" : "Lay"} type={m.type} />
              ))}
            </div>
          </div>

          {/* Alternates */}
          <div>
            <p className="text-gold/70 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              Alternates
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALTERNATES.map((m) => (
                <MemberCard key={m.name} name={m.name} credentials={m.credentials} label={m.type === "C" ? "Clergy" : "Lay"} type={m.type} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="paper-texture">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
            Explore the Archive
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto mb-8">
            Search {STATS.totalDecisions.toLocaleString()} decisions spanning{" "}
            {STATS.yearEnd - STATS.yearStart + 1} years of Methodist and United
            Methodist church law.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2.5 bg-navy hover:bg-navy/90 text-cream px-8 py-4 rounded font-bold text-base transition-colors"
          >
            <Search className="h-5 w-5" />
            Search Decisions
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-cream/50 border-t border-gold/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-gold/50" />
            <span>JC Decisions Database</span>
          </div>
          <p>
            Data sourced from{" "}
            <a
              href="https://www.resourceumc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              ResourceUMC.org
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="flex items-center justify-center sm:justify-start gap-2 text-gold mb-1">
        {icon}
        <span className="font-display text-2xl font-bold text-cream">
          {value}
        </span>
      </div>
      <p className="text-cream/50 text-sm">{label}</p>
    </div>
  );
}

function MemberCard({
  name,
  credentials,
  label,
  type,
}: {
  name: string;
  credentials: string;
  label: string;
  type: "C" | "L";
}) {
  return (
    <div className="border border-cream/10 rounded bg-cream/[0.03] px-5 py-4 hover:border-gold/30 transition-colors">
      <div className="flex items-start gap-3">
        <Users className="h-4 w-4 text-gold mt-1 shrink-0" />
        <div>
          <p className="font-semibold text-cream">
            {name}
            {credentials && (
              <span className="text-cream/40 font-normal text-sm">
                , {credentials}
              </span>
            )}
          </p>
          <p className="text-sm mt-0.5">
            <span className="text-gold">{label}</span>
            <span className="text-cream/30 mx-1.5">&middot;</span>
            <span className="text-cream/50 text-xs">
              {type === "C" ? "Clergy" : "Lay"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1.5 h-2 w-2 rounded-full bg-gold shrink-0" />
      <div>
        <h3 className="font-semibold text-navy mb-1">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
