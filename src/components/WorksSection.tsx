import { useState, useEffect } from 'react';
import { ExternalLink, Play, RotateCw, CheckCircle2, Zap, ArrowRight, Layers, Sliders, TrendingUp } from 'lucide-react';
import { sfx } from '../lib/audio';

interface WorksSectionProps {
  onOpenArchitecture: () => void;
}

const REEL_SYMBOLS = ['777', 'BAR', 'NEON', 'CYBER', 'JACKPOT', 'GEM', 'BOLT'];

export function WorksSection({ onOpenArchitecture }: WorksSectionProps) {
  const [filter, setFilter] = useState<'all' | 'webgl' | 'scale' | 'fullstack'>('all');

  // --- Slot Machine State ---
  const [slotBalance, setSlotBalance] = useState(4890.00);
  const [slotStatus, setSlotStatus] = useState<'idle' | 'spinning' | 'won'>('idle');
  const [reels, setReels] = useState(['777', 'BAR', 'BAR']);
  const [slotHash, setSlotHash] = useState('0x8f2d9c1a4e5b7f309a8c1e2b4d6f8a9e');

  const spinSlot = () => {
    if (slotStatus === 'spinning') return;
    sfx.click();
    setSlotStatus('spinning');

    let counter = 0;
    const interval = setInterval(() => {
      sfx.tick();
      setReels([
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
      ]);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        // Win combination
        setReels(['777', '777', '777']);
        setSlotStatus('won');
        setSlotBalance(prev => prev + 250);
        setSlotHash('0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
        sfx.winChime();
        setTimeout(() => setSlotStatus('idle'), 4000);
      }
    }, 90);
  };

  // --- Query Benchmark State ---
  const [benchmarkMode, setBenchmarkMode] = useState<'naive' | 'optimized'>('optimized');
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkLatency, setBenchmarkLatency] = useState(78);

  const runBenchmark = () => {
    sfx.click();
    setBenchmarkRunning(true);
    setTimeout(() => {
      sfx.tick();
      setBenchmarkRunning(false);
      setBenchmarkLatency(benchmarkMode === 'naive' ? 10240 : 78);
    }, 600);
  };

  // --- HFT Simulator Live Ticks ---
  const [btcPrice, setBtcPrice] = useState(46892.45);
  const [priceChange, setPriceChange] = useState('+1.34%');
  const [matchedOrders, setMatchedOrders] = useState(14820);
  const [lastMatchLatency, setLastMatchLatency] = useState('3.8ms');

  useEffect(() => {
    const timer = setInterval(() => {
      const delta = (Math.random() - 0.49) * 14;
      setBtcPrice(prev => +(prev + delta).toFixed(2));
      setMatchedOrders(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateOrder = () => {
    sfx.click();
    setLastMatchLatency((Math.random() * 2 + 2.1).toFixed(1) + 'ms');
    setMatchedOrders(prev => prev + 1);
  };

  // --- Landscapes WA Scope Estimator Interactive State ---
  const [scopeSqFt, setScopeSqFt] = useState(3800);
  const [finishTier, setFinishTier] = useState<'Standard' | 'Architectural' | 'Ultra-Luxury'>('Architectural');

  const calculatedCost = Math.round(scopeSqFt * (finishTier === 'Standard' ? 240 : finishTier === 'Architectural' ? 380 : 560));
  const calculatedWeeks = Math.round(10 + (scopeSqFt / 500) * (finishTier === 'Standard' ? 1 : finishTier === 'Architectural' ? 1.4 : 1.9));

  return (
    <section id="works" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2f273c]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
            <span>[ SYSTEM PORTFOLIO ]</span>
            <span className="w-8 h-px bg-[#473b5b]"></span>
            <span>VERIFIED ARTIFACTS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            PRODUCTION BUILDS &amp; CLIENT CODE
          </h2>
        </div>
        <p className="text-sm font-mono text-[#9c93a8] max-w-md">
          Inspect live deployments, performance metrics, and architectural decisions made for ventures built by Harsh Bali &amp; Launchdrift.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 pt-6 overflow-x-auto pb-2 font-mono text-xs">
        {[
          { id: 'all', label: 'All Artifacts (5)' },
          { id: 'webgl', label: 'WebGL 2.0 & Canvas' },
          { id: 'scale', label: 'High-Concurrency & DB' },
          { id: 'fullstack', label: 'Full-Stack Platforms' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sfx.click();
              setFilter(cat.id as typeof filter);
            }}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
              filter === cat.id
                ? 'bg-[#d8ff38] text-[#0a070e] font-bold border-[#d8ff38]'
                : 'bg-[#1a1423] text-[#9c93a8] border-[#2f273c] hover:border-[#473b5b] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* ========================================================================= */}
        {/* PROJECT 1: Jacob's Ladder Cafe & Hospitality Engine                        */}
        {/* ========================================================================= */}
        {(filter === 'all' || filter === 'fullstack') && (
          <article className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] transition-all rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 group hover:shadow-[0_0_30px_rgba(216,255,56,0.05)]">
            <div className="flex flex-col gap-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#2f273c] bg-[#0a070e] relative">
                <img
                  alt="Jacob's Ladder Cafe & Artisanal Gastronomy interface mockup"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZBsxdFnvyMSXXHJaqezsLAfM1PlJHgPUfoDrFwIJWyWQzJaYHY6S3nFvCKZC6PSbpXCKqCrhxFniTLTjUao5aTS-CR9kLt7rDLI9SP255eRZcmw3Zof8XHZyh-muVzLovUt5oo5CXT-NfMec8yQBgtJ7axl_rsK3n0-1oOUixUnxj46q4QZAtf-ER9nxK2ogNwbJiZ7tD60kHB35KHSJRsgWNE7BqKlgRiML-6J7_mthl-mihP9K_"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0a070e]/90 border border-[#473b5b] font-mono text-[10px] text-[#d8ff38] uppercase">
                  Sub-second TTFB
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Jacob's Ladder Cafe &amp; Hospitality Engine
                </h3>
                <span className="font-mono text-xs text-[#ff6b35]">jacobscafe.netlify.app</span>
              </div>

              <p className="text-sm text-[#9c93a8] leading-relaxed">
                High-speed neighborhood gastronomy experience engineered with live kitchen order queues via Supabase Realtime, cloud-whipped beverage configurators, Stripe Terminal integration, and edge-cached inventory.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Next.js 14 App Router</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Supabase Realtime</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Tailwind CSS</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Edge Workers</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2f273c]/70 flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-xs text-[#9c93a8]">
                <span>Lighthouse: <strong className="text-[#d8ff38]">100</strong></span>
                <span>FCP: <strong className="text-white">0.78s</strong></span>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <a
                  className="inline-flex items-center gap-1 text-[#d8ff38] hover:underline font-semibold"
                  href="https://jacobscafe.netlify.app"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => sfx.click()}
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    sfx.click();
                    onOpenArchitecture();
                  }}
                  className="text-[#9c93a8] hover:text-white transition-colors"
                >
                  Blueprint
                </button>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* PROJECT 2: Landscapes WA — Commercial Architectural Engine                */}
        {/* ========================================================================= */}
        {(filter === 'all' || filter === 'fullstack') && (
          <article className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] transition-all rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 group hover:shadow-[0_0_30px_rgba(216,255,56,0.05)]">
            <div className="flex flex-col gap-4">
              {/* Interactive Scope Estimator Mockup Box */}
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#2f273c] bg-gradient-to-br from-[#1a1423] to-[#0a070e] p-5 flex flex-col justify-between relative select-none">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9c93a8] flex items-center gap-1.5">
                    <Sliders className="w-3 h-3 text-[#d8ff38]" />
                    DYNAMIC ESTIMATION &amp; PDF ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#d8ff38]/20 text-[#d8ff38] font-mono text-[10px] uppercase font-bold">
                    Interactive Preview
                  </span>
                </div>

                <div className="space-y-3 bg-[#0a070e]/80 p-3.5 rounded-lg border border-[#2f273c]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9c93a8]">AREA: {scopeSqFt.toLocaleString()} sq ft</span>
                    <span className="text-[#d8ff38] font-bold">${calculatedCost.toLocaleString()} EST.</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="10000"
                    step="250"
                    value={scopeSqFt}
                    onChange={(e) => {
                      sfx.tick();
                      setScopeSqFt(Number(e.target.value));
                    }}
                    className="w-full accent-[#d8ff38] cursor-pointer"
                  />
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono pt-1">
                    {(['Standard', 'Architectural', 'Ultra-Luxury'] as const).map(tier => (
                      <button
                        key={tier}
                        onClick={() => {
                          sfx.click();
                          setFinishTier(tier);
                        }}
                        className={`px-2 py-1 rounded transition-all ${
                          finishTier === tier
                            ? 'bg-[#d8ff38] text-[#0a070e] font-bold'
                            : 'bg-[#1a1423] text-[#9c93a8] hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#9c93a8] border-t border-[#2f273c]/50 pt-2">
                  <span>Forecast: <strong className="text-white">{calculatedWeeks} Weeks</strong></span>
                  <span className="text-[#ff6b35] font-bold">3.2x Lead Surge</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Landscapes WA — Commercial Architectural Engine
                </h3>
                <span className="font-mono text-xs text-[#ff6b35]">landscapeswa.netlify.app</span>
              </div>

              <p className="text-sm text-[#9c93a8] leading-relaxed">
                High-end residential sanctuary and commercial architectural build configurator featuring dynamic scope-cost estimations, timeline forecasting, interactive masterplan visualization, and automated client PDF generation.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">React</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">PostgreSQL</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Prisma ORM</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">PDFKit Engine</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2f273c]/70 flex items-center justify-between">
              <div className="flex items-center gap-4 font-mono text-xs text-[#9c93a8]">
                <span>Timeline: <strong className="text-white">19 Wks Config</strong></span>
                <span>Conversion: <strong className="text-[#d8ff38]">+320%</strong></span>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <a
                  className="inline-flex items-center gap-1 text-[#d8ff38] hover:underline font-semibold"
                  href="https://landscapeswa.netlify.app"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => sfx.click()}
                >
                  <span>Live Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    sfx.click();
                    onOpenArchitecture();
                  }}
                  className="text-[#9c93a8] hover:text-white transition-colors"
                >
                  Blueprint
                </button>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SPOTLIGHT: Neon Cyber Jackpot — 60FPS WebGL Game Engine                   */}
      {/* ========================================================================= */}
      {(filter === 'all' || filter === 'webgl') && (
        <div className="mt-8 bg-[#1a1423] border border-[#d8ff38]/40 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_35px_rgba(216,255,56,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
                <span className="px-2.5 py-0.5 rounded bg-[#d8ff38] text-[#0a070e] font-bold uppercase">
                  FLAGSHIP ENGINE
                </span>
                <span className="text-[#eadff1]">WEBGL 2.0 / PROCEDURAL WEBAUDIO</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase text-white tracking-tight">
                Neon Cyber Jackpot — 60FPS WebGL Game Engine
              </h3>

              <p className="text-sm text-[#9c93a8] leading-relaxed">
                Engineered with provably fair cryptographic RNG algorithms, procedural audio synthesis via the WebAudio API, 60fps canvas shaders, and sub-10ms state synchronization for embedded casino/iGaming clients.
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Three.js / Canvas</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">FastAPI Microservice</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">WebSockets</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">WebAudio API</span>
              </div>

              {/* Interactive Physical Slot Simulation */}
              <div className="p-5 rounded-xl bg-[#0a070e] border border-[#2f273c] flex flex-col gap-4 font-mono text-xs">
                {/* Reels */}
                <div className="grid grid-cols-3 gap-3">
                  {reels.map((symbol, i) => (
                    <div
                      key={i}
                      className={`h-16 rounded-lg bg-[#130e1b] border flex items-center justify-center font-display font-black text-lg transition-all ${
                        slotStatus === 'won'
                          ? 'border-[#d8ff38] text-[#d8ff38] shadow-[0_0_15px_rgba(216,255,56,0.3)] animate-pulse'
                          : slotStatus === 'spinning'
                          ? 'border-[#ff6b35] text-[#ff6b35]'
                          : 'border-[#2f273c] text-white'
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>

                {/* Telemetry & Spin Trigger */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#2f273c]">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-[10px] text-[#9c93a8]">BALANCE</div>
                      <div className="text-base font-bold text-[#d8ff38]">
                        ${slotBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9c93a8]">STATUS</div>
                      <div className={`font-semibold ${slotStatus === 'won' ? 'text-[#d8ff38]' : slotStatus === 'spinning' ? 'text-[#ff6b35]' : 'text-white'}`}>
                        {slotStatus === 'won' ? 'RNG HIT: 7-7-7 (+$250)' : slotStatus === 'spinning' ? 'CALCULATING TICK...' : 'IDLE (READY)'}
                      </div>
                    </div>
                  </div>

                  <button
                    id="spin-button"
                    disabled={slotStatus === 'spinning'}
                    onClick={spinSlot}
                    className="px-5 py-2.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(216,255,56,0.3)] disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${slotStatus === 'spinning' ? 'animate-spin' : ''}`} />
                    <span>{slotStatus === 'spinning' ? 'Spinning...' : 'Run Spin Simulation'}</span>
                  </button>
                </div>

                <div className="text-[10px] text-[#9c93a8] font-mono truncate">
                  SHA-256 SEED: <span className="text-[#38bdf8]">{slotHash}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#2f273c] bg-[#0a070e] shadow-2xl relative group">
                <img
                  alt="Neon Cyber Jackpot 60FPS WebGL game preview"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UXAuCXyhz8YimvlG35Tp8oxOTU_RYxX0ZAfScuHDKIRP6TKJSKyATIMkvJufOvShAapIlahvfsjEjty2-JfRnOqtxJw3WVojknjdaQLYYmIPbLC6hj0VO9_P1l9qFIBvQmtaMs-TVZXacE7hHypj5KAG7R2zE-uCCXzdxIiDbWxVcr8IyE2mCOGpn7qtDwPDIB-UuxVu16Cj20I7YO1LkFJs13-LxHzgcz1PjlfhmMpekgX3lE3Y5faw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a070e]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] text-[#eadff1] bg-[#0a070e]/90 px-3 py-1 rounded border border-[#2f273c]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff38] animate-ping" />
                  <span>60.2 FPS RENDER PASS VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADDITIONAL TECHNICAL CASES (DocPharma & HFT Trading Simulator)            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* PROJECT 4: DocPharma Query Optimizer */}
        {(filter === 'all' || filter === 'scale') && (
          <article className="bg-[#1a1423] border border-[#2f273c] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#473b5b] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#d8ff38] uppercase">[ BACKEND OPTIMIZATION ]</span>
                <span className="font-mono text-xs text-[#ff6b35] font-bold">-99% LATENCY REDUCTION</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                DocPharma Real-Time Telehealth &amp; Query Optimizer
              </h3>

              <p className="text-sm text-[#9c93a8] leading-relaxed">
                Enterprise query tuning reducing slow PostgreSQL health records queries from 10.2s down to &lt;0.08s via targeted GIN indexing, connection pool multiplexing with PgBouncer, and asynchronous Redis queue workers.
              </p>

              {/* Interactive Before / After Performance Card */}
              <div className="p-4 rounded-lg bg-[#0a070e] border border-[#2f273c] flex flex-col gap-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#9c93a8]">QUERY BENCHMARK TEST:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        sfx.click();
                        setBenchmarkMode('naive');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        benchmarkMode === 'naive' ? 'bg-[#ff6b35] text-white font-bold' : 'text-[#9c93a8]'
                      }`}
                    >
                      NAIVE
                    </button>
                    <button
                      onClick={() => {
                        sfx.click();
                        setBenchmarkMode('optimized');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        benchmarkMode === 'optimized' ? 'bg-[#d8ff38] text-[#0a070e] font-bold' : 'text-[#9c93a8]'
                      }`}
                    >
                      OPTIMIZED
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[#9c93a8]">
                    <span>BEFORE (NAIVE SCAN):</span>
                    <span className="text-[#ff6b35]">10,240 ms latency</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2f273c] rounded overflow-hidden">
                    <div className="w-full h-full bg-[#ff6b35]"></div>
                  </div>

                  <div className="flex justify-between items-center text-[#9c93a8] pt-2">
                    <span>AFTER (GIN INDEX + REDIS CACHE):</span>
                    <span className="text-[#d8ff38] font-bold">78 ms latency</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2f273c] rounded overflow-hidden">
                    <div className="w-[2%] h-full bg-[#d8ff38]"></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2f273c] flex items-center justify-between">
                  <span className="text-[11px] text-[#9c93a8]">
                    Selected mode: <strong className="text-white">{benchmarkLatency}ms</strong>
                  </span>
                  <button
                    onClick={runBenchmark}
                    disabled={benchmarkRunning}
                    className="px-3 py-1 rounded bg-[#241d30] hover:bg-[#30273f] text-[#d8ff38] font-semibold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <Play className={`w-3 h-3 ${benchmarkRunning ? 'animate-spin' : ''}`} />
                    <span>{benchmarkRunning ? 'Measuring...' : 'Run Query'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Node.js</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">PostgreSQL (GIN)</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Redis Pub/Sub</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">gRPC</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2f273c]/70 flex items-center justify-between font-mono text-xs">
              <span className="text-[#9c93a8]">Throughput: <strong className="text-white">12,000 req/sec</strong></span>
              <a
                className="text-[#d8ff38] hover:underline font-semibold flex items-center gap-1"
                href="#discovery"
                onClick={() => sfx.click()}
              >
                <span>Request Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        )}

        {/* PROJECT 5: HFT Trading Simulator Engine */}
        {(filter === 'all' || filter === 'scale') && (
          <article className="bg-[#1a1423] border border-[#2f273c] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#473b5b] transition-all">
            <div className="flex flex-col gap-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#2f273c] bg-[#0a070e] relative group">
                <img
                  alt="Quantex HFT Trading Simulator Dashboard interface"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiQhcXKphXQ-EyA0SRW3kgfuGQM9C2pbpsqLF9UjnjSzOwEaNfKOUGhg2QKUoGbWbIiQn6BBMy83uNOAIgLjuDMzXUj5IZ8zQrqSpWW5nWvLxGm3FdZKf8Dof0gYxpb3sWvf9KKSC_P0mqhjIULbrQh7xrHDG8IwtgOUsrF1JZndYnwa1uDY0O0tvC9jpKsi8ik0gvvezOwjJIPgGetscYvH9QF6p_XVHU4qsNhPtTF1mLMOJBTs7W"
                  loading="lazy"
                />
                {/* Live tick badge overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0a070e]/90 border border-[#2f273c] flex items-center gap-2 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d8ff38] animate-ping" />
                  <span className="text-white font-bold">BTC: ${btcPrice.toLocaleString()}</span>
                  <span className="text-[#d8ff38]">{priceChange}</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-[#0a070e]/90 font-mono text-[10px] text-[#ff6b35] border border-[#2f273c]">
                  Order Match Latency: &lt; {lastMatchLatency} FIFO
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  High-Frequency Trading Simulator Engine
                </h3>
                <span className="font-mono text-xs text-[#9c93a8]">harsh-bali.info</span>
              </div>

              <p className="text-sm text-[#9c93a8] leading-relaxed">
                Real-time institutional trading simulator supporting tick-level Polygon market price streams, FIFO trade matching algorithms, live WebSocket portfolio calculations, and sub-5ms order execution pipelines.
              </p>

              {/* Mini live interactive matching action */}
              <div className="p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#d8ff38]" />
                  <span>TOTAL MATCHED: <strong className="text-white">{matchedOrders.toLocaleString()}</strong></span>
                </div>
                <button
                  onClick={handleSimulateOrder}
                  className="px-3 py-1 rounded bg-[#241d30] text-[#d8ff38] hover:bg-[#30273f] text-[10px] font-bold uppercase transition-all"
                >
                  Test Match Pulse
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Node.js</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Polygon.io Stream</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Redis In-Memory</span>
                <span className="px-2.5 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]">Docker</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2f273c]/70 flex items-center justify-between font-mono text-xs">
              <span className="text-[#9c93a8]">Engine Tick: <strong className="text-[#d8ff38]">Sub-5ms FIFO</strong></span>
              <a
                className="text-[#d8ff38] hover:underline font-semibold flex items-center gap-1"
                href="#discovery"
                onClick={() => sfx.click()}
              >
                <span>Inspect Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
