import React from 'react';
import {
  MineLocation,
  MiningBlock,
  PageId
} from '../types';
import { EXECUTIVE_KPIS, MINING_BLOCKS } from '../data/miningData';
import { InteractiveMap } from '../components/InteractiveMap';
import { BlockDetailPanel } from '../components/BlockDetailPanel';
import {
  ArrowRight
} from 'lucide-react';

interface DashboardViewProps {
  mines: MineLocation[];
  blocks: MiningBlock[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
  onNavigate: (page: PageId) => void;
  onOpenNewAnalysis: () => void;
  onOpenReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  mines,
  blocks,
  selectedMineId,
  onSelectMine,
  selectedBlockId,
  onSelectBlock,
  onNavigate,
  onOpenNewAnalysis,
  onOpenReport
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || blocks[0] || MINING_BLOCKS[0];

  return (
    <div id="mmi-dashboard-view" className="flex flex-col gap-5 pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Manganese Mining Intelligence
          </h2>
          <p className="text-sm text-white/40">
            Centralized AI command center for reserve assessment and shortfall prevention
          </p>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="dashboard-generate-report-btn"
            onClick={onOpenReport}
            className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-semibold rounded text-white hover:bg-white/10 transition-all uppercase tracking-wider"
          >
            GENERATE REPORT
          </button>
          <button
            id="dashboard-new-analysis-btn"
            onClick={onOpenNewAnalysis}
            className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] uppercase tracking-wider"
          >
            + NEW ANALYSIS
          </button>
        </div>
      </div>

      {/* EXECUTIVE KPI CARDS (Six Columns matching Sleek Interface) */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Prospectivity */}
        <div
          onClick={() => onNavigate('prospectivity')}
          className="p-3 bg-[#16161D] border border-white/5 rounded-lg cursor-pointer hover:border-white/20 transition group"
        >
          <p className="text-[9px] text-white/40 uppercase mb-1 font-mono tracking-wider">Prospectivity</p>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-amber-500 font-mono">
              {EXECUTIVE_KPIS.prospectivity}%
            </span>
            <span className="text-[10px] px-1 bg-green-500/20 text-green-400 font-bold rounded font-mono">
              HIGH
            </span>
          </div>
        </div>

        {/* Card 2: Estimated Reserve */}
        <div
          onClick={() => onNavigate('reserve-estimation')}
          className="p-3 bg-[#16161D] border border-white/5 rounded-lg cursor-pointer hover:border-white/20 transition group"
        >
          <p className="text-[9px] text-white/40 uppercase mb-1 font-mono tracking-wider">Est. Reserve</p>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white font-mono">
              450k<span className="text-sm font-normal text-white/40 font-mono"> T</span>
            </span>
          </div>
        </div>

        {/* Card 3: Viable Ore */}
        <div
          onClick={() => onNavigate('reserve-estimation')}
          className="p-3 bg-[#16161D] border border-white/5 rounded-lg cursor-pointer hover:border-white/20 transition group"
        >
          <p className="text-[9px] text-white/40 uppercase mb-1 font-mono tracking-wider">Viable Ore</p>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white font-mono">
              320k<span className="text-sm font-normal text-white/40 font-mono"> T</span>
            </span>
          </div>
        </div>

        {/* Card 4: 12M Forecast */}
        <div
          onClick={() => onNavigate('production-forecast')}
          className="p-3 bg-[#16161D] border border-white/5 rounded-lg cursor-pointer hover:border-white/20 transition group"
        >
          <p className="text-[9px] text-white/40 uppercase mb-1 font-mono tracking-wider">12M Forecast</p>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white font-mono">
              103k<span className="text-sm font-normal text-white/40 font-mono"> T</span>
            </span>
          </div>
        </div>

        {/* Card 5: Shortfall Risk */}
        <div
          onClick={() => onNavigate('shortfall-risk')}
          className="p-3 bg-[#16161D] border border-white/10 rounded-lg ring-1 ring-amber-500/30 cursor-pointer hover:ring-amber-500/60 transition group"
        >
          <p className="text-[9px] text-amber-500 uppercase font-bold mb-1 font-mono tracking-wider">Shortfall Risk</p>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-red-500 font-mono">78%</span>
            <span className="text-[10px] px-1 bg-red-500/20 text-red-400 font-bold rounded font-mono">
              CRITICAL
            </span>
          </div>
        </div>

        {/* Card 6: Overall Status */}
        <div
          onClick={() => onNavigate('decision-intelligence')}
          className="p-3 bg-amber-500 rounded-lg flex flex-col justify-center text-black cursor-pointer hover:bg-amber-400 transition shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <p className="text-[9px] font-black uppercase opacity-60 font-mono">Overall Status</p>
          <span className="text-[10px] font-black font-mono tracking-wide">ACTION REQUIRED</span>
        </div>
      </section>

      {/* Main Grid: Interactive Map + Side Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Real-World Leaflet Map */}
        <div className="lg:col-span-8 flex flex-col bg-[#111114] border border-white/5 rounded-2xl overflow-hidden p-3 relative">
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-white/5 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Geospatial Mine Command Map
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                MOIL Balaghat &bull; 21.875° N, 80.185° E
              </span>
            </div>
            <div className="text-[10px] text-amber-400 font-mono font-medium">
              Satellite Sync Active
            </div>
          </div>

          <InteractiveMap
            blocks={blocks}
            mines={mines}
            selectedBlockId={selectedBlockId}
            onSelectBlock={onSelectBlock}
            selectedMineId={selectedMineId}
            onSelectMine={onSelectMine}
            height="500px"
            onBlockActionClick={() => onNavigate('prospectivity')}
          />
        </div>

        {/* Selected Mining Block Decision Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <BlockDetailPanel
            selectedBlock={selectedBlock}
            onAnalyzeBlock={() => onNavigate('decision-intelligence')}
            onSelectBlock={onSelectBlock}
            allBlocks={blocks}
          />

          {/* Model Pipeline Status Box */}
          <div className="bg-[#16161D] border border-white/5 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 border-b border-white/5 pb-2 font-mono">
              Model Pipeline Status
            </h3>
            <div className="space-y-2.5">
              <div
                onClick={() => onNavigate('prospectivity')}
                className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
              >
                <span className="text-[10px] text-white/60">M1: Prospectivity Prediction</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <div
                onClick={() => onNavigate('reserve-estimation')}
                className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
              >
                <span className="text-[10px] text-white/60">M2: Reserve Estimation</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <div
                onClick={() => onNavigate('production-forecast')}
                className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
              >
                <span className="text-[10px] text-white/60">M3: Production Forecast</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <div
                onClick={() => onNavigate('shortfall-risk')}
                className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
              >
                <span className="text-[10px] text-white/60">M4: Shortfall Risk</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tray: Sleek Production Forecast & Risk Driver Contribution Footer */}
      <footer className="bg-[#111114] border border-white/5 rounded-2xl flex flex-col md:flex-row p-4 gap-6 overflow-hidden">
        {/* Left: Production Forecast 12-Month Sparkline Bars */}
        <div
          onClick={() => onNavigate('production-forecast')}
          className="flex-1 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-wider group-hover:text-amber-400 transition">
              Production Forecast (12 Months)
            </h4>
            <span className="text-[10px] font-mono text-white/30">Target: 120K T</span>
          </div>
          <div className="h-16 flex items-end gap-1.5">
            <div className="w-4 bg-white/10 h-[60%] rounded-t-xs hover:bg-white/20 transition"></div>
            <div className="w-4 bg-white/10 h-[65%] rounded-t-xs hover:bg-white/20 transition"></div>
            <div className="w-4 bg-white/10 h-[58%] rounded-t-xs hover:bg-white/20 transition"></div>
            <div className="w-4 bg-amber-500/20 h-[70%] rounded-t-xs hover:bg-amber-500/40 transition"></div>
            <div className="w-4 bg-amber-500/40 h-[72%] rounded-t-xs hover:bg-amber-500/60 transition"></div>
            <div className="w-4 bg-amber-500/60 h-[75%] rounded-t-xs hover:bg-amber-500/80 transition"></div>
            <div className="w-4 bg-amber-500 h-[80%] rounded-t-xs hover:bg-amber-400 transition"></div>
            <div className="w-4 bg-amber-500 h-[60%] border-t-2 border-red-500 rounded-t-xs hover:bg-amber-400 transition"></div>
            <div className="w-4 bg-amber-500 h-[45%] border-t-2 border-red-500 rounded-t-xs hover:bg-amber-400 transition"></div>
            <div className="w-4 bg-amber-500 h-[40%] border-t-2 border-red-500 rounded-t-xs hover:bg-amber-400 transition"></div>
            <div className="w-4 bg-amber-500 h-[38%] border-t-2 border-red-500 rounded-t-xs hover:bg-amber-400 transition"></div>
            <div className="w-4 bg-amber-500 h-[35%] border-t-2 border-red-500 rounded-t-xs hover:bg-amber-400 transition"></div>
          </div>
        </div>

        <div className="hidden md:block w-px bg-white/5"></div>

        {/* Center: Risk Driver Contribution */}
        <div
          onClick={() => onNavigate('shortfall-risk')}
          className="flex-1 cursor-pointer group"
        >
          <h4 className="text-[10px] font-bold text-white/40 uppercase mb-3 font-mono tracking-wider group-hover:text-red-400 transition">
            Risk Driver Contribution
          </h4>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                <span>Equipment Downtime</span>
                <span className="font-mono text-red-400 font-bold">32%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[32%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                <span>Production Capacity</span>
                <span className="font-mono text-amber-400 font-bold">27%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[27%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px bg-white/5"></div>

        {/* Right: Prototype Analytics Summary */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[9px] text-white/40 mb-1 font-mono uppercase tracking-widest">
            PROTOTYPE ANALYTICS &bull; SIH26009
          </p>
          <p className="text-xs text-white leading-relaxed font-sans">
            Model 04 Risk Assessment calibrated for MOIL Balaghat. Projected annual deficit:{' '}
            <span className="text-red-400 font-bold font-mono">17,000 T</span> under baseline stope sequencing.
          </p>
          <button
            onClick={() => onNavigate('decision-intelligence')}
            className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono font-semibold"
          >
            <span>Run Mitigation Decision Sequence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
