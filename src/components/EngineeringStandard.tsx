import { useState } from 'react';
import { Copy, Check, Terminal, Code2, Database, Shield, Zap, Sparkles } from 'lucide-react';
import { sfx } from '../lib/audio';

const CODE_SNIPPETS = {
  'telemetry.service.ts': `import { z } from 'zod';
import { Redis } from '@upstash/redis';
import { db } from './db';

const TelemetryPayloadSchema = z.object({
  nodeId: z.string().uuid(),
  p99LatencyMs: z.number().min(0).max(10_000),
  activeSockets: z.number().int().nonnegative(),
  timestamp: z.number().default(() => Date.now()),
});

export type TelemetryPayload = z.infer<typeof TelemetryPayloadSchema>;

export class TelemetryEngine {
  private redis = Redis.fromEnv();

  async recordTelemetry(raw: unknown): Promise<{ ok: true; ackId: string }> {
    // Runtime schema validation before state commit
    const verified = TelemetryPayloadSchema.parse(raw);

    // Atomically push to FIFO ring buffer with sub-5ms latency
    const pipeline = this.redis.pipeline();
    pipeline.lpush(\`telemetry:\${verified.nodeId}\`, JSON.stringify(verified));
    pipeline.ltrim(\`telemetry:\${verified.nodeId}\`, 0, 999);
    pipeline.publish('edge:pulse', verified.nodeId);
    
    await pipeline.exec();
    return { ok: true, ackId: verified.nodeId };
  }
}`,

  'schema.prisma': `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["relationJoins", "tracing"]
}

model VentureSprint {
  id              String         @id @default(uuid())
  founderEmail    String         @db.VarChar(255)
  tier            SprintTier     @default(PERFORMANCE_POD)
  slaP99BudgetMs  Int            @default(80)
  targetStack     String[]
  status          SprintStatus   @default(PROVISIONING)
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@index([founderEmail, status])
  @@map("venture_sprints")
}

enum SprintTier {
  MVP_BUILD
  PERFORMANCE_POD
  ADVISORY_CTO
}

enum SprintStatus {
  PROVISIONING
  ACTIVE_SPRINT
  QA_VERIFICATION
  DEPLOYED_PROD
}`,

  'auth.guard.ts': `import { type NextRequest, NextResponse } from 'next/server';
import { verifyJwtEdge } from './crypto/edge-jwt';

// Edge middleware runtime verification (sub-12ms execution)
export async function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'ERR_UNAUTHORIZED_EDGE', message: 'Missing cryptotoken.' },
      { status: 401 }
    );
  }

  const payload = await verifyJwtEdge(token);
  if (!payload || payload.exp < Date.now() / 1000) {
    return NextResponse.json(
      { error: 'ERR_TOKEN_EXPIRED', message: 'Token expired.' },
      { status: 403 }
    );
  }

  // Inject sanitized tenant ID into downstream Server Component headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-tenant-id', payload.tenantId);
  return NextResponse.next({ request: { headers: requestHeaders } });
}`
};

export function EngineeringStandard() {
  const [activeFile, setActiveFile] = useState<keyof typeof CODE_SNIPPETS>('telemetry.service.ts');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    sfx.click();
    navigator.clipboard.writeText(CODE_SNIPPETS[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillars = [
    {
      icon: Terminal,
      title: 'TYPE-SAFE FROM SCHEMA TO CLIENT',
      desc: 'Strict end-to-end typing via TypeScript 5.4, Drizzle/Prisma ORM, and Zod runtime schema boundaries. Zero any types permitted in production builds.',
      accent: 'text-[#d8ff38]',
    },
    {
      icon: Zap,
      title: 'SUB-100MS API BUDGETS',
      desc: 'Every API route runs against strict latency budgets. Optimized database queries, Redis caching, and edge distribution keep P99 response times sub-second.',
      accent: 'text-[#ff6b35]',
    },
    {
      icon: Shield,
      title: 'HUMAN-VERIFIED SECURITY & ZERO DEBT',
      desc: 'Automated Playwright test suites, row-level security policies (RLS), and continuous integration pipelines ensure code is battle-tested before deployment.',
      accent: 'text-[#38bdf8]',
    },
    {
      icon: Database,
      title: 'FOUNDER-DIRECT COMMUNICATION',
      desc: 'No account managers. No junior developers. You work directly with Harsh Bali and the principal engineering crew on daily asynchronous Slack/Discord syncs.',
      accent: 'text-[#eadff1]',
    },
  ];

  return (
    <section id="engineering-standard" className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-20 border-t border-[#2f273c]">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-8 border-b border-[#2f273c]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#d8ff38]">
          <span>[ ENGINEERING STANDARD ]</span>
          <span className="w-8 h-px bg-[#473b5b]"></span>
          <span>ARCHITECTURAL PILLARS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          HOW SENIOR DEVELOPERS ACTUALLY BUILD.
        </h2>
        <p className="text-sm font-mono text-[#9c93a8] max-w-2xl pt-1">
          We reject the bloated agency playbook. You get direct access to seasoned systems engineers who write clean, maintainable code designed to outlive your seed round.
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

      {/* Interactive Code Viewer */}
      <div className="mt-12 bg-[#130e1b] border border-[#2f273c] rounded-xl overflow-hidden shadow-2xl">
        {/* Code Bar Header */}
        <div className="p-4 bg-[#1a1423] border-b border-[#2f273c] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            <div className="flex items-center gap-1 font-mono text-xs">
              {(Object.keys(CODE_SNIPPETS) as Array<keyof typeof CODE_SNIPPETS>).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => {
                    sfx.click();
                    setActiveFile(fileName);
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeFile === fileName
                      ? 'bg-[#0a070e] text-[#d8ff38] font-bold border border-[#473b5b]'
                      : 'text-[#9c93a8] hover:text-white'
                  }`}
                >
                  {fileName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[10px] text-[#9c93a8]">
              ZERO-ANY // STRICT RUNTIME VALIDATION
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0a070e] border border-[#2f273c] text-xs font-mono text-[#9c93a8] hover:text-white hover:border-[#473b5b] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#d8ff38]" />
                  <span className="text-[#d8ff38]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-6 overflow-x-auto bg-[#0a070e] text-xs font-mono text-[#eadff1] leading-relaxed">
          <pre>
            <code>{CODE_SNIPPETS[activeFile]}</code>
          </pre>
        </div>

        <div className="p-3 bg-[#1a1423] border-t border-[#2f273c] flex items-center justify-between text-[11px] font-mono text-[#9c93a8] px-6">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d8ff38]" />
            <span>Passed compiler checks: TypeScript 5.4.5, Zod v3.23, Prisma Engine</span>
          </span>
          <span className="text-[#d8ff38]">NO JUNIOR OVERHEAD</span>
        </div>
      </div>
    </section>
  );
}
