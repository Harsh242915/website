import { useState } from 'react';
import { Calendar, GitBranch, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { sfx } from '../lib/audio';

const PHASES = [
  {
    phase: 'PHASE 01',
    title: 'Product Scope & Design',
    timeframe: 'Weeks 1–2',
    summary: 'We clarify your product requirements, plan the database and user workflows, design clean screens, and set up your project foundation so there are no surprises later.',
    deliverables: [
      'Complete product feature plan & timeline',
      'Database structure & user account setup',
      'Screen designs and user interface wireframes',
      'Staging environment setup for previewing progress',
    ],
    artifacts: ['Project Scope Doc', 'Database Blueprint', 'Design System'],
    accent: 'border-[#d8ff38] text-[#d8ff38]',
    bgBadge: 'bg-[#d8ff38]/10 text-[#d8ff38]',
  },
  {
    phase: 'PHASE 02',
    title: 'Core Development & Features',
    timeframe: 'Weeks 3–5',
    summary: 'We build your application from the ground up — developing user accounts, interactive dashboards, real-time features, and responsive layouts that look great on both phone and desktop.',
    deliverables: [
      'Interactive frontend with modern navigation',
      'Secure backend API & database connection',
      'Payment processing & checkout integration (Stripe)',
      'Mobile-friendly responsive design testing',
    ],
    artifacts: ['Web App Core', 'API Services', 'Database Queries'],
    accent: 'border-[#ff6b35] text-[#ff6b35]',
    bgBadge: 'bg-[#ff6b35]/10 text-[#ff6b35]',
  },
  {
    phase: 'PHASE 03',
    title: 'Testing, Launch & Handoff',
    timeframe: 'Weeks 6+',
    summary: 'We thoroughly test every button, flow, and payment before going live. Once approved, we connect your custom domain, transfer 100% of the code to you, and provide 30 days of warranty support.',
    deliverables: [
      'Comprehensive testing across browsers and phones',
      'Payment verification and live transactions test',
      'Live domain setup and production deployment',
      'Complete code handoff & 30-day bug fix support',
    ],
    artifacts: ['Test Reports', 'Live Production Setup', '100% Code Handoff'],
    accent: 'border-[#38bdf8] text-[#38bdf8]',
    bgBadge: 'bg-[#38bdf8]/10 text-[#38bdf8]',
  },
];

export function LaunchProtocol() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <section id="sprint-protocol" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ HOW WE WORK ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>STEP-BY-STEP PROCESS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          OUR DEVELOPMENT PROCESS.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          A clear, structured path from concept to a live working product. No guesswork, no hidden delays, and weekly progress updates.
        </p>
      </div>

      {/* Phase Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {PHASES.map((item, index) => {
          const isSelected = selectedPhase === index;
          return (
            <div
              key={item.phase}
              onClick={() => {
                sfx.click();
                setSelectedPhase(index);
              }}
              className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-6 ${
                isSelected
                  ? 'bg-[#1a1423] border-[#d8ff38] shadow-[0_0_25px_rgba(216,255,56,0.1)]'
                  : 'bg-[#130e1b] border-[#2f273c] hover:border-[#473b5b]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className={`px-2.5 py-0.5 rounded font-bold ${item.bgBadge}`}>{item.phase}</span>
                  <span className="text-[#9c93a8]">{item.timeframe}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9c93a8] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#2f273c] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#9c93a8]">{item.deliverables.length} Key Deliverables</span>
                <span className={`flex items-center gap-1 font-semibold ${isSelected ? 'text-[#d8ff38]' : 'text-[#9c93a8]'}`}>
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Phase Deep-Dive */}
      <div className="mt-8 bg-[#1a1423] border border-[#2f273c] rounded-xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2f273c]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0a070e] text-[#d8ff38] border border-[#2f273c]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#d8ff38] font-bold">
                PHASE DETAILS // {PHASES[selectedPhase].phase}
              </span>
              <h4 className="font-display font-bold text-xl text-white">
                {PHASES[selectedPhase].title} ({PHASES[selectedPhase].timeframe})
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#9c93a8]">
            <GitBranch className="w-4 h-4 text-[#d8ff38]" />
            <span>PROGRESS: <strong className="text-white">WEEKLY WORKING DEMOS</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Deliverables checklist */}
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono text-xs text-[#9c93a8] uppercase">WHAT WE DELIVER IN THIS PHASE</span>
            <div className="space-y-2.5">
              {PHASES[selectedPhase].deliverables.map((d, i) => (
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
              <span className="text-[#9c93a8] uppercase text-[11px]">DELIVERABLE ASSETS</span>
              <div className="space-y-2">
                {PHASES[selectedPhase].artifacts.map((art, i) => (
                  <div key={i} className="flex items-center justify-between text-[#eadff1] bg-[#130e1b] px-3 py-2 rounded border border-[#2f273c]">
                    <span>{art}</span>
                    <span className="text-[10px] text-[#38bdf8]">INCLUDED</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#2f273c] flex items-center justify-between text-[11px] text-[#9c93a8]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d8ff38]" />
                <span>100% Code Ownership</span>
              </span>
              <a
                href="#discovery"
                onClick={() => sfx.click()}
                className="text-[#d8ff38] hover:underline font-bold"
              >
                Plan Your Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
