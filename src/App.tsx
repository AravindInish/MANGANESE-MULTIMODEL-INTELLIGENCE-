/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from './types';
import { MINES_DATA, MINING_BLOCKS } from './data/miningData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

// Views
import { DashboardView } from './views/DashboardView';
import { ProspectivityView } from './views/ProspectivityView';
import { ReserveEstimationView } from './views/ReserveEstimationView';
import { ProductionForecastView } from './views/ProductionForecastView';
import { ShortfallRiskView } from './views/ShortfallRiskView';
import { DecisionIntelligenceView } from './views/DecisionIntelligenceView';
import { SatelliteIntelligenceView } from './views/SatelliteIntelligenceView';
import { MineAnalysisView } from './views/MineAnalysisView';
import { ReportsView } from './views/ReportsView';
import { ModelStatusView } from './views/ModelStatusView';
import { DataSourcesView } from './views/DataSourcesView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedMineId, setSelectedMineId] = useState<string>(MINES_DATA[0]?.id || 'moil-balaghat');
  const [selectedBlockId, setSelectedBlockId] = useState<string>(MINING_BLOCKS[0]?.id || 'BLOCK A01');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Filter blocks by selected mine, fallback to all blocks if none found
  const currentMineBlocks = React.useMemo(() => {
    const filtered = MINING_BLOCKS.filter(b => b.mineId === selectedMineId);
    return filtered.length > 0 ? filtered : MINING_BLOCKS;
  }, [selectedMineId]);

  // Handle mine change
  const handleSelectMine = (mineId: string) => {
    setSelectedMineId(mineId);
    const mineBlocks = MINING_BLOCKS.filter(b => b.mineId === mineId);
    if (mineBlocks.length > 0) {
      setSelectedBlockId(mineBlocks[0].id);
    } else if (MINING_BLOCKS.length > 0) {
      setSelectedBlockId(MINING_BLOCKS[0].id);
    }
  };

  // Handle block change
  const handleSelectBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    const block = MINING_BLOCKS.find(b => b.id === blockId);
    if (block && block.mineId !== selectedMineId) {
      setSelectedMineId(block.mineId);
    }
  };

  // Navigate to new analysis view
  const handleOpenNewAnalysis = () => {
    setCurrentPage('mine-analysis');
  };

  // Navigate to report view
  const handleOpenReport = () => {
    setCurrentPage('reports');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0B] text-[#E2E8F0] font-sans antialiased">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={page => {
          setCurrentPage(page);
          setIsMobileMenuOpen(false);
        }}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden bg-[#0A0A0B]">
        {/* Top Navigation Bar */}
        <TopBar
          mines={MINES_DATA}
          selectedMineId={selectedMineId}
          onSelectMine={handleSelectMine}
          blocks={currentMineBlocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={handleSelectBlock}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigateToDecision={() => setCurrentPage('decision-intelligence')}
        />

        {/* Scrollable Viewport */}
        <main
          id="mmi-main-viewport"
          className="flex-1 overflow-y-auto px-4 md:px-6 pt-5 pb-10 custom-scrollbar bg-[#0A0A0B]"
        >
          <div className="max-w-7xl mx-auto">
            {currentPage === 'dashboard' && (
              <DashboardView
                mines={MINES_DATA}
                blocks={currentMineBlocks}
                selectedMineId={selectedMineId}
                onSelectMine={handleSelectMine}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
                onNavigate={setCurrentPage}
                onOpenNewAnalysis={handleOpenNewAnalysis}
                onOpenReport={handleOpenReport}
              />
            )}

            {currentPage === 'prospectivity' && (
              <ProspectivityView
                blocks={currentMineBlocks}
                mines={MINES_DATA}
                selectedMineId={selectedMineId}
                onSelectMine={handleSelectMine}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
              />
            )}

            {currentPage === 'reserve-estimation' && (
              <ReserveEstimationView
                blocks={currentMineBlocks}
                mines={MINES_DATA}
                selectedMineId={selectedMineId}
                onSelectMine={handleSelectMine}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
              />
            )}

            {currentPage === 'production-forecast' && (
              <ProductionForecastView />
            )}

            {currentPage === 'shortfall-risk' && (
              <ShortfallRiskView />
            )}

            {currentPage === 'decision-intelligence' && (
              <DecisionIntelligenceView />
            )}

            {currentPage === 'satellite-intelligence' && (
              <SatelliteIntelligenceView
                blocks={currentMineBlocks}
                mines={MINES_DATA}
                selectedMineId={selectedMineId}
                onSelectMine={handleSelectMine}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
              />
            )}

            {currentPage === 'mine-analysis' && (
              <MineAnalysisView
                onApplyAnalysisToDashboard={() => setCurrentPage('dashboard')}
              />
            )}

            {currentPage === 'reports' && (
              <ReportsView />
            )}

            {currentPage === 'model-status' && (
              <ModelStatusView />
            )}

            {currentPage === 'data-sources' && (
              <DataSourcesView />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
