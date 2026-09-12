import { Terminal, Database, Shield, Zap } from 'lucide-react';

export function EngineeringStandard() {
  const pillars = [
    {
      icon: Terminal,
      title: 'ERROR-FREE, RELIABLE CODE',
      desc: 'We write strict, type-safe code so your application runs smoothly without unexpected crashes or bugs.',
      accent: 'text-[#d8ff38]',
    },
    {
      icon: Zap,
      title: 'LIGHTNING-FAST SPEED',
      desc: 'We optimize every page and database query so your users never get stuck waiting on loading spinners.',
      accent: 'text-[#ff6b35]',
    },
    {
      icon: Shield,
      title: 'SECURITY & USER PRIVACY',
      desc: 'Secure authentication, encrypted credentials, and automated tests ensure your business and customer data stay protected.',
      accent: 'text-[#38bdf8]',
    },
    {
      icon: Database,
      title: 'DIRECT FOUNDER COLLABORATION',
      desc: 'No account managers or confusing handoffs. You work directly with senior software engineers through clear weekly updates.',
      accent: 'text-[#eadff1]',
    },
  ];

  return (
    <section id="engineering-standard" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ QUALITY STANDARDS ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>OUR CORE PILLARS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          HOW WE BUILD SOFTWARE RIGHT.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          We believe in straightforward communication, robust engineering, and clean code that is easy to maintain and grow.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-[#1a1423] border border-[#2f273c] hover:border-[#473b5b] p-6 rounded-xl flex flex-col gap-4 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-[#0a070e] border border-[#2f273c] ${pillar.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-[#9c93a8]">0{idx + 1}</span>
              </div>
              <h3 className="font-display font-bold text-base text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#9c93a8] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
