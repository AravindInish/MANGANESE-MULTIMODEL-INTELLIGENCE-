import React from 'react';
import { DATA_SOURCES, MINES_DATA } from '../data/miningData';
import {
  Database,
  Satellite,
  Globe,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Layers,
  Sparkles,
  Compass
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  return (
    <div id="mmi-data-sources-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              GEOSPATIAL & EARTH OBSERVATION INGESTION
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              FEDERATED REPOSITORIES
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Data Sources & Real-World Mining Context
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Integration architecture linking spaceborne Earth observation, Geological Survey of India archives, and MOIL mine SCADA.
          </p>
        </div>
      </div>

      {/* Primary Data Repositories Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-100 font-sans">
            Core Satellite & Geological Repositories
          </h2>
          <span className="text-xs font-mono text-emerald-400">6 Connected Services</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA_SOURCES.map(source => (
            <div
              key={source.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {source.type}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{source.status}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-sans">{source.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{source.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Refresh: <strong className="text-slate-300">{source.updateFrequency}</strong></span>
                <span className="text-slate-500">API Gateway</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World MOIL Manganese Mines Portfolio */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 font-sans">
              Real-World MOIL Manganese Mines In Scope
            </h2>
            <p className="text-xs text-slate-400">
              Operating underground and opencast leaseholds within the Sausar manganese belt (Madhya Pradesh & Maharashtra).
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">MOIL Ltd. Operations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {MINES_DATA.map(mine => (
            <div
              key={mine.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-mono font-bold">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mine.name}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-1">
                  {mine.state} &bull; {mine.type}
                </div>

                <div className="mt-3 space-y-1 text-xs font-mono">
                  <div className="text-slate-500 text-[10px]">COORDINATES</div>
                  <div className="text-slate-200">
                    {mine.coordinates[0].toFixed(3)}°N, {mine.coordinates[1].toFixed(3)}°E
                  </div>
                </div>

                <div className="mt-2 space-y-1 text-xs font-mono">
                  <div className="text-slate-500 text-[10px]">ESTIMATED RESERVE</div>
                  <div className="text-teal-400 font-bold">
                    {mine.estimatedReserve.toLocaleString()} Tonnes
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">Viable: {mine.viableReserve.toLocaleString()} T</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
