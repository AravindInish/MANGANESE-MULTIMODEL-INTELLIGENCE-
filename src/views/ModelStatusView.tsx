import React from 'react';
import { MODEL_SPECS } from '../data/miningData';
import {
  Cpu,
  CheckCircle2,
  Layers,
  Zap,
  Activity,
  Award,
  Clock,
  Code,
  ShieldCheck,
  Check
} from 'lucide-react';

export const ModelStatusView: React.FC = () => {
  return (
    <div id="mmi-model-status-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              ALGORITHMIC REGISTRY & ML AUDIT
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              MODEL INVENTORY STATUS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            AI Model Status & Architecture Registry
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Component specifications, validation benchmarks, inputs, and inference pipelines for the four SIH26009 models.
          </p>
        </div>

        {/* System Integration Note */}
        <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold max-w-sm">
          FOUR COMPONENT MODELS PREVIOUSLY DEVELOPED — INTEGRATED VIA PLATFORM INTERFACE
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODEL_SPECS.map(model => (
          <div
            key={model.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {model.modelNumber}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{model.status}</span>
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">Latency: {model.latency}</span>
              </div>

              {/* Title & Type */}
              <h3 className="text-lg font-bold text-slate-100 font-sans">{model.name}</h3>
              <div className="text-xs font-mono text-cyan-400 mt-1">{model.algorithm}</div>

              {/* Metric Callouts */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Accuracy / Performance
                  </div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    {model.accuracy} (F1: {model.f1Score})
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Training Volume
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-300 mt-0.5 line-clamp-2">
                    {model.trainingSamples}
                  </div>
                </div>
              </div>

              {/* Inputs and Outputs */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-850">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">
                    Input Telemetry & Layers:
                  </div>
                  <div className="text-slate-300 font-sans leading-relaxed">
                    {model.inputFeatures.join(' • ')}
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-850">
                  <div className="text-[10px] text-amber-400 uppercase font-semibold mb-1">
                    Description & Inference Scope:
                  </div>
                  <div className="text-slate-300 font-sans leading-relaxed">
                    {model.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Last Trained: {model.lastTrained}</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Production Calibrated</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
