import React from 'react';
import { MiningBlock, MineLocation } from '../types';
import {
  GRADE_DISTRIBUTION_DATA,
  VIABILITY_DONUT_DATA,
  BLOCK_RESERVE_COMPARISON,
  EXECUTIVE_KPIS,
  MINING_BLOCKS
} from '../data/miningData';
import { InteractiveMap } from '../components/InteractiveMap';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Database,
  TrendingUp,
  Percent,
  CheckCircle,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';

interface ReserveEstimationViewProps {
  blocks: MiningBlock[];
  mines: MineLocation[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

export const ReserveEstimationView: React.FC<ReserveEstimationViewProps> = ({
  blocks,
  mines,
  selectedMineId,
  onSelectMine,
  selectedBlockId,
  onSelectBlock
}) => {
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || blocks[0] || MINING_BLOCKS[0];

  const PIE_COLORS = ['#10b981', '#64748b'];

  return (
    <div id="mmi-reserve-estimation-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              MODEL 02 &bull; 3D GEOSTATISTICAL TRANSFORMER
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              UNFC CRIRSCO COMPLIANT
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Manganese Reserve Estimation
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Geostatistical indicator kriging and continuous 3D block modeling with economic cut-off thresholds.
          </p>
        </div>
      </div>

      {/* Five KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">TOTAL RESERVE</div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-2xl font-black font-mono text-slate-100">450,000</span>
            <span className="text-xs font-mono text-slate-400">T</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Measured + Indicated</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">VIABLE RESERVE</div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-2xl font-black font-mono text-teal-400">320,000</span>
            <span className="text-xs font-mono text-slate-400">T</span>
          </div>
          <div className="text-[10px] text-teal-400/80 mt-1">Economically Extractable</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">AVERAGE GRADE</div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-2xl font-black font-mono text-amber-300">42.7%</span>
            <span className="text-xs font-mono text-slate-400">Mn</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">High Ferromanganese Class</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">HIGH-GRADE BLOCKS</div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-2xl font-black font-mono text-emerald-400">18</span>
            <span className="text-xs font-mono text-slate-400">/ 24</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">&gt;40% Ore Concentration</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">ECONOMIC VIABILITY</div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-2xl font-black font-mono text-cyan-400">81%</span>
            <span className="text-xs font-mono text-slate-400">Index</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Stripping & Processing NPV</div>
        </div>
      </div>

      {/* Real-World Map + Reserve Block Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-slate-100">Reserve Delineation Map</h2>
            <span className="text-xs font-mono text-slate-400">
              Click block to inspect measured tonnage
            </span>
          </div>

          <InteractiveMap
            blocks={blocks}
            mines={mines}
            selectedBlockId={selectedBlockId}
            onSelectBlock={onSelectBlock}
            selectedMineId={selectedMineId}
            onSelectMine={onSelectMine}
            height="420px"
            activeAnalysisLayers={{
              mineLocations: true,
              miningBlocks: true,
              prospectivity: false,
              reserveZones: true,
              riskZones: false
            }}
          />
        </div>

        {/* Selected Block Reserve Detail Card */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="mb-2">
            <h2 className="text-base font-bold text-slate-100">Block Reserve Profile</h2>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-base font-mono font-bold text-amber-400">{selectedBlock.id}</span>
                <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  {selectedBlock.rockType}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Estimated In-Situ Tonnage</div>
                  <div className="text-xl font-bold text-slate-100">
                    {selectedBlock.estimatedReserve.toLocaleString()} T
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-teal-400 uppercase">Economically Viable Tonnage</div>
                  <div className="text-xl font-bold text-teal-400">
                    {selectedBlock.viableReserve.toLocaleString()} T
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Ore Grade</div>
                    <div className="text-base font-bold text-amber-300">{selectedBlock.predictedGrade}% Mn</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400">Cut-off Depth</div>
                    <div className="text-base font-bold text-slate-200">{selectedBlock.depth} m</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Extraction Viability:</span>
                  <span className="text-emerald-400 font-bold">{selectedBlock.economicViability}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              UNFC Classification: <span className="text-slate-200 font-mono font-semibold">111 (Proved Mineral Reserve)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid: Reserve Distribution, Grade Distribution, Viable vs Non-Viable, Block Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Chart 1: Grade Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
            Grade Distribution (Ore Quality Spectrum)
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Tonnage distributed across manganese concentration bands</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GRADE_DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="grade" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d15', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val: any) => [`${val.toLocaleString()} T`, 'Tonnage']}
                />
                <Bar dataKey="tonnage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Viable vs Non-Viable */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold mb-1">
            Viability Breakdown (Economic Cut-off)
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Ratio of profitable ore vs sub-economic marginal reserve</p>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={VIABILITY_DONUT_DATA}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {VIABILITY_DONUT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d15', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val: any) => [`${val.toLocaleString()} T`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Block Reserve Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg md:col-span-2 lg:col-span-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
            Block Reserve Comparison
          </div>
          <p className="text-[11px] text-slate-400 mb-3">Estimated vs Viable tonnage across blocks</p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BLOCK_RESERVE_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="block" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090d15', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="estimated" fill="#475569" name="Estimated" radius={[3, 3, 0, 0]} />
                <Bar dataKey="viable" fill="#14b8a6" name="Viable" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
