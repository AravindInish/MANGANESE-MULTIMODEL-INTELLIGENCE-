import React, { useState } from 'react';
import { MineLocation, MiningBlock } from '../types';
import {
  Bell,
  ChevronDown,
  Info,
  Menu,
  AlertCircle
} from 'lucide-react';

interface TopBarProps {
  mines: MineLocation[];
  blocks: MiningBlock[];
  selectedMineId: string;
  onSelectMine: (mineId: string) => void;
  selectedBlockId: string;
  onSelectBlock: (blockId: string) => void;
  onOpenMobileMenu?: () => void;
  onNavigateToDecision?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  mines,
  blocks,
  selectedMineId,
  onSelectMine,
  selectedBlockId,
  onSelectBlock,
  onOpenMobileMenu,
  onNavigateToDecision
}) => {
  const [mineDropdownOpen, setMineDropdownOpen] = useState(false);
  const [blockDropdownOpen, setBlockDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [demoTooltipOpen, setDemoTooltipOpen] = useState(false);

  const currentMine = mines.find(m => m.id === selectedMineId) || mines[0] || {
    id: selectedMineId || 'moil-balaghat',
    name: 'MOIL DEMO MINE (Balaghat Mine)',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    coordinates: [21.875, 80.185],
    prospectivity: 87
  };
  const currentBlock = blocks.find(b => b.id === selectedBlockId) || blocks[0] || {
    id: selectedBlockId || 'BLOCK A01',
    name: 'Block A01 (North Vein)',
    predictedGrade: 44.2
  };

  const notifications = [
    {
      id: 'notif-1',
      title: 'High Inundation Risk in Balaghat Catchment',
      time: '14 min ago',
      level: 'warning',
      text: 'GPM satellite telemetry recorded 112mm precipitation. Pre-drain sump reservoirs for Sublevel 3.'
    },
    {
      id: 'notif-2',
      title: 'Model 04 Shortfall Probability Updated',
      time: '42 min ago',
      level: 'danger',
      text: 'Shortfall probability calculated at 78% due to equipment downtime and hoist maintenance.'
    },
    {
      id: 'notif-3',
      title: 'Block A01 & A07 Stoping Sequence Recommended',
      time: '2 hours ago',
      level: 'success',
      text: 'Decision Engine prioritized Blocks A01 (44.2% Mn) and A07 (46.8% Mn) to recover 17,000 T annual gap.'
    }
  ];

  return (
    <header
      id="mmi-top-bar"
      className="sticky top-0 z-30 h-14 border-b border-white/5 flex items-center justify-between px-4 md:px-6 bg-[#0E0E12] shrink-0 select-none"
    >
      {/* Left side: Mobile Toggle + Asset Dropdowns + Status */}
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        {/* Mobile menu hamburger */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 rounded bg-white/5 text-white/60 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Current Asset: Mine & Block Selectors */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-[9px] text-white/30 uppercase font-mono block leading-none mb-0.5">
              Current Asset
            </span>
            <div className="flex items-center gap-1.5">
              <button
                id="topbar-mine-selector-btn"
                onClick={() => {
                  setMineDropdownOpen(!mineDropdownOpen);
                  setBlockDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold text-white hover:text-amber-400 transition"
              >
                <span className="truncate max-w-[130px] md:max-w-[180px]">{currentMine?.name || 'Select Mine'}</span>
                <ChevronDown className="w-3 h-3 text-white/40" />
              </button>

              <span className="text-white/20 text-xs">/</span>

              <button
                id="topbar-block-selector-btn"
                onClick={() => {
                  setBlockDropdownOpen(!blockDropdownOpen);
                  setMineDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                <span>{currentBlock?.id || selectedBlockId || 'Block'}</span>
                <ChevronDown className="w-3 h-3 text-white/40" />
              </button>
            </div>

            {/* Mine Dropdown */}
            {mineDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#16161D] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-white/40 border-b border-white/5">
                  Select MOIL Mine Facility
                </div>
                {mines.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onSelectMine(m.id);
                      setMineDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                      m.id === currentMine?.id
                        ? 'bg-amber-500/10 text-amber-400 font-bold'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="truncate font-medium text-white">{m.name}</div>
                      <div className="text-[10px] text-white/40">{m.district}, {m.state}</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">{m.prospectivity}%</span>
                  </button>
                ))}
              </div>
            )}

            {/* Block Dropdown */}
            {blockDropdownOpen && (
              <div className="absolute top-full left-24 mt-2 w-56 bg-[#16161D] border border-white/10 rounded-xl shadow-2xl py-1 z-50 max-h-64 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-white/40 border-b border-white/5">
                  Select Mining Block
                </div>
                {blocks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBlock(b.id);
                      setBlockDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition ${
                      b.id === currentBlock?.id
                        ? 'bg-amber-500/10 text-amber-400 font-bold'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono">{b.id}</span>
                    <span className="text-[11px] font-mono text-amber-300">{b.predictedGrade}% Mn</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="hidden sm:block h-5 w-px bg-white/10"></div>

        {/* Status: Operational */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-medium text-white/60 tracking-wider">
            SYSTEM OPERATIONAL
          </span>
        </div>

        {/* Demo Mode Status Indicator */}
        <div className="relative hidden sm:flex items-center gap-2">
          <button
            onClick={() => setDemoTooltipOpen(!demoTooltipOpen)}
            onMouseEnter={() => setDemoTooltipOpen(true)}
            onMouseLeave={() => setDemoTooltipOpen(false)}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">
              Demo Mode: Simulated AI
            </span>
          </button>

          {demoTooltipOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 p-3 bg-[#111114] border border-amber-500/40 rounded-xl shadow-2xl text-xs text-white/80 z-50 backdrop-blur">
              <div className="font-bold text-amber-400 font-mono text-[11px] mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>DEMO MODE — SIMULATED AI OUTPUTS</span>
              </div>
              <p className="leading-relaxed text-[11px] text-white/60">
                This prototype uses simulated AI outputs and demonstration geospatial data. Actual ML predictions and satellite-derived analytics will be connected in the final implementation.
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-white/40 font-mono">
                SIH 2026 Problem SIH26009 | MOIL Ltd. / Ministry of Steel
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Timestamp, Notifications, and Sleek Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-[10px] font-mono text-white/40 hidden md:block">
          06 SEPT 2026 | 14:32:01 IST
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            id="topbar-notifications-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white transition"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#16161D] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
                  Operational Alerts (3)
                </span>
                <span className="text-[10px] text-amber-400 hover:underline cursor-pointer font-mono">
                  Mark all read
                </span>
              </div>

              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 hover:bg-white/5 transition text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white text-[11px]">{n.title}</span>
                      <span className="text-[10px] text-white/40 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-normal">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sleek Profile Badge */}
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white font-mono shadow-sm">
          MOIL
        </div>
      </div>
    </header>
  );
};
