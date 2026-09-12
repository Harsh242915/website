import { useState } from 'react';
import { X, Layers, Cpu, Database, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { sfx } from '../lib/audio';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'edge' | 'app' | 'data' | 'security'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-[#130e1b] border border-[#d8ff38]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(216,255,56,0.15)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2f273c] bg-[#1a1423] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d8ff38]/10 text-[#d8ff38] border border-[#d8ff38]/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#d8ff38] uppercase font-bold">[ SYSTEM ARCHITECTURE BLUEPRINT ]</span>
                <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[#9c93a8] font-mono text-[10px]">v2.4 COMPILER STRICT</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Production MVP Reference Topology</h3>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.click();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#241d30] text-[#9c93a8] hover:text-white hover:bg-[#30273f] transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#2f273c] bg-[#0d0a12] overflow-x-auto text-xs font-mono">
          {[
            { id: 'overview', label: 'Full Topology', icon: Layers },
            { id: 'edge', label: 'Edge & CDN (<45ms)', icon: Zap },
            { id: 'app', label: 'App Router & WebGL', icon: Cpu },
            { id: 'data', label: 'PostgreSQL + Redis', icon: Database },
            { id: 'security', label: 'Playwright & Zod', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.click();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-5 py-3.5 whitespace-nowrap transition-all border-b-2 font-semibold ${
                  isActive
                    ? 'border-[#d8ff38] text-[#d8ff38] bg-[#1a1423]'
                    : 'border-transparent text-[#9c93a8] hover:text-white hover:bg-[#16111d]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto font-sans space-y-6 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs text-[#9c93a8] leading-relaxed">
                <div className="text-[#d8ff38] font-bold pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d8ff38] animate-ping" />
                  PIPELINE FLOW: BROWSER → EDGE ROUTING → RSC RUNTIME → PG CONNECTION POOL
                </div>
                Every product we build follows this exact immutable architecture. No monolithic spaghetti or disposable code. Built so when your Series A arrives, you scale by adding workers—not rewriting from scratch.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#d8ff38]">STAGE 01</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-[#38bdf8]">EDGE</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Global Cloudflare Edge</h4>
                  <p className="text-xs text-[#9c93a8]">
                    Static assets & edge compute cached across 300+ PoPs worldwide. HTML payload streamed with sub-45ms TTFB.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#ff6b35]">STAGE 02</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-[#ff6b35]">APP</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Next.js 14 + WebSockets</h4>
                  <p className="text-xs text-[#9c93a8]">
                    React Server Components for zero client bundle bloat. Low-latency bidirectional socket channels for live sync.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">STAGE 03</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-white">DATA</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">PostgreSQL & PgBouncer</h4>
                  <p className="text-xs text-[#9c93a8]">
                    Connection pooling with multiplexed client connections. Drizzle ORM strictly bound to Zod type safety.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edge' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Sub-45ms Edge Routing Layer</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                Rather than forcing every request to hit an origin server in a single datacenter, Launchdrift configures multi-region edge caches. Headers are inspected at the edge for session state, geo-routing, and instant CDN returns.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ Edge Workers with stale-while-revalidate TTLs</div>
                <div className="text-[#d8ff38]">✓ Brotli / AVIF asset compression at source</div>
                <div className="text-[#d8ff38]">✓ Global DNS resolution under 12ms via anycast</div>
              </div>
            </div>
          )}

          {activeTab === 'app' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Zero-Bloat Full-Stack Runtime</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                We separate presentation logic from mutations with surgical clarity. React Server Components handle database queries directly on the server without leaking API secrets, while interactive components receive micro-optimized client hydration.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ 60 FPS WebGL canvas shaders for gaming and 3D</div>
                <div className="text-[#d8ff38]">✓ WebAudio API synthesized audio loops with zero asset lag</div>
                <div className="text-[#d8ff38]">✓ Server Actions with rate limiting and CSRF protection</div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">High-Throughput PostgreSQL & Redis Queues</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                Database bottlenecks kill startups before traction scales. We employ PgBouncer transaction pooling to support thousands of concurrent connections with minimal RAM overhead.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ GIN indexing on JSONB search queries (-99% latency)</div>
                <div className="text-[#d8ff38]">✓ Redis Pub/Sub for sub-5ms order books and notifications</div>
                <div className="text-[#d8ff38]">✓ Automated migration rollback tests in staging</div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Automated Verification & Zero-Debt Delivery</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                Before code is shipped to your production domain, it passes through strict automated Playwright regression suites covering happy paths, payment edge cases, and role access rules.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ 100% Core Web Vitals audit pass on mobile & desktop</div>
                <div className="text-[#d8ff38]">✓ Strict TypeScript compiler standard: `noImplicitAny: true`</div>
                <div className="text-[#d8ff38]">✓ Full IP transfer + private GitHub repository ownership</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#2f273c] bg-[#1a1423] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9c93a8]">
            <CheckCircle2 className="w-4 h-4 text-[#d8ff38]" />
            <span>Ready for 3-week sprint deployment</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sfx.click();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#241d30] text-xs font-mono text-[#eadff1] hover:text-white transition-all w-full sm:w-auto"
            >
              Close
            </button>
            <a
              href="#discovery"
              onClick={() => {
                sfx.click();
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <span>Build With This Stack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
