export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectArtifact {
  id: string | number;
  title: string;
  category: string;
  tag: 'all' | 'backend' | 'realtime' | 'fintech' | 'ai' | 'fullstack' | 'webgl';
  clientUrl?: string;
  domain?: string;
  imageUrl?: string;
  description: string;
  techStack: string[];
  metrics: string[];
  featuredMetric?: {
    label: string;
    val: string;
  };
  highlightBadge?: string;
  accentColor?: string;
  fullDetails?: {
    overview: string;
    architecture: string[];
    metrics: string[];
    techStack: string[];
  };
  interactiveType?: 'slot' | 'benchmark' | 'hft' | 'landscape';
}

export interface ArchitectureNode {
  id: string;
  title: string;
  role: string;
  tech: string;
  latencyTarget: string;
  details: string[];
}

export interface QuoteFormState {
  founderName: string;
  workEmail: string;
  projectType: string;
  targetTimeline: string;
  specs: string;
}
