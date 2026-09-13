import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react';
import {
  ExternalLink,
  RotateCw,
  Play,
  Pause,
  ArrowRight,
  Terminal,
  Sliders,
  Sparkles
} from 'lucide-react';
import { sfx } from '../lib/audio';
import { ProjectArtifact } from '../types';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface WorksSectionProps {
  onOpenArchitecture: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop';
const REEL_SYMBOLS = ['777', 'BAR', 'NEON', 'CYBER', 'JACKPOT', 'GEM', 'BOLT'];

export const ALL_PROJECTS: ProjectArtifact[] = [
  // 1. Jacob's Ladder Cafe & Digital Storefront (Live Preview)
  {
    id: 'jacobs-ladder',
    title: "Jacob's Ladder Cafe & Digital Storefront",
    category: 'Full-Stack Web Application',
    tag: 'fullstack',
    clientUrl: 'https://jacobscafe.netlify.app',
    domain: 'jacobscafe.netlify.app',
    highlightBadge: 'Fast Mobile Ordering',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    description: 'Modern neighborhood cafe ordering website featuring a live kitchen ticket display, customizable drink modifiers, fast mobile checkout, and instant inventory updates.',
    techStack: ['Next.js 14', 'Real-time Database', 'Tailwind CSS', 'Fast Hosting'],
    metrics: [
      'Perfect 100/100 Page Speed Rating',
      'Loads in under 1 second on mobile devices',
      'Live kitchen order updates with zero lag'
    ],
    featuredMetric: {
      label: 'Page Speed',
      val: '100 / 100 Score'
    },
    fullDetails: {
      overview: 'A complete online storefront and ordering platform for a bustling neighborhood cafe. Customers can customize items, place orders, and pay online, while staff receive instant tickets in the kitchen.',
      architecture: [
        'Fast page rendering so menus load instantly without waiting',
        'Live order board that alerts kitchen staff the second an order is placed',
        'Secure checkout process with automatic inventory adjustments'
      ],
      metrics: ['100/100 Page Speed Rating', 'Sub-second mobile loading', 'Instant order synchronization'],
      techStack: ['Next.js', 'Supabase Realtime', 'Tailwind CSS', 'Cloudflare Edge']
    }
  },

  // 2. Landscapes WA — Commercial Architectural Engine (Live Preview)
  {
    id: 'landscapes-wa',
    title: 'Landscapes WA — Project Cost & Proposal Builder',
    category: 'Commercial Business Platform',
    tag: 'fullstack',
    clientUrl: 'https://landscapeswa.netlify.app',
    domain: 'landscapeswa.netlify.app',
    highlightBadge: '+320% Lead Growth',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    description: 'Interactive landscape planning and pricing calculator that allows homeowners and commercial clients to customize project scopes and receive instant price breakdowns.',
    techStack: ['React', 'Database Backend', 'PDF Generator', 'Form Routing'],
    metrics: [
      'Over 3x increase in qualified online customer inquiries',
      'Instant automated proposal downloads for clients',
      'Interactive project scope and timeline calculator'
    ],
    featuredMetric: {
      label: 'Lead Growth',
      val: '+320% Inquiries'
    },
    fullDetails: {
      overview: 'An interactive web app for a high-end landscape architecture company. Prospective clients can adjust square footage and material finishes to see estimated budgets and instantly generate a formal proposal.',
      architecture: [
        'Dynamic estimation engine calculating material, labor, and timeline formulas',
        'Automated document builder creating ready-to-sign proposals for clients',
        'Direct email routing sending qualified project inquiries directly to the team'
      ],
      metrics: ['+320% Lead Generation Surge', 'Instant Proposal Downloads', '100% Mobile Friendly'],
      techStack: ['React', 'PostgreSQL', 'PDF Engine', 'Node.js']
    },
    interactiveType: 'landscape'
  },

  // 3. Jingle Reel — 60FPS HTML5 Slot Game
  {
    id: 'neon-cyber-jackpot',
    title: 'Jingle Reel — Interactive 60FPS Slot Game',
    category: 'Interactive Gaming & Audio Engine',
    tag: 'webgl',
    highlightBadge: 'Live Netlify Demo',
    clientUrl: 'https://celebrated-kangaroo-692f83.netlify.app/',
    imageUrl: '/jingle-reel.jpg',
    description: 'Ultra-smooth interactive 5-reel festive slot game built with Pixi.js WebGL rendering, custom audio engine, real-time balance tracking, and verified fair random math.',
    techStack: ['Pixi.js WebGL', 'WebAudio API', 'HTML5 Canvas', 'TypeScript'],
    metrics: [
      'Silky smooth 60 frames-per-second animation',
      'Fair, tamper-proof random number verification',
      'Built-in procedural audio without heavy file downloads'
    ],
    featuredMetric: {
      label: 'Visual Smoothness',
      val: '60 FPS Ultra-Smooth'
    },
    fullDetails: {
      overview: 'A high-performance browser-based interactive 5-reel slot game demonstrating responsive Pixi.js WebGL graphics, real-time balance tracking, and fair math calculations.',
      architecture: [
        'Hardware-accelerated browser animations for stutter-free 60FPS visuals',
        'Lightweight sound synthesizer generating audio on the fly without large downloads',
        'Direct responsive canvas scaling across desktop and mobile devices'
      ],
      metrics: [
        '60 FPS Smooth Rendering Pass',
        'Instant response time'
      ],
      techStack: ['Pixi.js WebGL', 'HTML5 Canvas', 'WebAudio API', 'TypeScript']
    },
    interactiveType: 'slot'
  },

  // 4. Trading Simulator Engine
  {
    id: 'trading-simulator',
    title: 'Market Trading Simulator & Charting App',
    category: 'FinTech & Real-Time Data',
    tag: 'fintech',
    highlightBadge: 'Real-Time Price Ticks',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    description: 'Real-time stock and cryptocurrency paper trading simulator that streams live market price movements, matches buy/sell orders instantly, and calculates portfolio balances.',
    techStack: ['Node.js', 'Market APIs', 'Fast In-Memory Cache', 'Live Sockets'],
    metrics: [
      'Sub-5 millisecond trade execution speed',
      'Live portfolio profit & loss streaming',
      '100% accurate financial accounting and balance tracking'
    ],
    featuredMetric: {
      label: 'Execution Speed',
      val: '< 5ms Instant'
    },
    fullDetails: {
      overview: 'A simulated trading platform allowing users to practice trading assets with live market streams, automated order matching, and instant portfolio analytics.',
      architecture: [
        'Live data pipeline streaming prices from stock & crypto markets',
        'In-memory calculation layer keeping portfolio numbers updated in real time',
        'Automated trade ledger preventing any calculation discrepancies'
      ],
      metrics: [
        'Sub-5ms order execution simulation',
        'Instant live portfolio streaming',
        'Zero-loss transactional accuracy'
      ],
      techStack: ['Node.js', 'Market Data APIs', 'Redis Cache', 'WebSockets', 'MongoDB']
    },
    interactiveType: 'hft'
  },

  // 5. Decentralized Social Media Platform
  {
    id: 'decentralized-social',
    title: 'High-Capacity Community & Social Platform',
    category: 'Social Networks & Media',
    tag: 'backend',
    highlightBadge: 'Fast Activity Feeds',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description: 'Scalable community web platform designed for fast activity feeds, automated video processing, user notifications, and instant post sharing.',
    techStack: ['NestJS', 'Cloud Storage', 'Background Workers', 'Docker', 'TypeScript'],
    metrics: [
      'Instant post distribution across thousands of user feeds',
      'Automated video conversion and mobile optimization',
      'Spam prevention and duplicate post filtering'
    ],
    featuredMetric: {
      label: 'Feed Speed',
      val: 'Instant Refresh'
    },
    fullDetails: {
      overview: 'A modern social media backend capable of handling high volumes of posts, comments, likes, and media uploads without slowing down during viral traffic spikes.',
      architecture: [
        'Automated background pipeline that compresses and prepares video uploads for smooth playback',
        'Efficient activity feed delivery showing friends new posts instantly',
        'Containerized server infrastructure that scales automatically with user traffic'
      ],
      metrics: [
        'Instant post delivery across user feeds',
        'Automated video transcoding',
        'High-availability server infrastructure'
      ],
      techStack: ['NestJS', 'Redis', 'AWS Cloud Storage', 'Docker', 'TypeScript']
    }
  },

  // 6. Harmony and Help
  {
    id: 'harmony-and-help',
    title: 'Workplace Safety & Incident Compliance System',
    category: 'Enterprise Management Platform',
    tag: 'backend',
    highlightBadge: '99.9% Uptime',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    description: 'Operational compliance and safety management software helping organizations track safety audits, coordinate emergency responses, and manage team permissions.',
    techStack: ['Node.js', 'PostgreSQL', 'Event Queues', 'Docker Containers'],
    metrics: [
      'Reduced audit response time from 20s down to under 1 second',
      '99.9% reliable uptime across production operations',
      'Coordinated workflows across multiple departments'
    ],
    featuredMetric: {
      label: 'Reliability',
      val: '99.9% Uptime'
    },
    fullDetails: {
      overview: 'A critical compliance and workplace safety software platform created for public infrastructure operations, managing regular inspections, audits, and real-time incident reports.',
      architecture: [
        'Reliable background event queues ensuring zero lost reports or delayed safety alerts',
        'Granular user permissions and full audit logging for compliance requirements',
        'High-speed database caching for rapid search across historical records'
      ],
      metrics: [
        '95% reduction in report response latency',
        '99.9% uptime across operations',
        'Full compliance audit trail'
      ],
      techStack: ['Node.js', 'Express', 'Kafka', 'Redis', 'PostgreSQL', 'Docker']
    }
  },

  // 7. Jambeera Marketplace
  {
    id: 'jambeera-marketplace',
    title: 'Jambeera — Live Commerce & Negotiation App',
    category: 'E-Commerce & Live Messaging',
    tag: 'realtime',
    highlightBadge: '10k+ Live Users',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop',
    description: 'Online marketplace platform connecting buyers and sellers in real time with smart item matching, instant live chat, and instant push notifications.',
    techStack: ['Node.js', 'Socket.IO', 'MongoDB', 'Push Notifications'],
    metrics: [
      'Instant message delivery in under 50 milliseconds',
      'Built to support over 10,000 active concurrent users',
      'Smart item recommendation matching buyers with relevant sellers'
    ],
    featuredMetric: {
      label: 'Chat Speed',
      val: '< 50ms Live'
    },
    fullDetails: {
      overview: 'A fast-paced digital marketplace where buyers can browse listings, negotiate prices via live chat rooms, and finalize transactions securely.',
      architecture: [
        'Live messaging rooms allowing instantaneous private negotiation between buyers and sellers',
        'Smart preference matching connecting buyers with the items they care about most',
        'Reliable notification dispatch so sellers never miss a potential customer inquiry'
      ],
      metrics: [
        'Sub-50ms message delivery speed',
        'Supports 10k+ concurrent active connections'
      ],
      techStack: ['Node.js', 'Socket.IO', 'Kafka', 'Redis', 'MongoDB']
    }
  },

  // 8. EazeAccounts
  {
    id: 'eazeaccounts',
    title: 'EazeAccounts — Financial Ledger & Bookkeeping',
    category: 'Financial Software',
    tag: 'fintech',
    highlightBadge: '100% Balanced Ledgers',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    description: 'Corporate double-entry bookkeeping and automated tax reconciliation software ensuring zero accounting errors and instant financial reports.',
    techStack: ['Node.js', 'PostgreSQL', 'Background Tasks', 'TypeScript'],
    metrics: [
      'Large tax reconciliation reports generated in seconds',
      'Zero balance discrepancy across multi-currency accounts',
      'Instant balance sheet and income statement views'
    ],
    featuredMetric: {
      label: 'Accounting Accuracy',
      val: '100% Balanced'
    },
    fullDetails: {
      overview: 'A professional corporate bookkeeping web application that automates transaction logging, bank reconciliations, and tax report generation with strict financial accuracy.',
      architecture: [
        'Double-entry transaction verification ensuring debits and credits always balance',
        'Background report generators capable of processing thousands of invoices without freezing',
        'Fast query caching for instantaneous balance sheet generation'
      ],
      metrics: [
        'Instant financial statement compilation',
        'Zero discrepancy across multiple currencies'
      ],
      techStack: ['Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'TypeScript']
    }
  },

  // 9. MindSpace AI
  {
    id: 'mindspace-ai',
    title: 'MindSpace — Guided Wellness Companion',
    category: 'AI & Smart Applications',
    tag: 'ai',
    highlightBadge: '5,000+ Daily Users',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    description: 'Context-aware mental health and philosophical companion using smart AI to provide thoughtful, personalized emotional guidance and daily reflections.',
    techStack: ['Node.js', 'AI Embeddings', 'Database', 'Streaming Chat'],
    metrics: [
      'Over 5,000 daily active conversational sessions',
      'Over 92% positive sentiment feedback score',
      'Fast, streaming chat responses without long pauses'
    ],
    featuredMetric: {
      label: 'Daily Users',
      val: '5,000+ Active'
    },
    fullDetails: {
      overview: 'An AI-powered conversational application designed to help users reflect, journal, and navigate emotional well-being through guided prompts and ancient philosophical perspectives.',
      architecture: [
        'Smart knowledge search matching user prompts with relevant reflection exercises',
        'Streaming chat interface delivering replies word-by-word with zero awkward delays',
        'Private and secure conversation storage protecting user privacy'
      ],
      metrics: [
        '5,000+ daily conversational sessions',
        '>92% positive sentiment rating'
      ],
      techStack: ['Node.js', 'OpenAI APIs', 'Vector Database', 'MongoDB', 'WebSockets']
    }
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects (9)' },
  { id: 'fullstack', label: 'Live Client Websites' },
  { id: 'webgl', label: 'Interactive 3D & Games' },
  { id: 'fintech', label: 'Finance & Payments' },
  { id: 'backend', label: 'Custom Web Apps' },
  { id: 'realtime', label: 'Live Chat & Messaging' },
  { id: 'ai', label: 'AI & Smart Tools' },
];

export function WorksSection({ onOpenArchitecture }: WorksSectionProps) {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectArtifact | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Drag to Scroll State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  // Toggle state to open inline interactive sandbox widget per card
  const [openInteractiveWidget, setOpenInteractiveWidget] = useState<string | null>(null);

  // --- Slot Machine State ---
  const [slotBalance, setSlotBalance] = useState(4890.00);
  const [slotStatus, setSlotStatus] = useState<'idle' | 'spinning' | 'won'>('idle');
  const [reels, setReels] = useState(['777', 'BAR', 'BAR']);

  const spinSlot = () => {
    if (slotStatus === 'spinning') return;
    sfx.click();
    setSlotStatus('spinning');

    let counter = 0;
    const interval = setInterval(() => {
      sfx.tick();
      setReels([
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
        REEL_SYMBOLS[Math.floor(Math.random() * REEL_SYMBOLS.length)],
      ]);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setReels(['777', '777', '777']);
        setSlotStatus('won');
        setSlotBalance(prev => prev + 250);
        sfx.winChime();
        setTimeout(() => setSlotStatus('idle'), 4000);
      }
    }, 90);
  };

  // --- Landscapes WA Scope Estimator Interactive State ---
  const [scopeSqFt, setScopeSqFt] = useState(3800);
  const calculatedCost = Math.round(scopeSqFt * 380);
  const calculatedWeeks = Math.round(4 + (scopeSqFt / 1000) * 1.2);

  // Filtered projects
  const filteredProjects = ALL_PROJECTS.filter(
    (p) => filter === 'all' || p.tag === filter
  );

  const hasEnoughForAnimation = filteredProjects.length >= 3;
  const shouldAnimate = hasEnoughForAnimation && isAutoPlay;

  // Duplicate list ONLY when there are >= 3 items to create seamless loop
  const displayProjects = hasEnoughForAnimation
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : filteredProjects;

  // --- 60 FPS Continuous Right-to-Left Animation Engine ---
  useEffect(() => {
    if (!shouldAnimate) return;

    let animId: number;

    const tick = () => {
      if (carouselRef.current && !isHovered && !isDragging) {
        const el = carouselRef.current;
        el.scrollLeft += 1.2; // smooth continuous right-to-left glide

        // When scrolled past 1/3 of the duplicated content, reset cleanly
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [shouldAnimate, isHovered, isDragging]);

  // Mouse Drag to Scroll Handlers (Desktop Friendly)
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current || !hasEnoughForAnimation) return;
    setIsDragging(true);
    setDragStartX(e.pageX - carouselRef.current.offsetLeft);
    setDragStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current || !hasEnoughForAnimation) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.5;
    carouselRef.current.scrollLeft = dragStartScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="works" className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2f273c]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
            <span>[ OUR PORTFOLIO ]</span>
            <span className="w-8 h-px bg-[#473b5b]"></span>
            <span>FEATURED CLIENT WORK</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            EXPLORE OUR WORK.
          </h2>
        </div>
        
        <div className="flex flex-col md:items-end gap-2">
          <p className="text-sm font-mono text-[#9c93a8] max-w-md md:text-right">
            Browse live websites, digital platforms, and custom software engineered by Launchdrift.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-4 pt-6 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs scrollbar-none w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sfx.click();
                setFilter(cat.id);
                if (carouselRef.current) {
                  carouselRef.current.scrollLeft = 0;
                }
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all border cursor-pointer ${
                filter === cat.id
                  ? 'bg-[#d8ff38] text-[#0a070e] font-bold border-[#d8ff38] shadow-[0_0_15px_rgba(216,255,56,0.2)]'
                  : 'bg-[#1a1423] text-[#9c93a8] border-[#2f273c] hover:border-[#473b5b] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTINUOUS AUTO-ANIMATING 60FPS CAROUSEL CONTAINER (DRAGGABLE & SWIPEABLE) */}
      {/* ========================================================================= */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className={`flex gap-6 overflow-x-auto py-6 scrollbar-none transition-all select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProjects.map((project, index) => {
          const isWidgetOpen = openInteractiveWidget === `${project.id}-${index}`;
          return (
            <article
              key={`${project.id}-${index}`}
              className="w-[85vw] sm:w-[460px] lg:w-[480px] shrink-0 bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38]/70 transition-all duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 group hover:shadow-[0_0_30px_rgba(216,255,56,0.08)] hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                {/* Card Header & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#d8ff38] uppercase font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#d8ff38]" />
                    {project.category}
                  </span>
                  {project.highlightBadge && (
                    <span className="px-2.5 py-0.5 rounded bg-[#0a070e] text-[#ff6b35] font-mono text-[10px] uppercase font-bold border border-[#2f273c]">
                      {project.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Visual Media Preview Image (Clean with NO Mirror/Shade Overlays) */}
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#2f273c] bg-[#0a070e] relative group-hover:border-[#473b5b] transition-all group/img">
                  <img
                    alt={project.title}
                    src={project.imageUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Featured Metric Chip */}
                  {project.featuredMetric && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#0a070e]/95 border border-[#2f273c] font-mono text-[10px] text-[#d8ff38] shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#d8ff38]" />
                      <span>{project.featuredMetric.label}:</span>
                      <strong className="text-white">{project.featuredMetric.val}</strong>
                    </div>
                  )}

                  {/* Interactive Sandbox Mini-Widget Toggle (For slot, landscape) */}
                  {project.interactiveType && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sfx.click();
                        setOpenInteractiveWidget(isWidgetOpen ? null : `${project.id}-${index}`);
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#1a1423]/95 border border-[#d8ff38]/60 text-[#d8ff38] font-mono text-[10px] font-bold flex items-center gap-1 hover:bg-[#d8ff38] hover:text-[#0a070e] transition-all shadow-md cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{isWidgetOpen ? 'Hide Sandbox' : 'Live Sandbox'}</span>
                    </button>
                  )}
                </div>

                {/* Optional Expandable Live Interactive Widget */}
                {isWidgetOpen && project.interactiveType === 'slot' && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#d8ff38]/50 bg-[#0a070e] p-3.5 flex flex-col gap-2.5 font-mono text-xs animate-fadeIn shadow-lg">
                    <div className="grid grid-cols-3 gap-2">
                      {reels.map((symbol, i) => (
                        <div
                          key={i}
                          className={`h-11 rounded-lg bg-[#130e1b] border flex items-center justify-center font-display font-black text-sm transition-all ${
                            slotStatus === 'won'
                              ? 'border-[#d8ff38] text-[#d8ff38] shadow-[0_0_10px_rgba(216,255,56,0.3)] animate-pulse'
                              : slotStatus === 'spinning'
                              ? 'border-[#ff6b35] text-[#ff6b35]'
                              : 'border-[#2f273c] text-white'
                          }`}
                        >
                          {symbol}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#2f273c]">
                      <span className="text-[10px] text-[#9c93a8]">DEMO CREDITS: <strong className="text-[#d8ff38]">${slotBalance.toFixed(2)}</strong></span>
                      <button
                        disabled={slotStatus === 'spinning'}
                        onClick={spinSlot}
                        className="px-2.5 py-1 rounded bg-[#d8ff38] text-[#0a070e] font-bold text-[10px] uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className={`w-3 h-3 ${slotStatus === 'spinning' ? 'animate-spin' : ''}`} />
                        <span>{slotStatus === 'spinning' ? 'Spinning...' : 'Spin Demo'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {isWidgetOpen && project.interactiveType === 'landscape' && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#d8ff38]/50 bg-[#0a070e] p-3.5 flex flex-col gap-2 font-mono text-xs animate-fadeIn shadow-lg">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#9c93a8]">ESTIMATED AREA: {scopeSqFt.toLocaleString()} sq ft</span>
                      <span className="text-[#d8ff38] font-bold">${calculatedCost.toLocaleString()} EST.</span>
                    </div>
                    <input
                      type="range"
                      min="1500"
                      max="8000"
                      step="250"
                      value={scopeSqFt}
                      onChange={(e) => { sfx.tick(); setScopeSqFt(Number(e.target.value)); }}
                      className="w-full accent-[#d8ff38] cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[10px] text-[#9c93a8]">
                      <span>Timeline: <strong className="text-white">~{calculatedWeeks} Weeks</strong></span>
                      <span className="text-[#ff6b35] font-bold">Interactive Calculator</span>
                    </div>
                  </div>
                )}

                {/* Title & Domain */}
                <div className="flex flex-col gap-1 pt-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#d8ff38] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.domain && (
                    <span className="font-mono text-xs text-[#ff6b35] font-semibold">{project.domain}</span>
                  )}
                </div>

                {/* Description in Layman Terms */}
                <p className="text-sm text-[#9c93a8] leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-[#2f273c]/70 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => {
                    sfx.click();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-[#d8ff38] hover:underline font-semibold cursor-pointer"
                >
                  <span>Read Project Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.clientUrl && (
                    <a
                      className="inline-flex items-center gap-1 text-white hover:text-[#d8ff38] transition-colors"
                      href={project.clientUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      onClick={() => sfx.click()}
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2f273c]/50 font-mono text-xs text-[#9c93a8]">
        <div className="flex items-center gap-2">
          <span>PORTFOLIO: <strong className="text-white">{filteredProjects.length} Projects</strong></span>
          <span className="text-[#473b5b]">|</span>
          <span className="text-[#d8ff38]">Launchdrift Software Studio</span>
        </div>
        <div className="text-[11px] text-[#9c93a8]">
          Click any project card to read full breakdown
        </div>
      </div>

      {/* In-depth Project Breakdown Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenArchitecture={onOpenArchitecture}
      />
    </section>
  );
}
