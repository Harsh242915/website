import { useState } from 'react';
import { ArrowUp, Copy, Check, ShieldCheck, Heart } from 'lucide-react';
import { sfx } from '../lib/audio';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    sfx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-[#07050a] border-t border-[#2f273c] text-xs font-mono text-[#9c93a8] py-16 px-4 sm:px-8">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Colophon */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-[#d8ff38] text-[#0d0a12] flex items-center justify-center font-display font-black text-lg tracking-tighter shadow-[0_0_15px_rgba(216,255,56,0.3)]">
                LD
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight text-white leading-none">
                  LAUNCHDRIFT
                </span>
                <span className="text-[9px] text-[#9c93a8] tracking-widest uppercase">
                  STUDIO // HARSH BALI
                </span>
              </div>
            </div>

            <p className="text-xs text-[#9c93a8] leading-relaxed max-w-sm">
              We engineer full-stack MVPs with the architecture of a Series B product. Led by Harsh Bali and principal engineers. Sydney, Australia • Operating Globally.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1423] border border-[#2f273c] text-white hover:border-[#d8ff38] transition-all text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#d8ff38]" /> : <Copy className="w-3.5 h-3.5 text-[#9c93a8]" />}
                <span>{copied ? 'Copied to clipboard' : 'founders@launchdrift.io'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-white font-bold uppercase tracking-wider text-xs">ARCHITECTURAL SECTIONS</span>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="#works" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Verified Client Artifacts (5)
              </a>
              <a href="#engineering-standard" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Engineering Standard &amp; Pillars
              </a>
              <a href="#sprint-protocol" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                The 3-Week Launch Protocol
              </a>
              <a href="#engagement-models" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Structured Sprint Capacity Tiers
              </a>
              <a href="#discovery" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Discovery &amp; Estimation Desk
              </a>
            </div>
          </div>

          {/* Live System Uptime */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-white font-bold uppercase tracking-wider text-xs">EDGE TELEMETRY &amp; UPTIME</span>
            <div className="p-4 rounded-lg bg-[#0d0a12] border border-[#2f273c] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Edge Network Status:</span>
                <span className="text-[#d8ff38] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff38] animate-ping" />
                  100.00% Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Compiler Verification:</span>
                <span className="text-white">TS 5.4.5 Strict</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Current Cohort:</span>
                <span className="text-[#38bdf8]">Q2 2026 (2 Slots Left)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2f273c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d8ff38]" />
            <span>© {new Date().getFullYear()} Launchdrift Studio. 100% IP Repository Transfer Guarantee.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#9c93a8] flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-[#ff6b35] fill-current" /> by Harsh Bali
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-[#d8ff38] transition-colors px-2 py-1 rounded hover:bg-[#1a1423]"
              title="Return to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
