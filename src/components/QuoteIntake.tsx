import { useState, useEffect, type FormEvent } from 'react';
import { Send, CheckCircle, Mail, Sparkles, User, Copy, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { sfx } from '../lib/audio';
import type { QuoteFormState } from '../types';

interface QuoteIntakeProps {
  initialTier?: string;
  initialSpecs?: string;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8jqwbhq';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_m9gq4kb';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'PFedQgUZlJZU1j_q6';

export function QuoteIntake({ initialTier, initialSpecs }: QuoteIntakeProps) {
  const [form, setForm] = useState<QuoteFormState>({
    founderName: '',
    workEmail: '',
    projectType: initialTier || 'Custom Full-Stack Platform (6–10 Weeks)',
    targetTimeline: '4–6 Weeks',
    specs: initialSpecs || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync only when parent prop explicitly changes
  useEffect(() => {
    if (initialTier) {
      setForm(prev => ({
        ...prev,
        projectType: initialTier,
        specs: initialSpecs !== undefined ? initialSpecs : prev.specs,
      }));
    }
  }, [initialTier, initialSpecs]);

  const handleCopyEmail = () => {
    sfx.click();
    navigator.clipboard.writeText('founders@launchdrift.online');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sfx.click();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formattedMessage = `
Project Type: ${form.projectType}
Target Timeline: ${form.targetTimeline}
From: ${form.founderName} (${form.workEmail})

Project Requirements / Description:
${form.specs || 'No specific description provided.'}
    `.trim();

    const templateParams = {
      title: `${form.projectType} (${form.targetTimeline})`,
      name: form.founderName,
      from_name: form.founderName,
      user_name: form.founderName,
      email: form.workEmail,
      from_email: form.workEmail,
      user_email: form.workEmail,
      reply_to: form.workEmail,
      time: new Date().toLocaleString(),
      project_type: form.projectType,
      target_timeline: form.targetTimeline,
      timeline: form.targetTimeline,
      specs: form.specs,
      message: formattedMessage,
      message_html: formattedMessage.replace(/\n/g, '<br/>'),
      to_name: 'Launchdrift Studio',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      sfx.winChime();
      setSubmitted(true);
      setErrorMessage(null);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      const errText = err?.text || err?.message || 'Failed to send message. Please try again or contact directly.';
      setErrorMessage(errText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    sfx.click();
    setSubmitted(false);
    setErrorMessage(null);
    setForm({
      founderName: '',
      workEmail: '',
      projectType: 'Custom Full-Stack Platform (6–10 Weeks)',
      targetTimeline: '4–6 Weeks',
      specs: '',
    });
  };

  const mailtoFallbackUrl = `mailto:founders@launchdrift.online?subject=${encodeURIComponent(
    `Project Inquiry: ${form.projectType}`
  )}&body=${encodeURIComponent(
    `Name: ${form.founderName}\nEmail: ${form.workEmail}\nProject Type: ${form.projectType}\nTimeline: ${form.targetTimeline}\n\nScope:\n${form.specs}`
  )}`;

  return (
    <section id="discovery" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ GET IN TOUCH ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>PROJECT INQUIRY</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              TELL US ABOUT YOUR PROJECT.
            </h2>
            <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
              Share your project details, ideas, or requirements below. We review every inquiry and get back to you within 24 hours with an estimated timeline, recommendations, and clear next steps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#9c93a8] bg-[#1a1423] border border-[#2f273c] px-3.5 py-2 rounded-lg shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#d8ff38]" />
            <span>Direct:</span>
            <span className="text-white font-semibold">founders@launchdrift.online</span>
            <button
              onClick={handleCopyEmail}
              className="ml-1 text-[#9c93a8] hover:text-[#d8ff38] transition-colors p-1 cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#d8ff38]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-[#130e1b] border border-[#2f273c] rounded-xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#d8ff38]/10 border border-[#d8ff38] flex items-center justify-center text-[#d8ff38] shadow-[0_0_20px_rgba(216,255,56,0.2)]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#d8ff38] font-bold uppercase tracking-wider">
                  MESSAGE TRANSMITTED
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-sm text-[#9c93a8] max-w-md font-mono">
                  Hi <strong className="text-white">{form.founderName || 'there'}</strong>, your message has been delivered to <strong className="text-[#d8ff38]">founders@launchdrift.online</strong>. We will review your project requirements and follow up within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0a070e] border border-[#2f273c] font-mono text-xs text-left w-full max-w-md space-y-1 text-[#9c93a8]">
                <div><strong className="text-white">Selected Option:</strong> {form.projectType}</div>
                <div><strong className="text-white">Target Timeline:</strong> {form.targetTimeline}</div>
                <div><strong className="text-white">Response Time:</strong> Within 24 hours</div>
              </div>

              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-lg bg-[#1a1423] border border-[#473b5b] text-xs font-mono text-[#eadff1] hover:text-white hover:border-[#d8ff38] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-xs">
              {errorMessage && (
                <div className="p-4 rounded-lg bg-[#2a1318] border border-[#ff4d4d]/50 text-[#ff8080] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#ff4d4d]" />
                    <span>Failed to send: {errorMessage}</span>
                  </div>
                  <a
                    href={mailtoFallbackUrl}
                    className="px-3 py-1.5 rounded bg-[#ff4d4d]/20 text-white hover:bg-[#ff4d4d]/30 text-[11px] font-bold underline transition-colors whitespace-nowrap"
                  >
                    Open in Mail App →
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="founder-name-input" className="text-[#eadff1] font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d8ff38]" />
                    <span>YOUR NAME *</span>
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

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="founder-email-input" className="text-[#eadff1] font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>EMAIL ADDRESS *</span>
                  </label>
                  <input
                    id="founder-email-input"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-2">
                <label htmlFor="sprint-tier-select" className="text-[#eadff1] font-semibold">
                  WHAT ARE YOU LOOKING TO BUILD? *
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
                  <option value="Core MVP Launch (4–6 Weeks)">Tier 01: Core MVP Launch (4–6 Weeks)</option>
                  <option value="Custom Full-Stack Platform (6–10 Weeks)">Tier 02: Custom Full-Stack Platform (6–10 Weeks)</option>
                  <option value="Technical Advisory & Support">Tier 03: Technical Advisory &amp; Support</option>
                  <option value="Custom Project Scope">Custom Project Scope</option>
                </select>
              </div>

              {/* Target Timeline */}
              <div className="flex flex-col gap-2">
                <label className="text-[#eadff1] font-semibold">
                  ESTIMATED TARGET LAUNCH WINDOW
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['4–6 Weeks', '2–3 Months', 'Flexible / Planning'].map((time) => (
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

              {/* Scope & Requirements */}
              <div className="flex flex-col gap-2">
                <label htmlFor="specs-textarea" className="text-[#eadff1] font-semibold flex items-center justify-between">
                  <span>PROJECT DESCRIPTION / FEATURES NEEDED</span>
                  <span className="text-[10px] text-[#9c93a8]">Tell us about your idea</span>
                </label>
                <textarea
                  id="specs-textarea"
                  rows={4}
                  placeholder="Share a brief description of what your app does, key features needed, any reference links, or target goals..."
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] text-white focus:border-[#d8ff38] focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                id="submit-brief-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-[#d8ff38] text-[#0a070e] font-mono text-xs font-black uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,255,56,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#0a070e]" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#0a070e]" />
                    <span>SUBMIT PROJECT DETAILS →</span>
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#2f273c]/60 text-[11px] text-[#9c93a8]">
                <span>100% Code Ownership Transferred to You</span>
                <span className="text-[#eadff1] font-semibold">Guaranteed Response Within 24 Hours</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
