import { useState } from 'react';
import { Copy, Check, Terminal, Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { sfx } from '../lib/audio';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenArchitecture?: () => void;
}

export function Navbar({ onOpenArchitecture }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.online');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const navLinks = [
    { name: 'Portfolio', href: '#works' },
    { name: 'Quality', href: '#engineering-standard' },
    { name: 'Process', href: '#sprint-protocol' },
    { name: 'Services', href: '#engagement-models' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-[#0d0a12]/85 backdrop-blur-xl border-b border-[#2f273c]/60 transition-all">
      <div className="max-w-[1400px] mx-auto h-16 px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={() => sfx.click()}
            className="group transition-opacity"
            title="Launchdrift Software Studio"
          >
            <Logo size="sm" />
          </a>

          {/* Minimal Availability Dot */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1a1423] border border-[#473b5b]/40 text-[10px] font-mono text-[#eadff1]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff38] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d8ff38]"></span>
            </span>
            <span className="text-[#d8ff38] font-semibold">Available for New Projects</span>
          </div>
        </div>

        {/* Clean Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-[#9c93a8]">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => sfx.click()}
              className="hover:text-white transition-colors py-1 relative hover:text-[#d8ff38]"
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
              className="px-2.5 py-1 rounded bg-[#1a1423] border border-[#2f273c] hover:border-[#38bdf8] text-[#38bdf8] hover:text-white transition-all flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <span>How We Build</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2.5">
          {/* Quick Copy Email Button */}
          <button
            id="nav-copy-email"
            onClick={handleCopyEmail}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1423] border border-[#2f273c] text-xs font-mono text-[#9c93a8] hover:text-white hover:border-[#473b5b] transition-all cursor-pointer"
            title="Click to copy direct email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d8ff38]" />
                <span className="text-[#d8ff38] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#9c93a8]" />
                <span className="text-xs">founders@launchdrift.online</span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <a
            id="nav-quote-cta"
            href="#discovery"
            onClick={() => sfx.click()}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(216,255,56,0.2)]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#0a070e]" />
            <span>Contact Us</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              sfx.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-lg bg-[#1a1423] border border-[#2f273c] text-[#eadff1] hover:text-[#d8ff38]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-[#130e1b] border-b border-[#2f273c] px-6 py-5 font-mono text-sm space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2.5">
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
                <span>How We Build Software</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="pt-3 border-t border-[#2f273c] flex flex-col gap-2">
            <button
              onClick={handleCopyEmail}
              className="w-full py-2 px-3 rounded bg-[#1a1423] border border-[#2f273c] text-xs text-center text-[#9c93a8] flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#d8ff38]" /> : <Copy className="w-3.5 h-3.5 text-[#9c93a8]" />}
              <span>{copied ? 'Copied to clipboard!' : 'founders@launchdrift.online'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
