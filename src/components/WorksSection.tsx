import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Play,
  Pause,
  ArrowRight,
  Terminal,
  Activity,
  Sliders,
  Sparkles
} from 'lucide-react';
import { sfx } from '../lib/audio';
import { ProjectArtifact } from '../types';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface WorksSectionProps {
  onOpenArchitecture: () => void;
}

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
    imageUrl: 'https://images.unsplash.com/photo-1558904541-efa8c19682e7?q=80&w=1200&auto=format&fit=crop',
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

  // 3. Neon Cyber Jackpot — 60FPS WebGL Game Engine
  {
    id: 'neon-cyber-jackpot',
    title: 'Neon Cyber Jackpot — Interactive 3D Game',
    category: 'Interactive 3D & Audio',
    tag: 'webgl',
    highlightBadge: 'Silky 60 FPS',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    description: 'Ultra-smooth interactive slot game built directly in the browser with lively visual animations, dynamic sound effects, and verified fair random number logic.',
    techStack: ['3D Web Graphics', 'Fast Backend', 'Live WebSockets', 'Browser Audio'],
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
      overview: 'A high-performance browser-based interactive game prototype demonstrating responsive graphics, real-time balance tracking, and fair math calculations.',
      architecture: [
        'Hardware-accelerated browser animations for stutter-free visuals',
        'Lightweight sound synthesizer generating audio on the fly without large file downloads',
        'Secure server-side spin verification'
      ],
      metrics: [
        '60 FPS Smooth Rendering Pass',
        'Instant response time'
      ],
      techStack: ['Three.js', 'FastAPI', 'WebSockets', 'WebAudio API']
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
    imageUrl: 'https://res.cloudinary.com/dfpmkus1i/image/upload/v1750510926/Screenshot_2025-06-21_183123_np00fe.png',
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
    imageUrl: 'https://play-lh.googleusercontent.com/pvFaO3WzNzIYDQFpLiXu5WnoPnydI4aU5-XV7xYg_fUpFLZQylmZsdq0Dhjry11MofQ=w1052-h592-rw',
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
    imageUrl: 'https://res.cloudinary.com/dfpmkus1i/image/upload/v1750512204/Screenshot_2025-06-21_185303_anrzsz.png',
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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

  // --- HFT Simulator Live Ticks ---
  const [btcPrice, setBtcPrice] = useState(46892.45);
  const [priceChange, setPriceChange] = useState('+1.34%');
  const [lastMatchLatency, setLastMatchLatency] = useState('3.8ms');

  useEffect(() => {
    const timer = setInterval(() => {
      const delta = (Math.random() - 0.49) * 14;
      setBtcPrice(prev => +(prev + delta).toFixed(2));
      setPriceChange(delta >= 0 ? `+${(1.3 + Math.random() * 0.1).toFixed(2)}%` : `-${(0.2 + Math.random() * 0.1).toFixed(2)}%`);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateOrder = () => {
    sfx.click();
    setLastMatchLatency((Math.random() * 2 + 2.1).toFixed(1) + 'ms');
  };

  // --- Landscapes WA Scope Estimator Interactive State ---
  const [scopeSqFt, setScopeSqFt] = useState(3800);
  const [finishTier] = useState<'Standard' | 'Architectural' | 'Ultra-Luxury'>('Architectural');
  const calculatedCost = Math.round(scopeSqFt * (finishTier === 'Standard' ? 240 : finishTier === 'Architectural' ? 380 : 560));
  const calculatedWeeks = Math.round(4 + (scopeSqFt / 1000) * (finishTier === 'Standard' ? 0.8 : finishTier === 'Architectural' ? 1.2 : 1.6));

  // Filtered projects
  const filteredProjects = ALL_PROJECTS.filter(
    (p) => filter === 'all' || p.tag === filter
  );

  // Calculate active index from scroll
  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);

    // Approximate active card
    const cardWidth = 500;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(filteredProjects.length - 1, Math.max(0, idx)));
  }, [filteredProjects.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons, { passive: true });
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, [updateScrollButtons, filteredProjects]);

  const handleScroll = (direction: 'left' | 'right') => {
    sfx.click();
    if (!carouselRef.current) return;
    const scrollAmount = 520;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 20) {
      // Loop back to beginning
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProjectIndex = (index: number) => {
    sfx.click();
    if (!carouselRef.current) return;
    const scrollAmount = 520;
    carouselRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth'
    });
  };

  // --- Smooth Auto-Carousel Animation Engine ---
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 30;

      if (isAtEnd) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: 480, behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered]);

  return (
    <section id="works" className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2f273c]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
            <span>[ OUR PORTFOLIO ]</span>
            <span className="w-8 h-px bg-[#473b5b]"></span>
            <span>LIVE PROJECTS &amp; APPS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            EXPLORE OUR WORK.
          </h2>
        </div>
        <div className="flex flex-col md:items-end gap-3">
          <p className="text-sm font-mono text-[#9c93a8] max-w-md md:text-right">
            Browse live websites, digital platforms, and custom software engineered by Launchdrift.
          </p>
          
          {/* Animated Carousel Controls & Auto-slide Badge */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => {
                sfx.click();
                setIsAutoPlay(!isAutoPlay);
              }}
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isAutoPlay
                  ? 'bg-[#d8ff38]/10 border-[#d8ff38] text-[#d8ff38] shadow-[0_0_15px_rgba(216,255,56,0.15)]'
                  : 'bg-[#1a1423] border-[#2f273c] text-[#9c93a8] hover:text-white'
              }`}
              title="Toggle automatic carousel sliding"
            >
              {isAutoPlay ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff38] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d8ff38]"></span>
                  </span>
                  <span>Auto-Sliding Active</span>
                  <Pause className="w-3 h-3 ml-1" />
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#d8ff38]" />
                  <span>Resume Auto-Slide</span>
                </>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-lg bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38] text-white disabled:opacity-30 disabled:hover:border-[#2f273c] transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-2.5 rounded-lg bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38] text-white transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs scrollbar-none w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sfx.click();
                setFilter(cat.id);
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
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

      {/* Scroll Progress Bar */}
      <div className="w-full bg-[#1a1423] h-1 rounded-full overflow-hidden mt-4">
        <div
          className="bg-[#d8ff38] h-full transition-all duration-300"
          style={{ width: `${Math.max(10, scrollProgress)}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* ANIMATING / SCROLLABLE CAROUSEL CONTAINER                                 */}
      {/* ========================================================================= */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
        className="flex gap-6 overflow-x-auto py-8 scroll-smooth snap-x snap-mandatory scrollbar-none transition-all"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project, index) => {
          const isWidgetOpen = openInteractiveWidget === project.id;
          return (
            <article
              key={project.id}
              className="w-[88vw] sm:w-[480px] lg:w-[520px] shrink-0 snap-start bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38]/60 transition-all duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 group hover:shadow-[0_0_35px_rgba(216,255,56,0.08)] hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                {/* Card Header & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#d8ff38] uppercase font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    {project.category}
                  </span>
                  {project.highlightBadge && (
                    <span className="px-2.5 py-0.5 rounded bg-[#0a070e] text-[#ff6b35] font-mono text-[10px] uppercase font-bold border border-[#2f273c]">
                      {project.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Visual Media Preview Image (For EVERY Project) */}
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#2f273c] bg-[#0a070e] relative group-hover:border-[#473b5b] transition-all group/img">
                  <img
                    alt={project.title}
                    src={project.imageUrl}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a070e] via-transparent to-transparent opacity-80" />

                  {/* Featured Metric Overlay */}
                  {project.featuredMetric && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#0a070e]/90 backdrop-blur-md border border-[#2f273c] font-mono text-[10px] text-[#d8ff38] shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#d8ff38]" />
                      <span>{project.featuredMetric.label}:</span>
                      <strong className="text-white">{project.featuredMetric.val}</strong>
                    </div>
                  )}

                  {/* Interactive Mini-Widget Toggle (For slot, landscape, hft) */}
                  {project.interactiveType && (
                    <button
                      onClick={() => {
                        sfx.click();
                        setOpenInteractiveWidget(isWidgetOpen ? null : project.id);
                      }}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#1a1423]/90 backdrop-blur-md border border-[#d8ff38]/60 text-[#d8ff38] font-mono text-[10px] font-bold flex items-center gap-1 hover:bg-[#d8ff38] hover:text-[#0a070e] transition-all shadow-md cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{isWidgetOpen ? 'Hide Sandbox' : 'Try Live Sandbox'}</span>
                    </button>
                  )}
                </div>

                {/* Optional Expandable Live Interactive Widget */}
                {isWidgetOpen && project.interactiveType === 'slot' && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#d8ff38]/50 bg-[#0a070e] p-4 flex flex-col gap-3 font-mono text-xs animate-fadeIn shadow-lg">
                    <div className="grid grid-cols-3 gap-2">
                      {reels.map((symbol, i) => (
                        <div
                          key={i}
                          className={`h-12 rounded-lg bg-[#130e1b] border flex items-center justify-center font-display font-black text-sm transition-all ${
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
                        className="px-3 py-1 rounded bg-[#d8ff38] text-[#0a070e] font-bold text-[10px] uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className={`w-3 h-3 ${slotStatus === 'spinning' ? 'animate-spin' : ''}`} />
                        <span>{slotStatus === 'spinning' ? 'Spinning...' : 'Spin Simulation'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {isWidgetOpen && project.interactiveType === 'landscape' && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#d8ff38]/50 bg-[#0a070e] p-4 flex flex-col gap-2.5 font-mono text-xs animate-fadeIn shadow-lg">
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
                      <span>Estimated Timeline: <strong className="text-white">~{calculatedWeeks} Weeks</strong></span>
                      <span className="text-[#ff6b35] font-bold">Interactive Calculator</span>
                    </div>
                  </div>
                )}

                {isWidgetOpen && project.interactiveType === 'hft' && (
                  <div className="w-full rounded-xl overflow-hidden border border-[#d8ff38]/50 bg-[#0a070e] p-4 flex flex-col gap-2 font-mono text-xs animate-fadeIn shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#d8ff38] animate-ping" />
                        <span className="text-white font-bold">BTC: ${btcPrice.toLocaleString()}</span>
                      </div>
                      <span className="text-[#d8ff38] font-bold">{priceChange}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#2f273c]">
                      <span className="text-[10px] text-[#9c93a8]">Execution Latency: <strong className="text-[#ff6b35]">&lt; {lastMatchLatency}</strong></span>
                      <button
                        onClick={handleSimulateOrder}
                        className="px-2.5 py-1 rounded bg-[#241d30] text-[#d8ff38] text-[10px] font-bold uppercase hover:bg-[#30273f] cursor-pointer"
                      >
                        Test Instant Order
                      </button>
                    </div>
                  </div>
                )}

                {/* Title & Domain */}
                <div className="flex flex-col gap-1 pt-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#d8ff38] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.domain && (
                    <span className="font-mono text-xs text-[#ff6b35]">{project.domain}</span>
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

      {/* Interactive Pagination Dots & Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2f273c]/50 font-mono text-xs text-[#9c93a8]">
        <div className="flex items-center gap-2">
          <span>SHOWING: <strong className="text-white">{filteredProjects.length} Projects</strong></span>
          <span className="text-[#473b5b]">|</span>
          <span className="text-[#d8ff38]">Hover to pause • Swipe or click to slide</span>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {filteredProjects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => scrollToProjectIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-[#d8ff38]'
                  : 'w-2 bg-[#2f273c] hover:bg-[#473b5b]'
              }`}
              aria-label={`Jump to project ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Bottom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className="p-2 rounded-lg bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38] text-white disabled:opacity-30 transition-all cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-lg bg-[#1a1423] border border-[#2f273c] hover:border-[#d8ff38] text-white transition-all cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
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
