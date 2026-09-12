/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorksSection } from './components/WorksSection';
import { EngineeringStandard } from './components/EngineeringStandard';
import { LaunchProtocol } from './components/LaunchProtocol';
import { EngagementModels } from './components/EngagementModels';
import { QuoteIntake } from './components/QuoteIntake';
import { Footer } from './components/Footer';
import { ArchitectureModal } from './components/ArchitectureModal';

export default function App() {
  const [architectureModalOpen, setArchitectureModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('High-Scale Performance Pod (3–5 Weeks)');
  const [selectedSpecs, setSelectedSpecs] = useState<string>('');

  const handleSelectTier = (tierName: string, specs?: string) => {
    setSelectedTier(tierName);
    if (specs) {
      setSelectedSpecs(specs);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a12] text-[#eadff1] font-sans selection:bg-[#d8ff38] selection:text-[#0a070e] flex flex-col relative overflow-x-hidden">
      {/* Primary Sticky Header */}
      <Navbar onOpenArchitecture={() => setArchitectureModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <Hero onOpenArchitecture={() => setArchitectureModalOpen(true)} />
        <WorksSection onOpenArchitecture={() => setArchitectureModalOpen(true)} />
        <EngineeringStandard />
        <LaunchProtocol />
        <EngagementModels onSelectTier={handleSelectTier} />
        <QuoteIntake initialTier={selectedTier} initialSpecs={selectedSpecs} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Architecture Blueprint Modal */}
      <ArchitectureModal
        isOpen={architectureModalOpen}
        onClose={() => setArchitectureModalOpen(false)}
      />
    </div>
  );
}

