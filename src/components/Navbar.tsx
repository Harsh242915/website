import { useState } from 'react';
import { Copy, Check, Terminal, Menu, X, ArrowUpRight } from 'lucide-react';
import { sfx } from '../lib/audio';

interface NavbarProps {
  onOpenArchitecture?: () => void;
}

export function Navbar({ onOpenArchitecture }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const navLinks = [
    { name: 'Works', href: '#works' },
    { name: 'Engineering Standard', href: '#engineering-standard' },
    { name: '3-Week Protocol', href: '#sprint-protocol' },
    { name: 'Sprint Models', href: '#engagement-models' },
    { name: 'Intake Desk', href: '#discovery' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-[#0d0a12]/90 backdrop-blur-xl border-b border-[#2f273c]/80 transition-all">
      <div className="max-w-[1360px] mx-auto h-20 px-4 sm:px-8 flex items-center justify-between gap-6">
        {/* Brand Logo + Sprint Slot Badge */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            onClick={() => sfx.click()}
            className="flex items-center gap-3 group transition-opacity"
            title="Launchdrift Architecture Studio"
          >
            <div className="h-8 w-8 rounded bg-[#d8ff38] text-[#0d0a12] flex items-center justify-center font-display font-black text-lg tracking-tighter shadow-[0_0_15px_rgba(216,255,56,0.3)]">
              LD
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-[#d8ff38] transition-colors leading-none">
                LAUNCHDRIFT
              </span>
              <span className="font-mono text-[9px] text-[#9c93a8] tracking-widest uppercase">
                STUDIO // HARSH BALI
              </span>
            </div>
          </a>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1423] border border-[#473b5b]/50 text-[11px] font-mono text-[#eadff1]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff38] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d8ff38]"></span>
            </span>
            <span className="text-[#d8ff38] font-semibold">Q2 SPRINT SLOTS OPEN</span>
            <span className="text-[#9c93a8]">(2/3 REMAINING)</span>
          </div>
        </div>

        {/* Human Curated Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-[#9c93a8]">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => sfx.click()}
              className="hover:text-[#d8ff38] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#d8ff38] after:transition-all"
            >
              {item.name}
            </a>
          ))}
          {onOpenArchitecture && (
            <button
              onClick={() => {
                sfx.click();
                onOpenArchitecture();
              }}
              className="text-[#38bdf8] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Blueprint</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </nav>

        {/* Desk Action: Direct Email Copy + CTA */}
        <div className="flex items-center gap-3">
          <button
            id="nav-copy-email"
            onClick={handleCopyEmail}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1a1423] border border-[#2f273c] text-xs font-mono text-[#9c93a8] hover:text-white hover:border-[#473b5b] transition-all group"
            title="Click to copy direct founders email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d8ff38]" />
                <span className="text-[#d8ff38] font-semibold">COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#9c93a8] group-hover:text-white transition-colors" />
                <span>founders@launchdrift.io</span>
              </>
            )}
          </button>

          <a
            id="nav-quote-cta"
            href="#discovery"
            onClick={() => sfx.click()}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(216,255,56,0.25)]"
          >
            <Terminal className="w-4 h-4 text-[#0a070e]" />
            <span>Request Sprint Quote</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              sfx.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-[#1a1423] border border-[#2f273c] text-[#eadff1] hover:text-[#d8ff38]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drop */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#130e1b] border-b border-[#2f273c] px-6 py-6 font-mono text-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2f273c] text-xs text-[#d8ff38]">
            <span>Q2 SPRINT SLOTS OPEN (2/3 REMAINING)</span>
          </div>
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  sfx.click();
                  setMobileMenuOpen(false);
                }}
                className="text-[#eadff1] hover:text-[#d8ff38] py-1 text-sm uppercase tracking-wider"
              >
                {item.name}
              </a>
            ))}
            {onOpenArchitecture && (
              <button
                onClick={() => {
                  sfx.click();
                  setMobileMenuOpen(false);
                  onOpenArchitecture();
                }}
                className="text-left text-[#38bdf8] hover:text-white py-1 text-sm uppercase tracking-wider flex items-center gap-1"
              >
                <span>Inspect System Architecture</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="pt-3 border-t border-[#2f273c] flex flex-col gap-2">
            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 px-4 rounded bg-[#1a1423] border border-[#2f273c] text-xs text-center text-[#9c93a8] flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-[#d8ff38]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to clipboard!' : 'Copy founders@launchdrift.io'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
