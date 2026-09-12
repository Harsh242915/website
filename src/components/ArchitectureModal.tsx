import { useState } from 'react';
import { X, Layers, Cpu, Database, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { sfx } from '../lib/audio';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'speed' | 'interface' | 'database' | 'security'>('overview');

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
                <span className="font-mono text-xs text-[#d8ff38] uppercase font-bold">[ HOW WE BUILD SOFTWARE ]</span>
                <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[#9c93a8] font-mono text-[10px]">SOLID ARCHITECTURE</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">How Your Software Is Structured</h3>
            </div>
          </div>
          <button
            onClick={() => {
              sfx.click();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#241d30] text-[#9c93a8] hover:text-white hover:bg-[#30273f] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#2f273c] bg-[#0d0a12] overflow-x-auto text-xs font-mono">
          {[
            { id: 'overview', label: 'Full Overview', icon: Layers },
            { id: 'speed', label: 'Speed & Hosting', icon: Zap },
            { id: 'interface', label: 'User Interface', icon: Cpu },
            { id: 'database', label: 'Database & Storage', icon: Database },
            { id: 'security', label: 'Security & QA', icon: Shield },
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
                  HOW IT WORKS: USER CLICKS ➔ FAST SERVER ➔ SECURE DATABASE ➔ INSTANT REPLY
                </div>
                Every application we build uses clean, organized code. We avoid fragile shortcuts so that as your business gains thousands of users, your application continues running fast without needing expensive complete rewrites.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#d8ff38]">STAGE 01</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-[#38bdf8]">FAST HOSTING</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Global Cloud Network</h4>
                  <p className="text-xs text-[#9c93a8]">
                    Your website files are cached close to your users worldwide, making initial page loading feel instantaneous.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#ff6b35]">STAGE 02</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-[#ff6b35]">APP CORE</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Modern Web Application</h4>
                  <p className="text-xs text-[#9c93a8]">
                    Built with reliable modern frameworks (React & Next.js) so pages respond smoothly to user clicks and taps.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#1a1423] border border-[#2f273c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">STAGE 03</span>
                    <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[10px] font-mono text-white">DATA</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Secure Database</h4>
                  <p className="text-xs text-[#9c93a8]">
                    Enterprise-grade database storage keeping user profiles, orders, and business data safe, backed up, and fast.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'speed' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Optimized for Speed and Mobile</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                Slow websites lose customers. We ensure all images, scripts, and pages are automatically compressed and served instantly, even on mobile connections.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ Automatic image and media compression</div>
                <div className="text-[#d8ff38]">✓ Global cloud hosting for fast international access</div>
                <div className="text-[#d8ff38]">✓ Clean, lightweight code without unnecessary bloat</div>
              </div>
            </div>
          )}

          {activeTab === 'interface' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Intuitive, Responsive User Interface</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                We design interfaces that look modern and feel natural to use. Everything is crafted with responsive layouts that automatically adjust to mobile phones, tablets, laptops, and ultra-wide displays.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ Smooth animations and interactive feedback</div>
                <div className="text-[#d8ff38]">✓ Mobile-friendly touch targets and quick navigation</div>
                <div className="text-[#d8ff38]">✓ Clean typography and accessible color contrast</div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Safe &amp; Organized Data Storage</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                Your database is the core of your software. We design clean database schemas with relationships and automated backups so your business data stays accurate, organized, and scalable.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ Automated daily backups and recovery options</div>
                <div className="text-[#d8ff38]">✓ Fast query caching so repeated searches load instantly</div>
                <div className="text-[#d8ff38]">✓ Strict data integrity preventing duplicate or missing records</div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-xl text-white">Built-in Security &amp; Automated Testing</h4>
              <p className="text-[#9c93a8] leading-relaxed">
                We take security seriously from day one. User passwords are encrypted, payment information is handled safely through certified processors (like Stripe), and automated tests check every flow before launch.
              </p>
              <div className="p-4 rounded-xl bg-[#0a070e] border border-[#2f273c] font-mono text-xs space-y-2">
                <div className="text-[#d8ff38]">✓ Secure login and user account protection</div>
                <div className="text-[#d8ff38]">✓ Safe payment gateway integrations (Stripe Certified)</div>
                <div className="text-[#d8ff38]">✓ Automated test suites verifying checkout and user flows</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#2f273c] bg-[#1a1423] flex items-center justify-between font-mono text-xs">
          <span className="text-[#9c93a8]">100% Code Ownership &amp; IP Transfer</span>
          <button
            onClick={() => {
              sfx.click();
              onClose();
              const el = document.getElementById('discovery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg bg-[#d8ff38] text-[#0a070e] font-bold flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
