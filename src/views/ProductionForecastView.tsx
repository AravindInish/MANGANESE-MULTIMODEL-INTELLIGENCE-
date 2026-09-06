import React, { useState } from 'react';
import { MONTHLY_PRODUCTION_DATA, EXECUTIVE_KPIS } from '../data/miningData';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  Clock,
  Target,
  BarChart3,
  Calendar,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ProductionForecastView: React.FC = () => {
  const [horizonFilter, setHorizonFilter] = useState<'3M' | '6M' | '12M'>('12M');

  // Filter data according to selected horizon
  const displayData = React.useMemo(() => {
    if (horizonFilter === '3M') {
      return MONTHLY_PRODUCTION_DATA.slice(5, 10);
    }
    if (horizonFilter === '6M') {
      return MONTHLY_PRODUCTION_DATA.slice(3, 13);
    }
    return MONTHLY_PRODUCTION_DATA;
  }, [horizonFilter]);

  return (
    <div id="mmi-production-forecast-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              MODEL 03 &bull; TEMPORAL FUSION TRANSFORMER (TFT)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              ROLLING MULTI-HORIZON EXTRACTION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Manganese Production Forecast
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Predictive stope haulage, shift-level muck throughput, and seasonal monsoon dip modeling.
          </p>
        </div>

        {/* Time Horizon Filter Buttons */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
          {(['3M', '6M', '12M'] as const).map(horizon => (
            <button
              key={horizon}
              onClick={() => setHorizonFilter(horizon)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition ${
                horizonFilter === horizon
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {horizon === '3M' ? '3 MONTH' : horizon === '6M' ? '6 MONTH' : '12 MONTH'}
            </button>
          ))}
        </div>
      </div>

      {/* Four Main KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Current Production */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            CURRENT PRODUCTION
          </div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-3xl font-black font-mono text-slate-100">
              {EXECUTIVE_KPIS.currentMonthlyProduction.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">T / MONTH</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active Run Rate (Sep 2026)</div>
        </div>

        {/* KPI 2: Annual Target */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            ANNUAL TARGET
          </div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-3xl font-black font-mono text-slate-100">
              {EXECUTIVE_KPIS.annualTarget.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">T</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">MOIL Mandated Extraction Quota</div>
        </div>

        {/* KPI 3: 12-Month Forecast */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            12-MONTH FORECAST
          </div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-3xl font-black font-mono text-amber-300">
              {EXECUTIVE_KPIS.production12Month.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">T</span>
          </div>
          <div className="text-[11px] text-amber-400/80 mt-1">Simulated ML Rolling Cumulative</div>
        </div>

        {/* KPI 4: Projected Gap */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
            PROJECTED GAP
          </div>
          <div className="mt-1 flex items-baseline space-x-1">
            <span className="text-3xl font-black font-mono text-rose-400">
              {EXECUTIVE_KPIS.projectedGap.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">T</span>
          </div>
          <div className="text-[11px] text-rose-400/80 mt-1">Shortfall Deficit to Mitigate</div>
        </div>
      </div>

      {/* Professional Line Chart: Historical vs Forecast vs Target */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Production Trajectory vs Annual Target Benchmark
            </h2>
            <p className="text-xs text-slate-400">
              Includes 90% confidence interval band for forward-looking forecast months
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 bg-cyan-400"></span>
              <span className="text-slate-300">Historical Actuals</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 bg-amber-400"></span>
              <span className="text-amber-300">ML Forecast</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-0.5 bg-rose-500 border-dashed"></span>
              <span className="text-rose-400">Target (10,000 T/mo)</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={displayData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[5000, 12000]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d15', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                formatter={(val: any, name: string) => [
                  `${val?.toLocaleString()} T`,
                  name === 'historical' ? 'Historical Actual' : name === 'forecast' ? 'AI Forecast' : name
                ]}
              />

              {/* Confidence Interval Band */}
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stroke="none"
                fill="#f59e0b"
                fillOpacity={0.12}
                name="Upper Bound"
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stroke="none"
                fill="#0b0f17"
                fillOpacity={0.8}
                name="Lower Bound"
              />

              {/* Target Line */}
              <Line
                type="monotone"
                dataKey="target"
                stroke="#f43f5e"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Monthly Target"
              />

              {/* Historical Actual Line */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4, fill: '#38bdf8' }}
                activeDot={{ r: 6 }}
                name="Historical"
              />

              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4, fill: '#f59e0b' }}
                activeDot={{ r: 6 }}
                name="AI Forecast"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Capacity, Confidence, and Target Achievement Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Forecast Confidence</div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
              {EXECUTIVE_KPIS.forecastConfidence}%
            </div>
            <div className="text-[11px] text-slate-400">Based on 120-month backtest</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold">
            93.2%
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Production Capacity</div>
            <div className="text-2xl font-black font-mono text-slate-100 mt-0.5">
              {EXECUTIVE_KPIS.productionCapacity.toLocaleString()} T
            </div>
            <div className="text-[11px] text-slate-400">Theoretical Monthly Ceiling</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold">
            MAX
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">Target Achievement</div>
            <div className="text-2xl font-black font-mono text-amber-300 mt-0.5">
              85.8%
            </div>
            <div className="text-[11px] text-slate-400">14.2% short without intervention</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold">
            GAP
          </div>
        </div>
      </div>
    </div>
  );
};
