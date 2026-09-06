import React from 'react';
import { PageId } from '../types';
import {
  LayoutDashboard,
  Search,
  Layers,
  Database,
  TrendingUp,
  AlertTriangle,
  Cpu,
  Satellite,
  FileText,
  Activity,
  Server,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const mainNavItems = [
    { id: 'dashboard' as PageId, label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'mine-analysis' as PageId, label: 'MINE ANALYSIS', icon: Search },
    { id: 'prospectivity' as PageId, label: 'PROSPECTIVITY', icon: Layers, badge: 'M1' },
    { id: 'reserve-estimation' as PageId, label: 'RESERVE ESTIMATION', icon: Database, badge: 'M2' },
    { id: 'production-forecast' as PageId, label: 'PRODUCTION FORECAST', icon: TrendingUp, badge: 'M3' },
    { id: 'shortfall-risk' as PageId, label: 'SHORTFALL RISK', icon: AlertTriangle, badge: 'M4' },
    { id: 'decision-intelligence' as PageId, label: 'DECISION INTEL', icon: Cpu, highlight: true },
    { id: 'satellite-intelligence' as PageId, label: 'SATELLITE INTEL', icon: Satellite },
    { id: 'reports' as PageId, label: 'REPORTS', icon: FileText }
  ];

  const systemNavItems = [
    { id: 'model-status' as PageId, label: 'MODEL STATUS', icon: Activity },
    { id: 'data-sources' as PageId, label: 'DATA SOURCES', icon: Server }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="mmi-sidebar"
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-60 bg-[#111114] border-r border-white/5 flex flex-col justify-between py-6 select-none transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Brand & Navigation */}
        <div className="flex flex-col">
          {/* Header Brand */}
          <div className="px-5 mb-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-black text-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  MMI
                </div>
                <h1 className="text-xs font-bold tracking-tight text-white leading-tight">
                  MANGANESE<br />
                  <span className="text-white/80">INTELLIGENCE</span>
                </h1>
              </div>
              <p className="text-[10px] text-amber-500/80 font-medium font-mono tracking-widest pl-0.5">
                MOIL LTD / SIH 2026
              </p>
            </div>

            {/* Mobile close button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5 px-3 overflow-y-auto max-h-[calc(100vh-250px)]">
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold tracking-wide transition-colors text-left ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-500 border-r-2 border-amber-500 font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    ) : (
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-px bg-white/5 my-3.5 mx-2"></div>

            {/* System Section */}
            <div className="px-3 py-1 text-white/20 text-[10px] uppercase tracking-wider font-mono">
              SYSTEMS
            </div>

            {systemNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold tracking-wide transition-colors text-left ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-500 border-r-2 border-amber-500 font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    ) : (
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: Model Integrity Widget & SIH Badge */}
        <div className="px-5">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-3.5">
            <p className="text-[10px] text-white/40 leading-tight uppercase tracking-wider mb-2 font-mono">
              Model Integrity
            </p>
            <div className="flex gap-1.5">
              <div className="h-1 flex-1 bg-emerald-500/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-emerald-500/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-amber-500/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-emerald-500/60 rounded-full"></div>
            </div>
          </div>

          <div className="text-[10px] text-white/30 uppercase font-medium leading-relaxed font-mono">
            SIH 2026 &bull; SIH26009<br />
            MINISTRY OF STEEL
          </div>
        </div>
      </aside>
    </>
  );
};
