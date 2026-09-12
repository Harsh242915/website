import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, Mail, Sparkles, User, Copy, Check } from 'lucide-react';
import { sfx } from '../lib/audio';
import type { QuoteFormState } from '../types';

interface QuoteIntakeProps {
  initialTier?: string;
  initialSpecs?: string;
}

export function QuoteIntake({ initialTier, initialSpecs }: QuoteIntakeProps) {
  const [form, setForm] = useState<QuoteFormState>({
    founderName: '',
    workEmail: '',
    projectType: initialTier || 'High-Scale Performance Pod (3–5 Weeks)',
    targetTimeline: '3 Weeks (Sprint MVP)',
    specs: initialSpecs || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync if parent updates initial values
  if (initialTier && form.projectType !== initialTier && !submitted) {
    setForm(prev => ({
      ...prev,
      projectType: initialTier,
      specs: initialSpecs || prev.specs,
    }));
  }

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.io');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sfx.click();
    setIsSubmitting(true);

    setTimeout(() => {
      sfx.winChime();
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    sfx.click();
    setSubmitted(false);
    setForm({
      founderName: '',
      workEmail: '',
      projectType: 'High-Scale Performance Pod (3–5 Weeks)',
      targetTimeline: '3 Weeks (Sprint MVP)',
      specs: '',
    });
  };

  return (
    <section id="discovery" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ DISCOVERY &amp; ESTIMATION PROTOCOL ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>INITIATE SPRINT</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              COMMENCE ARCHITECTURE INTAKE.
            </h2>
            <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
              Submit your technical scope or product requirements. Our systems architects review every brief and return an estimated scope, timeline, and preliminary architecture within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#9c93a8] bg-[#1a1423] border border-[#2f273c] px-3.5 py-2 rounded-lg shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#d8ff38]" />
            <span>Direct:</span>
            <span className="text-white font-semibold">founders@launchdrift.io</span>
            <button
              onClick={handleCopyEmail}
              className="ml-1 text-[#9c93a8] hover:text-[#d8ff38] transition-colors p-1"
              title="Copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#d8ff38]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Centered Intake Protocol Form Container */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-[#130e1b] border border-[#2f273c] rounded-xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#d8ff38]/10 border border-[#d8ff38] flex items-center justify-center text-[#d8ff38]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#d8ff38] font-bold uppercase tracking-wider">
                  BRIEF RECEIVED // QUEUE POSITION #02
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Architecture Intake Dispatched
                </h3>
                <p className="text-sm text-[#9c93a8] max-w-md font-mono">
                  Thank you, <strong className="text-white">{form.founderName || 'Founder'}</strong>. We will review your technical requirements for <strong className="text-white">{form.workEmail}</strong> and respond within 24 hours with an architectural blueprint.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0a070e] border border-[#2f273c] font-mono text-xs text-left w-full max-w-md space-y-1 text-[#9c93a8]">
                <div><strong className="text-white">Sprint Tier:</strong> {form.projectType}</div>
                <div><strong className="text-white">Target Timeline:</strong> {form.targetTimeline}</div>
                <div><strong className="text-white">SLA Verification:</strong> Active (&lt;24h)</div>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-lg bg-[#1a1423] border border-[#473b5b] text-xs font-mono text-[#eadff1] hover:text-white hover:border-[#d8ff38] transition-colors cursor-pointer"
              >
                Submit Another Specification
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Founder Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="founder-name-input" className="text-[#eadff1] font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d8ff38]" />
                    <span>FOUNDER / TECH LEAD NAME *</span>
                  </label>
                  <input
                    id="founder-name-input"
                    type="text"
                    required
                    placeholder="e.g. Alex Thorne"
                    value={form.founderName}
                    onChange={(e) => setForm({ ...form, founderName: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
                  />
                </div>

                {/* Work Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="founder-email-input" className="text-[#eadff1] font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>FOUNDER WORK EMAIL *</span>
                  </label>
                  <input
                    id="founder-email-input"
                    type="email"
                    required
                    placeholder="alex@venture.co"
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Sprint Model Selection */}
              <div className="flex flex-col gap-2">
                <label htmlFor="sprint-tier-select" className="text-[#eadff1] font-semibold">
                  SELECT SPRINT CAPACITY / TIER *
                </label>
                <select
                  id="sprint-tier-select"
                  value={form.projectType}
                  onChange={(e) => {
                    sfx.tick();
                    setForm({ ...form, projectType: e.target.value });
                  }}
                  className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Sprint MVP Build (3 Weeks)">Tier 01: Sprint MVP Build (3 Weeks)</option>
                  <option value="High-Scale Performance Pod (3–5 Weeks)">Tier 02: High-Scale Performance Pod (3–5 Weeks)</option>
                  <option value="Advisory & Fractional CTO Pod">Tier 03: Advisory &amp; Fractional CTO Pod</option>
                  <option value="Calculated Custom Sprint">Custom Sprint Architecture</option>
                </select>
              </div>

              {/* Target Timeline */}
              <div className="flex flex-col gap-2">
                <label className="text-[#eadff1] font-semibold">
                  TARGET PRODUCTION LAUNCH WINDOW
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['3 Weeks (Sprint MVP)', '4–6 Weeks (Scale)', 'Flexible / Exploring'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        sfx.tick();
                        setForm({ ...form, targetTimeline: time });
                      }}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        form.targetTimeline === time
                          ? 'bg-[#1a1423] border-[#d8ff38] text-[#d8ff38] font-bold'
                          : 'bg-[#0a070e] border-[#2f273c] text-[#9c93a8] hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Scope / PRD / Specs */}
              <div className="flex flex-col gap-2">
                <label htmlFor="specs-textarea" className="text-[#eadff1] font-semibold flex items-center justify-between">
                  <span>PROJECT REQUIREMENTS / PRD / FIGMA LINK / STACK</span>
                  <span className="text-[10px] text-[#9c93a8]">Optional but recommended</span>
                </label>
                <textarea
                  id="specs-textarea"
                  rows={4}
                  placeholder="Share your product description, Figma prototype link, target database entities, or specific engineering requirements..."
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="submit-brief-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-black uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,255,56,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#0a070e]" />
                    <span>TRANSMITTING BRIEF TO ENGINEERING DESK...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#0a070e]" />
                    <span>DISPATCH ARCHITECTURE BRIEF →</span>
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#2f273c]/60 text-[11px] text-[#9c93a8]">
                <span>100% Repository Transfer &amp; Full IP Ownership</span>
                <span className="text-[#eadff1] font-semibold">Response SLA &lt; 24 Hours Guaranteed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
