import { useState } from 'react';
import { ArrowUp, Copy, Check, ShieldCheck, Heart } from 'lucide-react';
import { sfx } from '../lib/audio';
import { Logo } from './Logo';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    sfx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.online');
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
            <Logo size="md" />

            <p className="text-xs text-[#9c93a8] leading-relaxed max-w-sm">
              We build custom web applications, digital platforms, and software for founders and growing businesses. Quality code, clear timelines, and 100% full ownership.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1a1423] border border-[#2f273c] text-white hover:border-[#d8ff38] transition-all text-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#d8ff38]" /> : <Copy className="w-3.5 h-3.5 text-[#9c93a8]" />}
                <span>{copied ? 'Copied to clipboard' : 'founders@launchdrift.online'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-white font-bold uppercase tracking-wider text-xs">NAVIGATION</span>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="#works" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Our Work &amp; Portfolio (9)
              </a>
              <a href="#engineering-standard" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Quality &amp; Standards
              </a>
              <a href="#sprint-protocol" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Our Development Process
              </a>
              <a href="#engagement-models" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Services &amp; Pricing Options
              </a>
              <a href="#discovery" onClick={() => sfx.click()} className="hover:text-[#d8ff38] transition-colors">
                Contact &amp; Project Inquiry
              </a>
            </div>
          </div>

          {/* Guarantee & Availability */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-white font-bold uppercase tracking-wider text-xs">PROJECT AVAILABILITY</span>
            <div className="p-4 rounded-lg bg-[#0d0a12] border border-[#2f273c] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Current Status:</span>
                <span className="text-[#d8ff38] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff38] animate-ping" />
                  Accepting New Projects
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Code Guarantee:</span>
                <span className="text-white">100% Code Ownership</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9c93a8]">Post-Launch Support:</span>
                <span className="text-[#38bdf8]">30-Day Included Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2f273c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d8ff38]" />
            <span>© {new Date().getFullYear()} Launchdrift Studio. Full code and intellectual property ownership guarantee.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-[#d8ff38] transition-colors px-2 py-1 rounded hover:bg-[#1a1423] cursor-pointer"
              title="Return to top of page"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
