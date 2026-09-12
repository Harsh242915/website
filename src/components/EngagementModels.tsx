import { useState } from 'react';
import { Check, Zap, Sparkles, Terminal, ArrowRight, SlidersHorizontal, Calculator } from 'lucide-react';
import { sfx } from '../lib/audio';

interface EngagementModelsProps {
  onSelectTier: (tierName: string, specs?: string) => void;
}

export function EngagementModels({ onSelectTier }: EngagementModelsProps) {
  // Interactive Calculator State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'PostgreSQL / Supabase Schema',
    'Next.js 14 App Router',
    'Stripe Checkout & Webhooks',
  ]);

  const FEATURE_CATALOG = [
    { name: 'PostgreSQL / Supabase Schema', days: 3, complexity: 12 },
    { name: 'Next.js 14 App Router', days: 5, complexity: 18 },
    { name: 'Stripe Checkout & Webhooks', days: 3, complexity: 15 },
    { name: 'WebGL 2.0 / 3D Canvas Shaders', days: 4, complexity: 25 },
    { name: 'Real-time WebSockets / PubSub', days: 3, complexity: 20 },
    { name: 'AI / Gemini Agent & Interactions', days: 3, complexity: 22 },
    { name: 'Playwright E2E Automation', days: 2, complexity: 10 },
  ];

  const toggleFeature = (name: string) => {
    sfx.click();
    if (selectedFeatures.includes(name)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== name));
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  const calculatedDays = selectedFeatures.reduce((acc, fName) => {
    const item = FEATURE_CATALOG.find(f => f.name === fName);
    return acc + (item ? item.days : 0);
  }, 3); // base 3 days

  const calculatedWeeks = (calculatedDays / 5).toFixed(1);
  const calculatedComplexity = selectedFeatures.reduce((acc, fName) => {
    const item = FEATURE_CATALOG.find(f => f.name === fName);
    return acc + (item ? item.complexity : 0);
  }, 10);

  const handleExportSpec = () => {
    sfx.click();
    const specSummary = `Custom sprint calculated: ~${calculatedWeeks} weeks. Selected stack: ${selectedFeatures.join(', ')}. Complexity index: ${calculatedComplexity} pts.`;
    onSelectTier('Calculated Custom Sprint', specSummary);
    const element = document.getElementById('discovery');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="engagement-models" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Section Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ ENGAGEMENT TIERS ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>SELECT SPRINT CAPACITY</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          STRUCTURED SPRINT TIERS.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          Transparent sprint models built for fast-moving startups. No hourly ambiguity. Scope-locked deliverables with 100% intellectual property transfer.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* TIER 1: Sprint MVP Build */}
        <div className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] transition-all rounded-xl p-8 flex flex-col justify-between gap-8 group">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#9c93a8]">TIER 01</span>
              <span className="px-2.5 py-0.5 rounded bg-[#0a070e] text-[#eadff1] border border-[#2f273c]">
                3 WEEKS
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                Sprint MVP Build
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For pre-seed / seed founders who need a production-ready MVP shipped without junior errors.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              {[
                'Full-stack production MVP engineered from scratch',
                'Normalized PostgreSQL or Supabase schema',
                'Next.js 14 App Router with responsive frontend',
                'Stripe payments, auth, and webhook pipelines',
                'Playwright E2E testing & Lighthouse 100 audit',
                '30-day post-launch bug warranty',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#eadff1]">
                  <Check className="w-4 h-4 text-[#d8ff38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#discovery"
            onClick={() => {
              sfx.click();
              onSelectTier('Sprint MVP Build (3 Weeks)');
            }}
            className="w-full py-3 rounded-lg bg-[#241d30] border border-[#473b5b] text-[#eadff1] font-mono text-xs font-bold uppercase text-center hover:bg-[#30273f] hover:text-[#d8ff38] hover:border-[#d8ff38]/40 transition-all"
          >
            Lock In Sprint 01
          </a>
        </div>

        {/* TIER 2: High-Scale Performance Pod (Flagship Highlight) */}
        <div className="bg-[#1a1423] border-2 border-[#d8ff38] rounded-xl p-8 flex flex-col justify-between gap-8 relative shadow-[0_0_40px_rgba(216,255,56,0.12)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d8ff38] text-[#0a070e] font-mono text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>MOST POPULAR // FLAGSHIP POD</span>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#d8ff38] font-bold">TIER 02</span>
              <span className="px-2.5 py-0.5 rounded bg-[#d8ff38]/10 text-[#d8ff38] font-bold border border-[#d8ff38]/30">
                3–5 WEEKS
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                High-Scale Performance Pod
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For ambitious products requiring WebGL graphics, low-latency queues, or high-concurrency data models.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              <div className="text-[11px] font-mono text-[#d8ff38] font-semibold">Everything in Sprint MVP, plus:</div>
              {[
                'Custom WebGL 2.0 / Canvas shaders or 3D interactions',
                'Real-time WebSocket clustering & in-memory Redis queues',
                'High-concurrency query optimization & GIN indexing',
                'Procedural WebAudio API sound synthesis',
                'Priority architecture reviews directly with Harsh Bali',
                '60-day post-launch bug warranty',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#eadff1]">
                  <Check className="w-4 h-4 text-[#d8ff38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#discovery"
            onClick={() => {
              sfx.click();
              onSelectTier('High-Scale Performance Pod (3–5 Weeks)');
            }}
            className="w-full py-3.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-black uppercase text-center hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(216,255,56,0.3)] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Select Performance Pod</span>
          </a>
        </div>

        {/* TIER 3: Advisory & Fractional CTO */}
        <div className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] transition-all rounded-xl p-8 flex flex-col justify-between gap-8 group">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#9c93a8]">TIER 03</span>
              <span className="px-2.5 py-0.5 rounded bg-[#0a070e] text-[#eadff1] border border-[#2f273c]">
                MONTHLY RETAINER
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                Advisory &amp; Fractional CTO
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For post-funding teams scaling their engineering org who need principal-level architectural oversight.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              {[
                'High-level systems architecture design & PR reviews',
                'Database schema audits & query performance tuning',
                'Technical hiring interviews for your founding team',
                'Bi-weekly architecture strategy sessions with Harsh',
                'Async code review via dedicated Slack / Discord',
                'Direct founder-level advisory (max 2 teams/quarter)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#eadff1]">
                  <Check className="w-4 h-4 text-[#d8ff38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#discovery"
            onClick={() => {
              sfx.click();
              onSelectTier('Advisory & Fractional CTO Pod');
            }}
            className="w-full py-3 rounded-lg bg-[#241d30] border border-[#473b5b] text-[#eadff1] font-mono text-xs font-bold uppercase text-center hover:bg-[#30273f] hover:text-[#d8ff38] hover:border-[#d8ff38]/40 transition-all"
          >
            Book Strategy Pod
          </a>
        </div>
      </div>

      {/* Interactive Scope Calculator */}
      <div className="mt-12 bg-[#130e1b] border border-[#2f273c] rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2f273c]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d8ff38]/10 text-[#d8ff38] border border-[#d8ff38]/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#d8ff38] font-bold">
                [ INTERACTIVE PLANNING TOOL ]
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Bespoke Sprint Scope &amp; Velocity Estimator
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[#9c93a8]">
              Estimated Duration: <strong className="text-[#d8ff38] text-base">{calculatedWeeks} Weeks</strong>
            </span>
            <span className="text-[#9c93a8]">
              Complexity Index: <strong className="text-white text-base">{calculatedComplexity} pts</strong>
            </span>
          </div>
        </div>

        <div className="pt-6">
          <div className="text-xs font-mono text-[#9c93a8] pb-3 uppercase">
            Toggle features to calculate real-time sprint timeline:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURE_CATALOG.map((feat) => {
              const isChecked = selectedFeatures.includes(feat.name);
              return (
                <button
                  key={feat.name}
                  onClick={() => toggleFeature(feat.name)}
                  className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all font-mono text-xs ${
                    isChecked
                      ? 'bg-[#1a1423] border-[#d8ff38] text-white shadow-[0_0_15px_rgba(216,255,56,0.1)]'
                      : 'bg-[#0a070e] border-[#2f273c] text-[#9c93a8] hover:border-[#473b5b]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${isChecked ? 'bg-[#d8ff38] text-[#0a070e] font-bold' : 'border border-[#473b5b]'}`}>
                      {isChecked ? '✓' : ''}
                    </span>
                    <span className="truncate">{feat.name}</span>
                  </div>
                  <span className="text-[10px] text-[#9c93a8] shrink-0 ml-2">+{feat.days}d</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#2f273c] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#9c93a8] font-mono">
              Ready to construct this technical blueprint?
            </span>
            <button
              onClick={handleExportSpec}
              className="px-5 py-2.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(216,255,56,0.25)]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Export Spec to Discovery Intake ↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
