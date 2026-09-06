import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Loader2,
  Layers,
  Database,
  TrendingUp,
  AlertTriangle,
  Cpu,
  ArrowRight,
  RotateCcw,
  Check
} from 'lucide-react';

interface MineAnalysisViewProps {
  onApplyAnalysisToDashboard?: () => void;
}

export const MineAnalysisView: React.FC<MineAnalysisViewProps> = ({
  onApplyAnalysisToDashboard
}) => {
  // Form State
  const [formData, setFormData] = useState({
    // Location
    latitude: 21.875,
    longitude: 80.185,
    elevation: 334,
    miningArea: '14.2 km²',
    // Geological
    rockType: 'Braunite-Gondite & Quartzite',
    oreGrade: 43.8,
    depth: 165,
    geologicalFormation: 'Sausar Group (Mansar Formation)',
    // Block
    blockId: 'BLOCK A-NEW',
    tonnage: 58000,
    coordinatesStr: '21.882° N, 80.191° E',
    // Operational
    historicalProduction: 9200,
    equipmentDowntime: 24, // %
    blastingDelay: 42, // minutes
    productionCapacity: 11500,
    // Weather
    rainfall: 112,
    soilMoisture: 0.42,
    temperature: 31.4,
    // Economic
    miningCost: 48, // $/T
    processingCost: 28, // $/T
    oreValue: 185 // $/T
  });

  // Simulation pipeline state
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisDone, setAnalysisDone] = useState(false);

  const pipelineSteps = [
    { title: 'Data Validation & Spatial Sanitization', desc: 'Validating bore logs, sensor feeds, and GPS polygons' },
    { title: 'Prospectivity Analysis (Model 01)', desc: 'Running Spatial Bayesian neural network over multispectral reflectance' },
    { title: 'Reserve Estimation (Model 02)', desc: 'Calculating 3D geostatistical kriging block model & cut-off tonnage' },
    { title: 'Production Forecast (Model 03)', desc: 'Executing Temporal Fusion Transformer 12-month forward simulation' },
    { title: 'Shortfall Risk Assessment (Model 04)', desc: 'Evaluating Extreme Gradient Boosting stochastic failure curves' },
    { title: 'Decision Engine Synthesis', desc: 'Solving MILP optimization matrix for stope prioritization' }
  ];

  const handleRunAnalysis = () => {
    setIsRunning(true);
    setAnalysisDone(false);
    setCurrentStep(1);

    // Step by step simulation
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsRunning(false);
          setAnalysisDone(true);
          return 6;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setAnalysisDone(false);
  };

  return (
    <div id="mmi-mine-analysis-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              EXPLORATORY AI SIMULATOR
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              MULTI-PARAMETRIC INGESTION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            New Mine Analysis Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure geological, spatial, operational, and weather parameters to run the complete 4-model intelligence suite.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {analysisDone && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          )}

          <button
            id="run-complete-ai-analysis-btn"
            onClick={handleRunAnalysis}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-amber-500/20 ${
              isRunning ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                <span>EXECUTING AI PIPELINE...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>RUN COMPLETE AI ANALYSIS</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PIPELINE EXECUTION PROGRESS MODAL / BANNER */}
      {(isRunning || analysisDone) && (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <h3 className="font-mono text-sm font-bold text-amber-400 uppercase tracking-wider">
                Autonomous 4-Model Pipeline Execution
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {analysisDone ? 'COMPLETED (6/6 STEPS)' : `IN PROGRESS (${currentStep}/6 STEPS)`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineSteps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isFinished = currentStep > stepNumber || analysisDone;
              const isActive = currentStep === stepNumber && !analysisDone;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition ${
                    isFinished
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : isActive
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 animate-pulse'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase">STEP 0{stepNumber}</span>
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-700"></span>
                    )}
                  </div>
                  <div className="font-bold text-xs leading-snug">{step.title}</div>
                  <div className="text-[9px] text-slate-400 mt-1 leading-tight">{step.desc}</div>
                </div>
              );
            })}
          </div>

          {analysisDone && (
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30">
              <div className="flex items-center space-x-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span className="font-bold text-emerald-400">Analysis Synthesized Successfully:</span>
                <span>Prospectivity: 89.2% &bull; Viable Reserve: 48,200 T &bull; Shortfall Risk: 34% (Optimized)</span>
              </div>
              <button
                onClick={onApplyAnalysisToDashboard}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition"
              >
                Apply To Dashboard →
              </button>
            </div>
          )}
        </div>
      )}

      {/* MULTI-SECTION PARAMETER FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Section 1: LOCATION */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>LOCATION DATA</span>
            <span className="text-[10px] text-slate-500">GEODETIC WGS84</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Latitude (°N)</label>
              <input
                type="number"
                step="0.001"
                value={formData.latitude}
                onChange={e => setFormData({ ...formData, latitude: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Longitude (°E)</label>
              <input
                type="number"
                step="0.001"
                value={formData.longitude}
                onChange={e => setFormData({ ...formData, longitude: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Elevation (m)</label>
                <input
                  type="number"
                  value={formData.elevation}
                  onChange={e => setFormData({ ...formData, elevation: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Mining Area</label>
                <input
                  type="text"
                  value={formData.miningArea}
                  onChange={e => setFormData({ ...formData, miningArea: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: GEOLOGICAL DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>GEOLOGICAL DATA</span>
            <span className="text-[10px] text-slate-500">BOREHOLE LOGS</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Rock Type</label>
              <input
                type="text"
                value={formData.rockType}
                onChange={e => setFormData({ ...formData, rockType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Ore Grade (% Mn)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.oreGrade}
                  onChange={e => setFormData({ ...formData, oreGrade: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Depth (m)</label>
                <input
                  type="number"
                  value={formData.depth}
                  onChange={e => setFormData({ ...formData, depth: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Geological Formation</label>
              <input
                type="text"
                value={formData.geologicalFormation}
                onChange={e => setFormData({ ...formData, geologicalFormation: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 3: BLOCK DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>BLOCK DATA</span>
            <span className="text-[10px] text-slate-500">STOPE ATTRIBUTES</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Block Identifier</label>
              <input
                type="text"
                value={formData.blockId}
                onChange={e => setFormData({ ...formData, blockId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Estimated In-Situ Tonnage (T)</label>
              <input
                type="number"
                value={formData.tonnage}
                onChange={e => setFormData({ ...formData, tonnage: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Centroid Coordinates</label>
              <input
                type="text"
                value={formData.coordinatesStr}
                onChange={e => setFormData({ ...formData, coordinatesStr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 4: OPERATIONAL DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>OPERATIONAL DATA</span>
            <span className="text-[10px] text-slate-500">SCADA & FLEET</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Historical Monthly Run (T)</label>
              <input
                type="number"
                value={formData.historicalProduction}
                onChange={e => setFormData({ ...formData, historicalProduction: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Downtime (%)</label>
                <input
                  type="number"
                  value={formData.equipmentDowntime}
                  onChange={e => setFormData({ ...formData, equipmentDowntime: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Blasting Delay (min)</label>
                <input
                  type="number"
                  value={formData.blastingDelay}
                  onChange={e => setFormData({ ...formData, blastingDelay: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Hoist Capacity Limit (T/mo)</label>
              <input
                type="number"
                value={formData.productionCapacity}
                onChange={e => setFormData({ ...formData, productionCapacity: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 5: WEATHER / SPACE DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>WEATHER & SATELLITE</span>
            <span className="text-[10px] text-slate-500">GPM & SMAP</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Rainfall (mm/24h)</label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={e => setFormData({ ...formData, rainfall: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Soil Moisture (m³/m³)</label>
              <input
                type="number"
                step="0.01"
                value={formData.soilMoisture}
                onChange={e => setFormData({ ...formData, soilMoisture: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Land Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={e => setFormData({ ...formData, temperature: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 6: ECONOMIC DATA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>ECONOMIC DATA</span>
            <span className="text-[10px] text-slate-500">COMMODITY PRICING</span>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Mining Extraction Cost ($/T)</label>
              <input
                type="number"
                value={formData.miningCost}
                onChange={e => setFormData({ ...formData, miningCost: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Processing & Beneficiation ($/T)</label>
              <input
                type="number"
                value={formData.processingCost}
                onChange={e => setFormData({ ...formData, processingCost: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">High-Grade Ore Realization ($/T)</label>
              <input
                type="number"
                value={formData.oreValue}
                onChange={e => setFormData({ ...formData, oreValue: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
