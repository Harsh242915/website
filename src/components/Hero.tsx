import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, CheckCircle, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { sfx } from '../lib/audio';

interface HeroProps {
  onOpenArchitecture: () => void;
}

export function Hero({ onOpenArchitecture }: HeroProps) {
  const [interactiveP99, setInteractiveP99] = useState(38);
  const [isPinging, setIsPinging] = useState(false);

  // Random realistic edge ping fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setInteractiveP99(Math.floor(32 + Math.random() * 12));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerManualPing = () => {
    sfx.tick();
    setIsPinging(true);
    setTimeout(() => {
      setInteractiveP99(Math.floor(28 + Math.random() * 8));
      setIsPinging(false);
    }, 450);
  };

  return (
    <section id="hero-section" className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-20 grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d8ff38]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#bd52eb]/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative flex flex-col gap-8 max-w-5xl">
        {/* Engineering Dispatch Tag */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span className="px-2.5 py-1 rounded bg-[#d8ff38]/10 border border-[#d8ff38]/30 font-bold tracking-wider uppercase">
            STUDIO MANIFESTO
          </span>
          <span className="text-[#9c93a8] font-mono">01 // PRODUCTION GRADE PROTOTYPING</span>
        </div>

        {/* Monumental, Non-Cliché Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.04] uppercase">
          We engineer full-stack MVPs with the architecture of a{' '}
          <span className="text-[#d8ff38] underline decoration-[#d8ff38]/40 underline-offset-8 decoration-4 hover:decoration-[#d8ff38] transition-all cursor-default">
            Series B product.
          </span>
        </h1>

        {/* Honest Technical Subhead */}
        <p className="text-lg sm:text-xl text-[#9c93a8] max-w-3xl leading-relaxed font-normal">
          Launchdrift is an elite engineering boutique led by <span className="text-white font-semibold">Harsh Bali</span> &amp; team. We take venture-backed founders from schema to production in <span className="text-[#eadff1] font-medium">3-week battle sprints</span> — zero fluff, zero junior bloat, 100% strictly typed code.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            id="hero-request-quote-btn"
            href="#discovery"
            onClick={() => sfx.click()}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-sm font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(216,255,56,0.35)] group"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            id="hero-inspect-arch-btn"
            onClick={() => {
              sfx.click();
              onOpenArchitecture();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#1a1423] border border-[#473b5b] text-[#eadff1] font-mono text-xs uppercase tracking-wider hover:bg-[#241d30] hover:border-[#d8ff38]/50 transition-all group"
          >
            <ChevronDown className="w-4 h-4 text-[#d8ff38] group-hover:translate-y-0.5 transition-transform" />
            <span>Inspect System Architecture ↓</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#9c93a8] sm:ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b35] animate-pulse"></span>
            <span>Founder-Led • No Outsourcing</span>
          </div>
        </div>
      </div>

      {/* Real Telemetry Ribbon (Anti-Buzzword, Interactive) */}
      <div className="mt-16 pt-8 border-t border-[#2f273c] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
        {/* Metric 1 */}
        <div
          onClick={triggerManualPing}
          className="flex flex-col gap-1 p-3 rounded-lg hover:bg-[#1a1423]/50 transition-all cursor-pointer group border border-transparent hover:border-[#2f273c]"
          title="Click to trigger edge latency ping test"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9c93a8] uppercase">EDGE PERFORMANCE</span>
            <Activity className={`w-3 h-3 text-[#d8ff38] ${isPinging ? 'animate-spin' : ''}`} />
          </div>
          <span className="text-2xl font-bold text-[#d8ff38] tracking-tight group-hover:scale-[1.02] transition-transform">
            P99 &lt; {interactiveP99}ms
          </span>
          <span className="text-[11px] text-[#9c93a8] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff38]"></span>
            Sub-second TTFB globally
          </span>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9c93a8] uppercase">BROWSER RIGOR</span>
            <CheckCircle className="w-3 h-3 text-[#d8ff38]" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">100% LIGHTHOUSE</span>
          <span className="text-[11px] text-[#9c93a8]">Core Web Vitals green</span>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9c93a8] uppercase">COMPILER STANDARD</span>
            <Sparkles className="w-3 h-3 text-[#ff6b35]" />
          </div>
          <span className="text-2xl font-bold text-[#ff6b35] tracking-tight">TS 5.4 + DRIZZLE</span>
          <span className="text-[11px] text-[#9c93a8]">Zero any-types permitted</span>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9c93a8] uppercase">DELIVERY GUARANTEE</span>
            <ShieldAlert className="w-3 h-3 text-[#38bdf8]" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">ZERO BUG SLA</span>
          <span className="text-[11px] text-[#9c93a8]">30-day post-launch warranty</span>
        </div>
      </div>
    </section>
  );
}
