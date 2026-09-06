import React, { useState, useMemo } from 'react';
import { MiningBlock, MineLocation } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import {
  Layers,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Download,
  Crosshair,
  Info
} from 'lucide-react';

interface ProspectivityViewProps {
  blocks: MiningBlock[];
  mines: MineLocation[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

export const ProspectivityView: React.FC<ProspectivityViewProps> = ({
  blocks,
  mines,
  selectedMineId,
  onSelectMine,
  selectedBlockId,
  onSelectBlock
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [minProspectivity, setMinProspectivity] = useState<number>(0);
  const [minGrade, setMinGrade] = useState<number>(0);
  const [sortField, setSortField] = useState<'id' | 'prospectivity' | 'predictedGrade' | 'depth'>('prospectivity');
  const [sortAsc, setSortAsc] = useState(false);

  // Filtered blocks list
  const filteredBlocks = useMemo(() => {
    return blocks
      .filter(b => {
        if (searchQuery && !b.id.toLowerCase().includes(searchQuery.toLowerCase()) && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        if (priorityFilter !== 'ALL' && b.productionPriority !== priorityFilter) {
          return false;
        }
        if (b.prospectivity < minProspectivity) {
          return false;
        }
        if (b.predictedGrade < minGrade) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [blocks, searchQuery, priorityFilter, minProspectivity, minGrade, sortField, sortAsc]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div id="mmi-prospectivity-view" className="space-y-6 pb-12">
      {/* Header with Model 1 Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              MODEL 01 &bull; SPATIAL BAYESIAN AI
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              EXPLORATION TARGETING
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Manganese Prospectivity Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Geospatial probability estimation fusing multispectral space reflectance, aeromagnetic surveys, and core assays.
          </p>
        </div>

        {/* Model 1 Metric Pills */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Prospectivity Score
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400">87%</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Classification
            </div>
            <div className="text-2xl font-black font-mono text-amber-300">HIGH</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Confidence
            </div>
            <div className="text-2xl font-black font-mono text-cyan-400">89%</div>
          </div>
        </div>
      </div>

      {/* Large Real-World Interactive Map */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-100">Prospectivity Heatmap & Exploration Targets</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
              SIMULATED AI ANALYSIS
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Selected: <span className="text-amber-400 font-bold">{selectedBlockId}</span>
          </div>
        </div>

        <InteractiveMap
          blocks={blocks}
          mines={mines}
          selectedBlockId={selectedBlockId}
          onSelectBlock={onSelectBlock}
          selectedMineId={selectedMineId}
          onSelectMine={onSelectMine}
          height="480px"
          activeAnalysisLayers={{
            mineLocations: true,
            miningBlocks: true,
            prospectivity: true,
            reserveZones: true,
            riskZones: false
          }}
        />
      </div>

      {/* Exploration Targets & Prospectivity Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Block Filtering & Exploration Controls
            </h3>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Block ID..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High Priority Only</option>
                <option value="MEDIUM">Medium Priority Only</option>
                <option value="LOW">Low Priority Only</option>
              </select>
            </div>

            {/* Min Prospectivity */}
            <div>
              <select
                value={minProspectivity}
                onChange={e => setMinProspectivity(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="0">All Prospectivities</option>
                <option value="60">&gt; 60% Prospectivity</option>
                <option value="80">&gt; 80% High Prospectivity</option>
                <option value="90">&gt; 90% Ultra High</option>
              </select>
            </div>

            {/* Min Grade */}
            <div>
              <select
                value={minGrade}
                onChange={e => setMinGrade(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="0">All Ore Grades</option>
                <option value="35">&gt; 35% Mn (Standard)</option>
                <option value="42">&gt; 42% Mn (High Grade)</option>
                <option value="45">&gt; 45% Mn (Metallurgical)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BLOCK PROSPECTIVITY TABLE */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="px-4 py-3 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Block ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Coordinates (Lat, Lng)</th>
                <th
                  onClick={() => handleSort('prospectivity')}
                  className="px-4 py-3 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Prospectivity</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('predictedGrade')}
                  className="px-4 py-3 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Grade (% Mn)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Potential</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/50 font-sans">
              {filteredBlocks.map(block => {
                const isSelected = block.id === selectedBlockId;
                return (
                  <tr
                    key={block.id}
                    onClick={() => onSelectBlock(block.id)}
                    className={`hover:bg-slate-800/60 transition cursor-pointer ${
                      isSelected ? 'bg-amber-500/10 border-l-4 border-amber-400' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-100 flex items-center space-x-2">
                      <span className={isSelected ? 'text-amber-400' : 'text-slate-200'}>
                        {block.id}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                      {block.center[0].toFixed(4)}°N, {block.center[1].toFixed(4)}°E
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                      {block.prospectivity}%
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-300">
                      {block.predictedGrade}%
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          block.classification === 'HIGH'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : block.classification === 'MEDIUM'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {block.classification} POTENTIAL
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          block.productionPriority === 'HIGH'
                            ? 'bg-emerald-950 text-emerald-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {block.productionPriority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectBlock(block.id);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-[11px] transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
