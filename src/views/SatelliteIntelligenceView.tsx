import React, { useState } from 'react';
import { MiningBlock, MineLocation } from '../types';
import {
  ENVIRONMENTAL_CURRENT,
  ENVIRONMENTAL_TRENDS
} from '../data/miningData';
import { InteractiveMap } from '../components/InteractiveMap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Satellite,
  Droplets,
  Sprout,
  Flame,
  Wind,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Radio
} from 'lucide-react';

interface SatelliteIntelligenceViewProps {
  blocks: MiningBlock[];
  mines: MineLocation[];
  selectedMineId: string;
  onSelectMine: (id: string) => void;
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

export const SatelliteIntelligenceView: React.FC<SatelliteIntelligenceViewProps> = ({
  blocks,
  mines,
  selectedMineId,
  onSelectMine,
  selectedBlockId,
  onSelectBlock
}) => {
  const [selectedSensor, setSelectedSensor] = useState<'all' | 'rainfall' | 'ndvi' | 'temp'>('all');

  return (
    <div id="mmi-satellite-intelligence-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              SPACE TECHNOLOGY THEME &bull; SIH26009
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              SENTINEL-2 &bull; GPM &bull; SMAP &bull; LANDSAT-8
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Satellite & Environmental Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Multispectral surface reflectance, ground precipitation radar, soil moisture indices, and thermal anomaly monitoring.
          </p>
        </div>

        {/* Prototype Visualization Banner */}
        <div className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center space-x-2 shadow-sm">
          <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>SATELLITE DATA — PROTOTYPE VISUALIZATION</span>
        </div>
      </div>

      {/* Four Environmental Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rainfall */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              RAINFALL (GPM RADAR)
            </span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black font-mono text-cyan-300">
              {ENVIRONMENTAL_CURRENT.rainfall}
            </span>
            <span className="text-xs font-mono text-slate-400">mm / 24h</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">High surface runoff risk</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full" style={{ width: '65%' }} />
          </div>
        </div>

        {/* Soil Moisture */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
              SOIL MOISTURE (SMAP)
            </span>
            <Satellite className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black font-mono text-teal-300">
              {ENVIRONMENTAL_CURRENT.soilMoisture}
            </span>
            <span className="text-xs font-mono text-slate-400">m³/m³</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Pit slope water pressure elevated</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-teal-400 h-full" style={{ width: '58%' }} />
          </div>
        </div>

        {/* NDVI */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              NDVI (SENTINEL-2)
            </span>
            <Sprout className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black font-mono text-emerald-300">
              {ENVIRONMENTAL_CURRENT.ndvi}
            </span>
            <span className="text-xs font-mono text-slate-400">Index</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Dense vegetation canopy buffer</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-400 h-full" style={{ width: '74%' }} />
          </div>
        </div>

        {/* Land Surface Temperature */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
              LAND SURFACE TEMP
            </span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-1.5">
            <span className="text-3xl font-black font-mono text-orange-300">
              {ENVIRONMENTAL_CURRENT.landSurfaceTemperature}°C
            </span>
            <span className="text-xs font-mono text-slate-400">Landsat-8</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Thermal IR baseline normal</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-400 h-full" style={{ width: '62%' }} />
          </div>
        </div>
      </div>

      {/* Satellite Imagery Real-World Map with Environmental Layers Enabled */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Satellite Multispectral & Environmental Layer View
            </h2>
            <p className="text-xs text-slate-400">
              High-resolution satellite view overlaid with simulated precipitation and moisture contours.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400">Base: ESRI World Imagery Satellite</div>
        </div>

        <InteractiveMap
          blocks={blocks}
          mines={mines}
          selectedBlockId={selectedBlockId}
          onSelectBlock={onSelectBlock}
          selectedMineId={selectedMineId}
          onSelectMine={onSelectMine}
          height="450px"
          initialBaseMap="satellite"
          activeEnvironmentLayers={{
            rainfall: true,
            soilMoisture: true,
            ndvi: true,
            landTemperature: true
          }}
        />
      </div>

      {/* Environmental Trend Charts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-sans">
              Seasonal Environmental Trends (Past 6 Months)
            </h3>
            <p className="text-xs text-slate-400">
              Monsoon precipitation impact correlated with pit soil moisture and surface temperature
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ENVIRONMENTAL_TRENDS} margin={{ top: 15, right: 20, left: -10, bottom: 10 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d15', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />
              <Line yAxisId="left" type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#fb923c" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="soilMoisture" name="Soil Moisture" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
