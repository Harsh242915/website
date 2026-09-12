export interface ProjectArtifact {
  id: string;
  title: string;
  category: string;
  clientUrl?: string;
  domain?: string;
  imageUrl?: string;
  description: string;
  tags: string[];
  metrics: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  highlightBadge?: string;
  type: 'standard' | 'interactive-slot' | 'interactive-benchmark' | 'interactive-hft';
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
