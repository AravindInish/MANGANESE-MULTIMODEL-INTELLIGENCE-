import React, { useState } from 'react';
import {
  MINES_DATA,
  MINING_BLOCKS,
  EXECUTIVE_KPIS,
  RECOMMENDED_ACTIONS,
  RISK_DRIVERS
} from '../data/miningData';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Code,
  Printer,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedTime, setLastGeneratedTime] = useState('06 Sep 2026, 09:30 IST');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const now = new Date();
      setLastGeneratedTime(`06 Sep 2026, ${now.toLocaleTimeString()}`);
      triggerNotice('Fresh Intelligence Report generated successfully with latest 4-model telemetry.');
    }, 1200);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate actual CSV content
    const headers = 'Block_ID,Mine_ID,Prospectivity_Pct,Classification,Estimated_Reserve_T,Viable_Reserve_T,Ore_Grade_Pct,Depth_m,Priority,Risk_Level\n';
    const rows = MINING_BLOCKS.map(b =>
      `"${b.id}","${b.mineId}",${b.prospectivity},"${b.classification}",${b.estimatedReserve},${b.viableReserve},${b.predictedGrade},${b.depth},"${b.productionPriority}","${b.riskLevel}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MMI_Mining_Blocks_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotice('Block Telemetry CSV file exported.');
  };

  const handleExportJSON = () => {
    const data = {
      reportTitle: 'Manganese Mining Intelligence Report',
      system: 'MMI v2.6 Prototype',
      sihCode: 'SIH26009',
      organization: 'Ministry of Steel / MOIL Ltd.',
      generatedAt: lastGeneratedTime,
      kpis: EXECUTIVE_KPIS,
      mines: MINES_DATA,
      blocks: MINING_BLOCKS,
      riskDrivers: RISK_DRIVERS,
      recommendations: RECOMMENDED_ACTIONS
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MMI_Mining_Intelligence_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotice('Complete Intelligence JSON schema exported.');
  };

  return (
    <div id="mmi-reports-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              OFFICIAL GOVERNMENT MINING DOSSIER
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              MOIL LTD &bull; MINISTRY OF STEEL
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 font-sans">
            Manganese Mining Intelligence Report
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Comprehensive synthesis document of reserve assessments, 12-month forecasts, shortfall risks, and prescriptive actions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="report-generate-btn"
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-md shadow-amber-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'GENERATING...' : 'GENERATE REPORT'}</span>
          </button>

          <button
            id="report-download-pdf-btn"
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>DOWNLOAD PDF</span>
          </button>

          <button
            id="report-export-csv-btn"
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT CSV</span>
          </button>

          <button
            id="report-export-json-btn"
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXPORT JSON</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-amber-500/15 border border-amber-500/40 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* DOCUMENT PREVIEW CONTAINER (Styled like an enterprise government dossier) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl text-slate-200 font-sans max-w-5xl mx-auto space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-amber-500/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xl font-black tracking-widest text-slate-100">MMI</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                OFFICIAL REPORT
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 mt-1">
              MANGANESE MINE INTELLIGENCE REPORT
            </h2>
            <div className="text-xs text-slate-400 mt-0.5 font-mono">
              Document Ref: MMI-SIH26009-MOIL-2026-09
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 space-y-1">
            <div>Organization: <span className="text-slate-200 font-bold">MOIL Limited / Ministry of Steel</span></div>
            <div>Mine Facility: <span className="text-amber-400 font-bold">MOIL DEMO MINE (Balaghat)</span></div>
            <div>Date of Issue: <span className="text-slate-200">{lastGeneratedTime}</span></div>
            <div>Security Level: <span className="text-cyan-400 font-bold">INTERNAL AUDIT / DEMO</span></div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-amber-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
            <span>1. EXECUTIVE SUMMARY</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            This integrated intelligence report compiles outputs from the four constituent machine learning models developed under Smart India Hackathon Problem SIH26009. Geospatial exploration indicators indicate an overall prospectivity rating of <strong className="text-emerald-400 font-mono">87% (HIGH)</strong> across the Balaghat mining leasehold. Total estimated in-situ reserve stands at <strong className="text-slate-100 font-mono">450,000 Tonnes</strong>, with an economically viable extractable volume of <strong className="text-teal-400 font-mono">320,000 Tonnes</strong> (average grade 42.7% Mn).
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            However, operational constraint modeling forecasts a 12-month rolling output of <strong className="text-amber-300 font-mono">103,000 Tonnes</strong> against the mandated quota of <strong className="text-slate-100 font-mono">120,000 Tonnes</strong>, generating a projected shortfall gap of <strong className="text-rose-400 font-mono">17,000 Tonnes</strong>. Shortfall probability is evaluated at <strong className="text-rose-400 font-mono">78% (HIGH RISK)</strong>. Immediate execution of the Decision Engine's five prioritized interventions is recommended to restore extraction targets.
          </p>
        </div>

        {/* Section 2: Mine Information & Geospatial Coordinates */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-amber-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center space-x-2">
            <span>2. MINE & GEOSPATIAL PROFILE</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">FACILITY</div>
              <div className="font-bold text-slate-100 mt-1">Balaghat Mine</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">COORDINATES</div>
              <div className="font-bold text-slate-100 mt-1">21.875° N, 80.185° E</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">ELEVATION / DEPTH</div>
              <div className="font-bold text-slate-100 mt-1">334 m / 280 m max</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">TOTAL BLOCKS</div>
              <div className="font-bold text-cyan-400 mt-1">24 Mining Blocks</div>
            </div>
          </div>
        </div>

        {/* Section 3: Four-Model Synthesis Breakdown */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-amber-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-1.5">
            3. FOUR-MODEL AI EVALUATION SYNTHESIS
          </h3>
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Model</th>
                  <th className="px-4 py-2.5">Domain</th>
                  <th className="px-4 py-2.5">Key Metric</th>
                  <th className="px-4 py-2.5">Status / Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950 font-sans">
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-emerald-400">Model 01</td>
                  <td className="px-4 py-2.5 text-slate-300">Prospectivity Prediction</td>
                  <td className="px-4 py-2.5 font-mono font-bold text-emerald-400">87% (High)</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">89% Confidence &bull; Spatial Bayesian</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-cyan-400">Model 02</td>
                  <td className="px-4 py-2.5 text-slate-300">Reserve Estimation</td>
                  <td className="px-4 py-2.5 font-mono font-bold text-cyan-300">320K T Viable / 450K T Total</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">42.7% Avg Mn Grade &bull; 3D Kriging</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-amber-400">Model 03</td>
                  <td className="px-4 py-2.5 text-slate-300">Production Forecast</td>
                  <td className="px-4 py-2.5 font-mono font-bold text-amber-300">103,000 T / 12 Months</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">17,000 T Projected Gap &bull; TFT Model</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-rose-400">Model 04</td>
                  <td className="px-4 py-2.5 text-slate-300">Production Shortfall Risk</td>
                  <td className="px-4 py-2.5 font-mono font-bold text-rose-400">78% Probability (High Risk)</td>
                  <td className="px-4 py-2.5 text-slate-400 font-mono">Lead: Equipment (32%) &bull; XGBoost</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Recommended Actions */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-amber-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-1.5">
            4. ACTIONABLE INTERVENTIONS (DECISION ENGINE)
          </h3>
          <div className="space-y-2">
            {RECOMMENDED_ACTIONS.map(action => (
              <div key={action.id} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="flex items-center justify-between font-mono mb-1">
                  <span className="font-bold text-slate-200">{action.title}</span>
                  <span className="text-[10px] font-bold text-amber-400">{action.priority} PRIORITY</span>
                </div>
                <div className="text-slate-400 mt-1">{action.reason}</div>
                <div className="text-emerald-400 font-mono mt-1">Objective: {action.expectedObjective}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Footer / Signature Area */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-slate-400">
          <div>
            <div>Prepared By:</div>
            <div className="text-slate-200 font-bold mt-0.5">MMI AI Decision Engine</div>
          </div>
          <div>
            <div>Verified By:</div>
            <div className="text-slate-200 font-bold mt-0.5">Chief Mining Geologist</div>
          </div>
          <div>
            <div>Hackathon Theme:</div>
            <div className="text-cyan-400 font-bold mt-0.5">Space Technology</div>
          </div>
          <div>
            <div>Approval Status:</div>
            <div className="text-emerald-400 font-bold mt-0.5">AUTHENTICATED DEMO</div>
          </div>
        </div>
      </div>
    </div>
  );
};
