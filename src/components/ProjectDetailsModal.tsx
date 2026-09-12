import { X, ExternalLink, CheckCircle2, Cpu, Activity, Layers, Terminal } from 'lucide-react';
import { ProjectArtifact } from '../types';
import { sfx } from '../lib/audio';

interface ProjectDetailsModalProps {
  project: ProjectArtifact | null;
  onClose: () => void;
  onOpenArchitecture: () => void;
}

export function ProjectDetailsModal({ project, onClose, onOpenArchitecture }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-[#130e1b] border border-[#d8ff38]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(216,255,56,0.15)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2f273c] bg-[#1a1423] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#d8ff38]/10 text-[#d8ff38] border border-[#d8ff38]/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#d8ff38] uppercase font-bold">[ {project.category} ]</span>
                {project.highlightBadge && (
                  <span className="px-2 py-0.5 rounded bg-[#0a070e] text-[#ff6b35] font-mono text-[10px] uppercase font-bold border border-[#2f273c]">
                    {project.highlightBadge}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {project.title}
              </h3>
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-sans text-sm">
          {/* Cover image if available */}
          {project.imageUrl && (
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-[#2f273c] bg-[#0a070e] relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a070e] via-transparent to-transparent opacity-80" />
            </div>
          )}

          {/* Overview */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs text-[#d8ff38] uppercase flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              PROJECT OVERVIEW &amp; GOAL
            </h4>
            <p className="text-[#9c93a8] leading-relaxed">
              {project.fullDetails?.overview || project.description}
            </p>
          </div>

          {/* How It Works */}
          {project.fullDetails?.architecture && project.fullDetails.architecture.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#d8ff38] uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                HOW WE BUILT IT
              </h4>
              <div className="space-y-2">
                {project.fullDetails.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#0a070e] border border-[#2f273c] flex items-start gap-3 font-mono text-xs text-[#eadff1]"
                  >
                    <span className="text-[#d8ff38] font-bold">0{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance & Business Results */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-[#d8ff38] uppercase flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                RESULTS &amp; PERFORMANCE
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#1a1423] border border-[#2f273c] flex items-center gap-2.5 font-mono text-xs text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#d8ff38] shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2 pt-2">
            <h4 className="font-mono text-xs text-[#9c93a8] uppercase">CORE TECHNOLOGIES USED</h4>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-[#0a070e] border border-[#2f273c] text-[#eadff1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#2f273c] bg-[#1a1423] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#9c93a8]">
            <span>ENGINEERED BY:</span>
            <strong className="text-white">Launchdrift Studio</strong>
          </div>
          <div className="flex items-center gap-3">
            {project.clientUrl && (
              <a
                href={project.clientUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="px-4 py-2 rounded-lg bg-[#d8ff38] text-[#0a070e] font-bold flex items-center gap-1.5 hover:brightness-110 transition-all"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
