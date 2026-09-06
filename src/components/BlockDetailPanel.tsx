import React from 'react';
import { MiningBlock } from '../types';
import {
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface BlockDetailPanelProps {
  selectedBlock: MiningBlock;
  onAnalyzeBlock: (blockId: string) => void;
  onSelectBlock: (blockId: string) => void;
  allBlocks: MiningBlock[];
}

export const BlockDetailPanel: React.FC<BlockDetailPanelProps> = ({
  selectedBlock,
  onAnalyzeBlock,
  onSelectBlock,
  allBlocks
}) => {
  if (!selectedBlock) {
    return (
      <div
        id="mmi-selected-block-panel"
        className="bg-[#16161D] border border-white/5 rounded-2xl p-6 text-center text-white/50 text-xs shadow-xl"
      >
        Select a mining block to inspect geotechnical and reserve details.
      </div>
    );
  }

  return (
    <div
      id="mmi-selected-block-panel"
      className="bg-[#16161D] border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/30">
              GEOSPATIAL SELECTION
            </div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 mt-0.5">
              <span className="text-amber-500 font-mono">{selectedBlock.id}</span>
              <span className="text-xs text-white/40 font-normal">({selectedBlock.name})</span>
            </h3>
          </div>

          <div className="flex items-center space-x-1.5">
            <span
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                selectedBlock.productionPriority === 'HIGH'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {selectedBlock.productionPriority} PRIORITY
            </span>
          </div>
        </div>

        {/* Quick Block Switcher Pill List */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 mb-3">
          {allBlocks.map(b => (
            <button
              key={b.id}
              onClick={() => onSelectBlock(b.id)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded whitespace-nowrap transition border ${
                b.id === selectedBlock.id
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold'
                  : 'bg-white/5 text-white/40 border-white/5 hover:text-white'
              }`}
            >
              {b.id.replace('BLOCK ', '')}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {/* Prospectivity */}
          <div className="bg-[#111114] p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Prospectivity</div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-lg font-bold font-mono text-amber-500">{selectedBlock.prospectivity}%</span>
              <span className="text-[9px] font-bold text-emerald-400">({selectedBlock.classification})</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${selectedBlock.prospectivity}%` }}
              />
            </div>
          </div>

          {/* Viable Reserve */}
          <div className="bg-[#111114] p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Estimated Reserve</div>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-white">
                {(selectedBlock.estimatedReserve / 1000).toFixed(0)}k
              </span>
              <span className="text-[10px] text-white/40">T ({selectedBlock.viableReserve.toLocaleString()} T Viable)</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full"
                style={{ width: `${(selectedBlock.viableReserve / selectedBlock.estimatedReserve) * 100}%` }}
              />
            </div>
          </div>

          {/* Grade */}
          <div className="bg-[#111114] p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Predicted Grade</div>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-lg font-bold font-mono text-white">{selectedBlock.predictedGrade}%</span>
              <span className="text-[10px] text-white/40">Mn</span>
            </div>
            <div className="text-[10px] text-white/40 mt-1 truncate">Rock: {selectedBlock.rockType}</div>
          </div>

          {/* Risk */}
          <div className="bg-[#111114] p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">Shortfall Risk</div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span
                className={`text-lg font-bold font-mono ${
                  selectedBlock.riskLevel === 'HIGH' ? 'text-red-400' : 'text-amber-400'
                }`}
              >
                {selectedBlock.riskLevel}
              </span>
              <span className="text-[10px] text-white/40 font-mono">({selectedBlock.shortfallContribution}%)</span>
            </div>
            <div className="text-[10px] text-white/40 mt-1">Depth: {selectedBlock.depth}m</div>
          </div>
        </div>

        {/* Geological & Economic Specs */}
        <div className="bg-[#111114] p-2.5 rounded-xl border border-white/5 mb-3 text-xs space-y-1 font-mono">
          <div className="flex justify-between text-white/40">
            <span>Status:</span>
            <span className="text-white font-semibold">{selectedBlock.status.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between text-white/40">
            <span>Economic Viability:</span>
            <span className="text-emerald-400 font-semibold">{selectedBlock.economicViability}%</span>
          </div>
          <div className="flex justify-between text-white/40">
            <span>Coordinates:</span>
            <span className="text-white/70">
              {selectedBlock.center[0].toFixed(3)}°N, {selectedBlock.center[1].toFixed(3)}°E
            </span>
          </div>
        </div>

        {/* Decision / Recommended Action Box */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-[10px] font-bold text-amber-500 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Decision Output</span>
            </h4>
            <span className="text-[9px] bg-amber-500 text-black font-black px-1.5 py-0.2 rounded">
              ACTION
            </span>
          </div>
          <p className="text-[11px] font-semibold text-white mb-1 leading-snug">
            {selectedBlock.recommendedAction}
          </p>
          <p className="text-[10px] text-white/50 italic leading-tight">
            "Priority grade extraction aligned with MOIL 12-month delivery mandate."
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        id="mmi-analyze-block-btn"
        onClick={() => onAnalyzeBlock(selectedBlock.id)}
        className="w-full py-2 bg-amber-500 text-black text-[10px] font-black rounded uppercase tracking-wider hover:bg-amber-400 transition shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center justify-center space-x-2"
      >
        <span>EXERCISE ACTION</span>
        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
};
