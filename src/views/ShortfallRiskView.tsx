import React, { useState } from 'react';
import { RISK_DRIVERS, EXECUTIVE_KPIS } from '../data/miningData';
import {
  AlertTriangle,
  Flame,
  Wrench,
  Gauge,
  CloudRain,
  Bomb,
  Layers,
  ArrowRight,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export const ShortfallRiskView: React.FC = () => {
  // Interactive what-if simulation sliders
  const [equipmentAvailabilityImprovement, setEquipmentAvailabilityImprovement] = useState(0); // 0 - 100%
  const [blastingOptimization, setBlastingOptimization] = useState(0); // 0 - 100%
  const [drainagePreparedness, setDrainagePreparedness] = useState(0); // 0 - 100%

  // Compute simulated reduced shortfall
  const reductionFromEquipment = (equipmentAvailabilityImprovement / 100) * 22; // up to 22% drop
  const reductionFromBlasting = (blastingOptimization / 100) * 10; // up to 10% drop
  const reductionFromWeather = (drainagePreparedness / 100) * 12; // up to 12% drop
  const totalReduction = Math.round(reductionFromEquipment + reductionFromBlasting + reductionFromWeather);

  const dynamicShortfallProbability = Math.max(25, 78 - totalReduction);
  const dynamicRecoveredTonnes = Math.round((totalReduction / 78) * 17000);

  return (
    <div id="mmi-shortfall-risk-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              MODEL 04 &bull; EXTREME GRADIENT BOOSTING (XGBOOST) + SHAP
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              STOCHASTIC OPERATIONAL BOTTLENECK ANALYSIS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Production Shortfall Risk
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Probabilistic quantification of production shortfall drivers under stochastic equipment, blasting, and climatic shocks.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          ILLUSTRATIVE DEMO DATA
        </div>
      </div>

      {/* Main Shortfall Probability Feature Card */}
      <div className="bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Big Metric */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-6">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>SHORTFALL PROBABILITY</span>
            </div>

            <div className="mt-3 flex items-baseline space-x-3">
              <span className="text-6xl font-black font-mono text-rose-400 tracking-tight">
                {dynamicShortfallProbability}%
              </span>
              <span className="text-sm font-mono font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {dynamicShortfallProbability > 60 ? 'HIGH RISK' : dynamicShortfallProbability > 40 ? 'MODERATE RISK' : 'LOW RISK'}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Without active operational intervention, the current extraction rate will fail the annual MOIL production target of 120,000 Tonnes.
            </p>
          </div>

          {/* Three Gap Figures */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] uppercase text-slate-400 tracking-wider">Target Production</div>
              <div className="text-2xl font-black text-slate-100 mt-1">120,000 T</div>
              <div className="text-[10px] text-slate-500 mt-1">FY 2026-27 Quota</div>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] uppercase text-amber-400 tracking-wider">Expected Production</div>
              <div className="text-2xl font-black text-amber-300 mt-1">
                {(103000 + dynamicRecoveredTonnes).toLocaleString()} T
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Model 03 Expected Value</div>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-rose-900/50">
              <div className="text-[10px] uppercase text-rose-400 tracking-wider">Projected Shortfall</div>
              <div className="text-2xl font-black text-rose-400 mt-1">
                {Math.max(0, 17000 - dynamicRecoveredTonnes).toLocaleString()} T
              </div>
              <div className="text-[10px] text-rose-400/80 mt-1">Deficit at Year End</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Drivers Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 font-sans">
              Root Risk Drivers (SHAP Value Attribution)
            </h2>
            <p className="text-xs text-slate-400">
              Percentage breakdown of factors leading to the projected 17,000 T shortfall.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">Model 04 XGBoost Feature Importance</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {RISK_DRIVERS.map((driver, idx) => (
            <div
              key={driver.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">#{idx + 1} DRIVER</span>
                  <span className="text-base font-mono font-black text-rose-400">
                    {driver.percentage}%
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-200 mt-2">{driver.name}</div>
                <div className="text-xs font-mono text-amber-300 mt-0.5">
                  -{driver.impactTonnes.toLocaleString()} T impact
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {driver.description}
                </p>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full"
                  style={{ width: `${(driver.percentage / 35) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive What-If Mitigation Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100 font-sans">
              Interactive What-If Mitigation Simulator
            </h3>
          </div>
          <div className="text-xs font-mono text-cyan-400">
            Recovered Deficit: <span className="font-bold">+{dynamicRecoveredTonnes.toLocaleString()} T</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Equipment Availability */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">Fleet Availability Optimization</span>
              <span className="font-mono text-amber-400 font-bold">{equipmentAvailabilityImprovement}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={equipmentAvailabilityImprovement}
              onChange={e => setEquipmentAvailabilityImprovement(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 mt-2">
              Pre-staging LHD spares and shaft hoist speed recovery.
            </div>
          </div>

          {/* Slider 2: Blasting Optimization */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">Blasting & Gas Clearance Speed</span>
              <span className="font-mono text-cyan-400 font-bold">{blastingOptimization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blastingOptimization}
              onChange={e => setBlastingOptimization(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 mt-2">
              Automated telemetry & electronic detonator timing.
            </div>
          </div>

          {/* Slider 3: Weather & Drainage */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">Monsoon Drainage Preparedness</span>
              <span className="font-mono text-teal-400 font-bold">{drainagePreparedness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={drainagePreparedness}
              onChange={e => setDrainagePreparedness(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 mt-2">
              High-head pumps & sump pre-dewatering before storm peaks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
