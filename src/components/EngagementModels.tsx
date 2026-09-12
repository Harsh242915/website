import { useState } from 'react';
import { Check, Zap, Sparkles, Terminal, ArrowRight, SlidersHorizontal, Calculator } from 'lucide-react';
import { sfx } from '../lib/audio';

interface EngagementModelsProps {
  onSelectTier: (tierName: string, specs?: string) => void;
}

export function EngagementModels({ onSelectTier }: EngagementModelsProps) {
  // Interactive Calculator State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Secure Database & User Accounts',
    'Custom Web Application Interface',
    'Stripe Payments & Checkout',
  ]);

  const FEATURE_CATALOG = [
    { name: 'Secure Database & User Accounts', days: 4, complexity: 12 },
    { name: 'Custom Web Application Interface', days: 7, complexity: 18 },
    { name: 'Stripe Payments & Checkout', days: 4, complexity: 15 },
    { name: 'Custom Visual Animations & 3D', days: 6, complexity: 25 },
    { name: 'Live Chat & Real-Time Notifications', days: 5, complexity: 20 },
    { name: 'AI & Smart Assistant Integration', days: 5, complexity: 22 },
    { name: 'Automated Testing & QA Checks', days: 3, complexity: 10 },
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
  }, 5); // base 5 days planning

  const calculatedWeeks = (calculatedDays / 5).toFixed(1);
  const calculatedComplexity = selectedFeatures.reduce((acc, fName) => {
    const item = FEATURE_CATALOG.find(f => f.name === fName);
    return acc + (item ? item.complexity : 0);
  }, 10);

  const handleExportSpec = () => {
    sfx.click();
    const specSummary = `Custom project estimate: ~${calculatedWeeks} weeks. Selected features: ${selectedFeatures.join(', ')}.`;
    onSelectTier('Custom Project Scope', specSummary);
    const element = document.getElementById('discovery');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="engagement-models" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Section Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ SERVICES &amp; PRICING ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>CLEAR PROJECT OPTIONS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          STRUCTURED ENGAGEMENT OPTIONS.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          Straightforward project tiers with clear deliverables and realistic timelines. 100% full intellectual property and code ownership transferred to you.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* TIER 1: Core MVP Launch */}
        <div className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] transition-all rounded-xl p-8 flex flex-col justify-between gap-8 group">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#9c93a8]">TIER 01</span>
              <span className="px-2.5 py-0.5 rounded bg-[#0a070e] text-[#eadff1] border border-[#2f273c]">
                4–6 WEEKS
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                Core MVP Launch
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For founders and businesses who need a working, polished version of their product launched to early customers.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              {[
                'Full custom web application designed and built from scratch',
                'Secure user sign-up, login, and password management',
                'Clean, responsive design for desktop, tablet, and mobile',
                'Stripe payment integration and customer billing',
                'Thorough device testing and quality assurance checks',
                '30 days of post-launch bug fixing and warranty support',
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
              onSelectTier('Core MVP Launch (4–6 Weeks)');
            }}
            className="w-full py-3 rounded-lg bg-[#241d30] border border-[#473b5b] text-[#eadff1] font-mono text-xs font-bold uppercase text-center hover:bg-[#30273f] hover:text-[#d8ff38] hover:border-[#d8ff38]/40 transition-all"
          >
            Select Core MVP
          </a>
        </div>

        {/* TIER 2: Full-Stack Custom Platform */}
        <div className="bg-[#1a1423] border-2 border-[#d8ff38] rounded-xl p-8 flex flex-col justify-between gap-8 relative shadow-[0_0_40px_rgba(216,255,56,0.12)]">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d8ff38] text-[#0a070e] font-mono text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>RECOMMENDED // FULL PLATFORM</span>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#d8ff38] font-bold">TIER 02</span>
              <span className="px-2.5 py-0.5 rounded bg-[#d8ff38]/10 text-[#d8ff38] font-bold border border-[#d8ff38]/30">
                6–10 WEEKS
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                Custom Full-Stack Platform
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For comprehensive products requiring complex workflows, custom dashboards, interactive animations, or high traffic.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              <div className="text-[11px] font-mono text-[#d8ff38] font-semibold">Everything in Core MVP, plus:</div>
              {[
                'Advanced custom dashboards and multi-role user permissions',
                'Real-time messaging, live notifications, or socket updates',
                'Interactive 2D/3D visual components and animations',
                'Third-party API integrations and automated data sync',
                'Dedicated code review and architecture consulting',
                '60 days of post-launch warranty and technical support',
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
              onSelectTier('Custom Full-Stack Platform (6–10 Weeks)');
            }}
            className="w-full py-3.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-black uppercase text-center hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(216,255,56,0.3)] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Select Full Platform</span>
          </a>
        </div>

        {/* TIER 3: Ongoing Technical Partnership */}
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
                Technical Advisory &amp; Support
              </h3>
              <p className="text-xs text-[#9c93a8] mt-1">
                For established businesses and post-funding teams that need continuous feature development and senior software advice.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#2f273c]">
              {[
                'Ongoing feature additions, improvements, and updates',
                'Software architecture design and performance monitoring',
                'Technical guidance and code reviews for your team',
                'Regular strategy calls to align technology with business goals',
                'Dedicated communication channel via Slack or Discord',
                'Flexible priority support when urgent issues arise',
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
              onSelectTier('Technical Advisory & Support');
            }}
            className="w-full py-3 rounded-lg bg-[#241d30] border border-[#473b5b] text-[#eadff1] font-mono text-xs font-bold uppercase text-center hover:bg-[#30273f] hover:text-[#d8ff38] hover:border-[#d8ff38]/40 transition-all"
          >
            Inquire About Retainer
          </a>
        </div>
      </div>

      {/* Interactive Feature Estimator */}
      <div className="mt-12 bg-[#130e1b] border border-[#2f273c] rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2f273c]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d8ff38]/10 text-[#d8ff38] border border-[#d8ff38]/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#d8ff38] font-bold">
                [ ESTIMATION TOOL ]
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Interactive Project Scope &amp; Timeline Estimator
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[#9c93a8]">
              Estimated Timeline: <strong className="text-[#d8ff38] text-base">{calculatedWeeks} Weeks</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
          {FEATURE_CATALOG.map((f) => {
            const isSelected = selectedFeatures.includes(f.name);
            return (
              <button
                key={f.name}
                type="button"
                onClick={() => toggleFeature(f.name)}
                className={`p-3.5 rounded-lg border text-left font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a1423] border-[#d8ff38] text-white'
                    : 'bg-[#0a070e] border-[#2f273c] text-[#9c93a8] hover:border-[#473b5b] hover:text-white'
                }`}
              >
                <span>{f.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isSelected ? 'bg-[#d8ff38] text-[#0a070e]' : 'bg-[#1a1423] text-[#9c93a8]'}`}>
                  {isSelected ? 'ADDED' : '+ ADD'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#2f273c] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#9c93a8] font-mono">
            Select the features you need above to get a general timeline estimate.
          </p>
          <button
            onClick={handleExportSpec}
            className="px-5 py-2.5 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-bold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Transfer to Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
