import { useState } from 'react';
import { Calendar, GitBranch, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { sfx } from '../lib/audio';

const WEEKS = [
  {
    week: 'WEEK 01',
    phase: 'BLUEPRINT & DATA SCHEMA',
    days: 'DAYS 01–07',
    summary: 'Tech specification document, normalized relational schema (PostgreSQL/Supabase), authentication architecture, interactive Figma/UI component design system, and CI/CD staging environments provisioned.',
    deliverables: [
      'Relational ERD diagrams & database migration scripts',
      'Row Level Security (RLS) policies & access token logic',
      'Cloudflare DNS & automated Staging build pipeline',
      'Design tokens and typography pairing lock-in',
    ],
    artifacts: ['01_schema.sql', '02_auth_rules.ts', '03_tokens.json'],
    accent: 'border-[#d8ff38] text-[#d8ff38]',
    bgBadge: 'bg-[#d8ff38]/10 text-[#d8ff38]',
  },
  {
    week: 'WEEK 02',
    phase: 'FRONTEND SURFACES & STATE',
    days: 'DAYS 08–14',
    summary: 'Implementation of all core views with Next.js 14 App Router, client/server state synchronisation via TanStack Query/Zustand, responsive interactive layouts, edge-optimized asset pipelines, and real-time socket connections.',
    deliverables: [
      'Next.js 14 App Router layout with Server Components',
      'Dynamic WebGL canvas or WebAudio engine integration',
      'Bi-directional WebSocket channels & state sync',
      'Mobile-first touch target audits (44px+ compliance)',
    ],
    artifacts: ['app/page.tsx', 'lib/socket.ts', 'components/canvas/'],
    accent: 'border-[#ff6b35] text-[#ff6b35]',
    bgBadge: 'bg-[#ff6b35]/10 text-[#ff6b35]',
  },
  {
    week: 'WEEK 03',
    phase: 'INTEGRATION, AUDIT & DEPLOY',
    days: 'DAYS 15–21',
    summary: 'End-to-end payment gateway (Stripe) and third-party webhook integrations, Playwright automated regression testing, full Lighthouse Core Web Vitals audit (100 score target), production DNS cutover, and complete repository transfer.',
    deliverables: [
      'Stripe Billing / Terminal webhook verification',
      'Full Playwright end-to-end regression test suite',
      'Lighthouse 100 audit pass on desktop & mobile',
      '100% IP ownership & private GitHub repo handoff',
    ],
    artifacts: ['playwright.config.ts', 'stripe.webhook.ts', 'dist/bundle'],
    accent: 'border-[#38bdf8] text-[#38bdf8]',
    bgBadge: 'bg-[#38bdf8]/10 text-[#38bdf8]',
  },
];

export function LaunchProtocol() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  return (
    <section id="sprint-protocol" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ EXECUTION LIFECYCLE ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>SPRINT METHODOLOGY</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          THE 3-WEEK LAUNCH PROTOCOL.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          We execute with ruthless velocity. Every sprint is time-boxed, scope-locked, and fully dedicated to your build.
        </p>
      </div>

      {/* Week Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {WEEKS.map((item, index) => {
          const isSelected = selectedWeek === index;
          return (
            <div
              key={item.week}
              onClick={() => {
                sfx.click();
                setSelectedWeek(index);
              }}
              className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-6 ${
                isSelected
                  ? 'bg-[#1a1423] border-[#d8ff38] shadow-[0_0_25px_rgba(216,255,56,0.1)]'
                  : 'bg-[#130e1b] border-[#2f273c] hover:border-[#473b5b]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className={`px-2.5 py-0.5 rounded font-bold ${item.bgBadge}`}>{item.week}</span>
                  <span className="text-[#9c93a8]">{item.days}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {item.phase}
                </h3>
                <p className="text-xs text-[#9c93a8] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2f273c] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#9c93a8]">{item.deliverables.length} Key Milestones</span>
                <span className={`flex items-center gap-1 font-semibold ${isSelected ? 'text-[#d8ff38]' : 'text-[#9c93a8]'}`}>
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Phase Deep-Dive Drawer */}
      <div className="mt-8 bg-[#1a1423] border border-[#2f273c] rounded-xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2f273c]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0a070e] text-[#d8ff38] border border-[#2f273c]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#d8ff38] font-bold">
                PHASE DEEP-DIVE // {WEEKS[selectedWeek].week}
              </span>
              <h4 className="font-display font-bold text-xl text-white">
                {WEEKS[selectedWeek].phase} ({WEEKS[selectedWeek].days})
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#9c93a8]">
            <GitBranch className="w-4 h-4 text-[#ff6b35]" />
            <span>COMMITS TAGGED: <strong className="text-white">SPRINT_REL_v1</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Deliverables checklist */}
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono text-xs text-[#9c93a8] uppercase">CORE DELIVERABLES &amp; GATES</span>
            <div className="space-y-2.5">
              {WEEKS[selectedWeek].deliverables.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-xs text-[#eadff1] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#d8ff38] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Artifacts */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#0a070e] p-5 rounded-lg border border-[#2f273c] font-mono text-xs">
            <div className="space-y-3">
              <span className="text-[#9c93a8] uppercase text-[11px]">GENERATED GIT ARTIFACTS</span>
              <div className="space-y-2">
                {WEEKS[selectedWeek].artifacts.map((art, i) => (
                  <div key={i} className="flex items-center justify-between text-[#eadff1] bg-[#130e1b] px-3 py-2 rounded border border-[#2f273c]">
                    <span>{art}</span>
                    <span className="text-[10px] text-[#38bdf8]">VERIFIED</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#2f273c] flex items-center justify-between text-[11px] text-[#9c93a8]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d8ff38]" />
                <span>Zero Technical Debt Certified</span>
              </span>
              <a
                href="#discovery"
                onClick={() => sfx.click()}
                className="text-[#d8ff38] hover:underline font-bold"
              >
                Reserve Week →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
