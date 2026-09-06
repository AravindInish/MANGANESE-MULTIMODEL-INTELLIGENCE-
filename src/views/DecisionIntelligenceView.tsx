import React, { useState } from 'react';
import { RECOMMENDED_ACTIONS, EXECUTIVE_KPIS } from '../data/miningData';
import { RecommendedAction } from '../types';
import {
  Cpu,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Check,
  Flame,
  Wrench,
  Compass,
  FileCheck
} from 'lucide-react';

export const DecisionIntelligenceView: React.FC = () => {
  const [actions, setActions] = useState<RecommendedAction[]>(RECOMMENDED_ACTIONS);
  const [deployedAlert, setDeployedAlert] = useState(false);

  const toggleActionStatus = (id: string) => {
    setActions(prev =>
      prev.map(act => {
        if (act.id === id) {
          const nextStatus = act.status === 'APPROVED' ? 'IN_PROGRESS' : act.status === 'IN_PROGRESS' ? 'PENDING' : 'APPROVED';
          return { ...act, status: nextStatus };
        }
        return act;
      })
    );
  };

  const handleDeployPlan = () => {
    setDeployedAlert(true);
    setTimeout(() => setDeployedAlert(false), 4000);
  };

  return (
    <div id="mmi-decision-intelligence-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              CORE SYNTHESIS ENGINE
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              MULTI-MODEL OPTIMIZATION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Decision Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Converting multi-model intelligence into actionable mining decisions.
          </p>
        </div>

        <button
          onClick={handleDeployPlan}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-amber-500/20"
        >
          <Zap className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>DEPLOY OPTIMIZATION PLAN</span>
        </button>
      </div>

      {deployedAlert && (
        <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">OPTIMIZATION PLAN DISPATCHED TO MOIL MINE MANAGEMENT:</span>
            <span>Equipment re-allocation & Block A01/A07 stoping prioritized.</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">Telemetry Active</span>
        </div>
      )}

      {/* FOUR CONNECTED CARDS PIPELINE */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center justify-between">
          <span>MULTI-MODEL CONVERGENCE PIPELINE</span>
          <span className="text-amber-400 font-normal text-[11px]">Real-Time Data Synthesis</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 relative">
          {/* Card 1: Model 1 */}
          <div className="w-full lg:flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl relative">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">MODEL 1</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">PROSPECTIVITY</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-emerald-400">87%</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                HIGH
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Spatial Bayesian Network</div>
          </div>

          {/* Arrow */}
          <div className="text-slate-600 hidden lg:block">
            <ArrowRight className="w-5 h-5 text-amber-500/70" />
          </div>
          <div className="text-slate-600 block lg:hidden my-1">
            <ArrowDown className="w-5 h-5 text-amber-500/70" />
          </div>

          {/* Card 2: Model 2 */}
          <div className="w-full lg:flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl relative">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">MODEL 2</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">RESERVE</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-cyan-300">320K T</span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                VIABLE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">3D Geostatistical Kriging</div>
          </div>

          {/* Arrow */}
          <div className="text-slate-600 hidden lg:block">
            <ArrowRight className="w-5 h-5 text-amber-500/70" />
          </div>
          <div className="text-slate-600 block lg:hidden my-1">
            <ArrowDown className="w-5 h-5 text-amber-500/70" />
          </div>

          {/* Card 3: Model 3 */}
          <div className="w-full lg:flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl relative">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase">MODEL 3</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">PRODUCTION</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-amber-300">103K T</span>
              <span className="text-xs font-mono text-slate-400">Target: 120K</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Temporal Fusion Transformer</div>
          </div>

          {/* Arrow */}
          <div className="text-slate-600 hidden lg:block">
            <ArrowRight className="w-5 h-5 text-amber-500/70" />
          </div>
          <div className="text-slate-600 block lg:hidden my-1">
            <ArrowDown className="w-5 h-5 text-amber-500/70" />
          </div>

          {/* Card 4: Model 4 */}
          <div className="w-full lg:flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl relative">
            <div className="text-[10px] font-mono font-bold text-rose-400 uppercase">MODEL 4</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">SHORTFALL</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-rose-400">78%</span>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                HIGH RISK
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Extreme Gradient Boosting</div>
          </div>

          {/* Arrow */}
          <div className="text-slate-600 hidden lg:block">
            <ArrowRight className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-slate-600 block lg:hidden my-1">
            <ArrowDown className="w-5 h-5 text-amber-500" />
          </div>

          {/* DECISION ENGINE FINAL OUTPUT */}
          <div className="w-full lg:flex-1 bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-500/60 p-4 rounded-xl relative shadow-lg shadow-amber-500/10">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
              <span>DECISION ENGINE</span>
              <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">FINAL DECISION</div>
            <div className="mt-2">
              <div className="text-lg font-black font-mono text-amber-300 leading-tight">
                ACTION REQUIRED
              </div>
              <div className="text-[11px] font-mono font-bold text-rose-400 mt-0.5">
                HIGH PRIORITY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LARGE PROFESSIONAL DECISION CARD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4 mb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            PRESCRIPTIVE AI DECISION SYNTHESIS
          </div>
          <h2 className="text-xl font-black text-slate-100 mt-1">
            Decision: "Production optimization required."
          </h2>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">
            CORE REASONING:
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            "Strong manganese prospectivity and reserve availability are present, but the production forecast remains below the required target. Operational constraints increase the probability of a production shortfall."
          </p>
        </div>

        {/* RECOMMENDED MINING ACTIONS LIST */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200 font-sans uppercase tracking-wider">
              Recommended Mining Actions (Ranked by Operational Priority)
            </h3>
            <span className="text-xs font-mono text-slate-400">Click status to toggle execution</span>
          </div>

          <div className="space-y-3">
            {actions.map(action => (
              <div
                key={action.id}
                className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 rounded-xl p-4 transition shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        action.priority === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {action.priority} PRIORITY
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{action.title}</h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {action.estimatedImpact}
                    </span>

                    <button
                      onClick={() => toggleActionStatus(action.id)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold transition border ${
                        action.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : action.status === 'IN_PROGRESS'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {action.status.replace('_', ' ')}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-2 pt-2 border-t border-slate-850">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Reason: </span>
                    <span className="text-slate-300">{action.reason}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase">Expected Objective: </span>
                    <span className="text-slate-300 font-medium">{action.expectedObjective}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
