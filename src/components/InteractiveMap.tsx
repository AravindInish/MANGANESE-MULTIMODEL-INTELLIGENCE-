import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MiningBlock, MineLocation } from '../types';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Maximize2,
  Minimize2,
  Info,
  Compass,
  AlertTriangle,
  Flame,
  Droplets,
  Eye
} from 'lucide-react';

interface InteractiveMapProps {
  blocks: MiningBlock[];
  mines: MineLocation[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  selectedMineId: string;
  onSelectMine?: (mineId: string) => void;
  height?: string;
  showAllControls?: boolean;
  initialBaseMap?: 'satellite' | 'dark' | 'terrain' | 'street';
  activeAnalysisLayers?: {
    mineLocations: boolean;
    miningBlocks: boolean;
    prospectivity: boolean;
    reserveZones: boolean;
    riskZones: boolean;
  };
  activeEnvironmentLayers?: {
    rainfall: boolean;
    soilMoisture: boolean;
    ndvi: boolean;
    landTemperature: boolean;
  };
  onBlockActionClick?: (blockId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  blocks,
  mines,
  selectedBlockId,
  onSelectBlock,
  selectedMineId,
  onSelectMine,
  height = '540px',
  showAllControls = true,
  initialBaseMap = 'satellite',
  activeAnalysisLayers = {
    mineLocations: true,
    miningBlocks: true,
    prospectivity: true,
    reserveZones: true,
    riskZones: true
  },
  activeEnvironmentLayers = {
    rainfall: false,
    soilMoisture: false,
    ndvi: false,
    landTemperature: false
  },
  onBlockActionClick
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<{ [id: string]: L.Polygon }>({});
  const markerLayersRef = useRef<{ [id: string]: L.Marker }>({});
  const envLayersRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  const [baseMap, setBaseMap] = useState<'satellite' | 'dark' | 'terrain' | 'street'>(initialBaseMap);
  const [layersOpen, setLayersOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>({ lat: 21.875, lng: 80.185 });

  // Internal layer toggles
  const [analysisLayers, setAnalysisLayers] = useState(activeAnalysisLayers);
  const [envLayers, setEnvLayers] = useState(activeEnvironmentLayers);

  // Sync external props if changed
  useEffect(() => {
    setAnalysisLayers(activeAnalysisLayers);
  }, [activeAnalysisLayers]);

  useEffect(() => {
    setEnvLayers(activeEnvironmentLayers);
  }, [activeEnvironmentLayers]);

  // Tile layer URLs
  const getTileUrl = (type: string) => {
    switch (type) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attr: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        };
      case 'terrain':
        return {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attr: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
        };
      case 'street':
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attr: '&copy; OpenStreetMap contributors'
        };
      case 'dark':
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attr: '&copy; OpenStreetMap contributors &copy; CARTO'
        };
    }
  };

  // Color helper based on prospectivity
  const getBlockColor = (prospectivity: number) => {
    if (prospectivity >= 80) return '#10b981'; // High (Emerald)
    if (prospectivity >= 55) return '#f59e0b'; // Medium (Amber)
    return '#ef4444'; // Low (Crimson)
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch {
        // ignore
      }
      mapInstanceRef.current = null;
    }

    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    try {
      // Centered at Balaghat manganese area
      const currentMine = mines.find(m => m.id === selectedMineId) || mines[0];
      const initialCenter: [number, number] = currentMine
        ? [currentMine.coordinates[0], currentMine.coordinates[1]]
        : [21.875, 80.185];

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      const tileInfo = getTileUrl(baseMap);
      const tileLayer = L.tileLayer(tileInfo.url, {
        maxZoom: 19,
        attribution: tileInfo.attr
      }).addTo(map);

      baseTileLayerRef.current = tileLayer;
      envLayersRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Mouse movement tracker for GIS coordinates
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        setCursorCoords({
          lat: Number(e.latlng.lat.toFixed(4)),
          lng: Number(e.latlng.lng.toFixed(4))
        });
      });

      // Invalidate size after layout stabilization
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {
          // ignore
        }
      }, 200);
    } catch (err) {
      console.warn('Leaflet map initialization warning:', err);
    }

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        if (mapContainerRef.current) {
          delete (mapContainerRef.current as any)._leaflet_id;
        }
      } catch (err) {
        console.warn('Map cleanup error:', err);
      }
    };
  }, []);

  // Update Base Layer when changed
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const tileInfo = getTileUrl(baseMap);

    if (baseTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(baseTileLayerRef.current);
    }

    const newLayer = L.tileLayer(tileInfo.url, {
      maxZoom: 19,
      attribution: tileInfo.attr
    }).addTo(mapInstanceRef.current);

    // Ensure base tile is at the bottom
    newLayer.bringToBack();
    baseTileLayerRef.current = newLayer;
  }, [baseMap]);

  // Render Mining Blocks Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old polygons
    Object.values(polygonLayersRef.current).forEach(poly => map.removeLayer(poly));
    polygonLayersRef.current = {};

    if (!analysisLayers.miningBlocks) return;

    blocks.forEach(block => {
      const isSelected = block.id === selectedBlockId;
      const color = getBlockColor(block.prospectivity);

      let strokeColor = isSelected ? '#38bdf8' : color;
      let weight = isSelected ? 3.5 : 2;
      let dashArray = analysisLayers.riskZones && block.riskLevel === 'HIGH' ? '6, 6' : undefined;

      const polygon = L.polygon(block.coordinates, {
        color: strokeColor,
        weight: weight,
        fillColor: color,
        fillOpacity: analysisLayers.prospectivity ? (isSelected ? 0.65 : 0.42) : 0.15,
        dashArray: dashArray,
        className: 'transition-all cursor-pointer'
      }).addTo(map);

      // Bind Tooltip
      polygon.bindTooltip(
        `<div class="text-xs font-mono font-bold tracking-wider">${block.id}</div>
         <div class="text-[11px] text-slate-300">Pros: <span class="font-bold text-amber-300">${block.prospectivity}%</span> | ${block.estimatedReserve.toLocaleString()} T</div>`,
        { permanent: false, direction: 'top', className: 'mmi-custom-tooltip' }
      );

      // Bind Rich Popup
      const popupHtml = `
        <div class="p-2 min-w-[210px] text-slate-100 font-sans">
          <div class="flex items-center justify-between border-b border-slate-700/80 pb-1.5 mb-2">
            <span class="font-mono font-bold text-sm text-cyan-400">${block.id}</span>
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${
              block.productionPriority === 'HIGH' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }">${block.productionPriority} PRIORITY</span>
          </div>
          
          <div class="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Prospectivity</div>
              <div class="text-sm font-bold text-emerald-400 font-mono">${block.prospectivity}%</div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Estimated Reserve</div>
              <div class="text-sm font-bold text-slate-200 font-mono">${block.estimatedReserve.toLocaleString()} T</div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Predicted Grade</div>
              <div class="text-sm font-bold text-amber-300 font-mono">${block.predictedGrade}% Mn</div>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-slate-400">Shortfall Contrib</div>
              <div class="text-sm font-bold text-rose-400 font-mono">${block.shortfallContribution}%</div>
            </div>
          </div>

          <button id="popup-btn-${block.id.replace(/\s+/g, '-')}" class="w-full py-1.5 px-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-[11px] rounded tracking-wide transition shadow">
            VIEW BLOCK ANALYSIS
          </button>
        </div>
      `;

      polygon.bindPopup(popupHtml, { className: 'mmi-custom-popup' });

      polygon.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${block.id.replace(/\s+/g, '-')}`);
        if (btn) {
          btn.onclick = () => {
            onSelectBlock(block.id);
            if (onBlockActionClick) {
              onBlockActionClick(block.id);
            }
          };
        }
      });

      polygon.on('click', () => {
        onSelectBlock(block.id);
      });

      polygonLayersRef.current[block.id] = polygon;
    });
  }, [blocks, selectedBlockId, analysisLayers]);

  // Render Mine Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markerLayersRef.current).forEach(marker => map.removeLayer(marker));
    markerLayersRef.current = {};

    if (!analysisLayers.mineLocations) return;

    mines.forEach(mine => {
      const isSelectedMine = mine.id === selectedMineId;
      const customIcon = L.divIcon({
        className: 'mmi-mine-marker',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute w-8 h-8 rounded-full ${isSelectedMine ? 'bg-amber-400/30 animate-ping' : 'bg-cyan-500/20'}"></div>
            <div class="w-7 h-7 rounded-full border-2 ${isSelectedMine ? 'border-amber-400 bg-slate-950 shadow-lg shadow-amber-500/40' : 'border-cyan-400 bg-slate-900'} flex items-center justify-center text-xs">
              <span class="text-amber-400 font-mono font-bold text-[11px]">M</span>
            </div>
            <div class="absolute -bottom-5 whitespace-nowrap bg-slate-950/90 text-slate-200 border border-slate-700/80 px-1.5 py-0.2 rounded text-[10px] font-mono tracking-tight shadow">
              ${mine.name.replace('MOIL DEMO MINE (', '').replace(')', '')}
            </div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(mine.coordinates, { icon: customIcon }).addTo(map);

      const minePopupHtml = `
        <div class="p-2 min-w-[220px] text-slate-100 font-sans">
          <div class="text-[10px] uppercase font-mono tracking-wider text-amber-400">MOIL MINING FACILITY</div>
          <div class="font-bold text-sm text-slate-100 mb-1">${mine.name}</div>
          <div class="text-[11px] text-slate-400 mb-2">Location: ${mine.district}, ${mine.state} (${mine.coordinates[0]}°N, ${mine.coordinates[1]}°E)</div>
          
          <div class="grid grid-cols-2 gap-1.5 text-xs bg-slate-900/80 p-2 rounded border border-slate-800 mb-3 font-mono">
            <div>Blocks: <span class="text-cyan-400 font-bold">${mine.totalBlocks}</span></div>
            <div>Reserve: <span class="text-amber-300 font-bold">${(mine.estimatedReserve / 1000).toFixed(0)}K T</span></div>
            <div>Prospectivity: <span class="text-emerald-400 font-bold">${mine.prospectivity}%</span></div>
            <div>Risk: <span class="text-rose-400 font-bold">${mine.riskLevel}</span></div>
          </div>

          <button id="mine-btn-${mine.id}" class="w-full py-1 px-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px] rounded tracking-wide transition">
            OPEN MINE DASHBOARD
          </button>
        </div>
      `;

      marker.bindPopup(minePopupHtml, { className: 'mmi-custom-popup' });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`mine-btn-${mine.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectMine) onSelectMine(mine.id);
          };
        }
      });

      markerLayersRef.current[mine.id] = marker;
    });
  }, [mines, selectedMineId, analysisLayers.mineLocations]);

  // Render Environmental Overlays (Simulated Satellite Data)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = envLayersRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Rainfall Radar Simulation Overlay
    if (envLayers.rainfall) {
      const rainCircle = L.circle([21.88, 80.19], {
        radius: 3200,
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.28,
        weight: 1.5,
        dashArray: '4, 4'
      });
      rainCircle.bindTooltip('Precipitation Field: 112 mm/24h (High Inundation Index)', { permanent: false });
      group.addLayer(rainCircle);
    }

    // 2. Soil Moisture Zone Overlay
    if (envLayers.soilMoisture) {
      const soilCircle = L.circle([21.872, 80.182], {
        radius: 2600,
        color: '#0d9488',
        fillColor: '#14b8a6',
        fillOpacity: 0.25,
        weight: 1
      });
      soilCircle.bindTooltip('Soil Moisture (SMAP): 0.42 m³/m³', { permanent: false });
      group.addLayer(soilCircle);
    }

    // 3. NDVI Multispectral Reflectance Overlay
    if (envLayers.ndvi) {
      const ndviCircle = L.circle([21.888, 80.198], {
        radius: 2800,
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.22,
        weight: 1
      });
      ndviCircle.bindTooltip('Sentinel-2 NDVI Index: 0.61 (Vegetated Buffer)', { permanent: false });
      group.addLayer(ndviCircle);
    }

    // 4. Land Surface Temperature (LST) Hotspots
    if (envLayers.landTemperature) {
      const tempCircle = L.circle([21.878, 80.188], {
        radius: 2000,
        color: '#dc2626',
        fillColor: '#f97316',
        fillOpacity: 0.25,
        weight: 1
      });
      tempCircle.bindTooltip('Thermal IR (Landsat-8): 31.4°C Surface Temp', { permanent: false });
      group.addLayer(tempCircle);
    }
  }, [envLayers]);

  // Pan to selected block smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedBlockId) return;

    const block = blocks.find(b => b.id === selectedBlockId);
    if (block) {
      map.flyTo(block.center, 15, { duration: 1.2 });
      const poly = polygonLayersRef.current[block.id];
      if (poly) {
        poly.openPopup();
      }
    }
  }, [selectedBlockId, blocks]);

  // Pan to selected mine when mine changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMineId) return;

    const mine = mines.find(m => m.id === selectedMineId);
    if (mine) {
      map.flyTo([mine.coordinates[0], mine.coordinates[1]], 14, { duration: 1.2 });
    }
  }, [selectedMineId, mines]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    const currentMine = mines.find(m => m.id === selectedMineId) || mines[0];
    if (currentMine && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(currentMine.coordinates, 14, { duration: 1.2 });
    }
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    try {
      if (!isFullscreen) {
        if (mapContainerRef.current.requestFullscreen) {
          mapContainerRef.current.requestFullscreen().catch(() => {});
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    } catch {
      // ignore fullscreen permission errors in iframe
    }
    setTimeout(() => {
      try {
        mapInstanceRef.current?.invalidateSize();
      } catch {
        // ignore
      }
    }, 300);
  };

  return (
    <div
      id="mmi-real-world-map-wrapper"
      className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0d121c] shadow-2xl flex flex-col"
      style={{ height }}
    >
      {/* Map Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
              REAL-WORLD GEOSPATIAL INTELLIGENCE MAP
            </span>
          </div>
          <div className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SIMULATED AI ANALYSIS OVERLAY
          </div>
        </div>

        {/* Live GPS / Coordinate Display */}
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          {cursorCoords && (
            <div className="hidden md:flex items-center space-x-2 bg-slate-950/70 px-2.5 py-1 rounded border border-slate-800 text-[11px]">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{cursorCoords.lat.toFixed(4)}° N</span>
              <span className="text-slate-600">|</span>
              <span>{cursorCoords.lng.toFixed(4)}° E</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">MOIL CENTRAL BELT</span>
            </div>
          )}

          {/* Layer Selector Trigger Button */}
          <button
            id="map-layer-selector-toggle"
            onClick={() => setLayersOpen(!layersOpen)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border text-xs font-medium transition ${
              layersOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layers</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="relative w-full flex-1 z-0" />

      {/* Map Control Buttons (Floating Top-Left) */}
      <div className="absolute top-14 left-3 z-10 flex flex-col space-y-1.5 shadow-lg">
        <button
          id="map-ctrl-zoom-in"
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition backdrop-blur"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          id="map-ctrl-zoom-out"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition backdrop-blur"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          id="map-ctrl-recenter"
          onClick={handleRecenter}
          title="Center Mine Region"
          className="w-8 h-8 rounded bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-slate-700/80 flex items-center justify-center transition backdrop-blur"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          id="map-ctrl-fullscreen"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="w-8 h-8 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition backdrop-blur"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Map Legend Overlay (Floating Bottom-Left) */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur text-xs text-slate-300 shadow-xl max-w-xs">
        <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-1.5 flex items-center justify-between">
          <span>ANALYTICAL LEGEND</span>
          <span className="text-[9px] text-amber-400">PROSPECTIVITY</span>
        </div>
        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3 rounded bg-emerald-500 border border-emerald-300/40"></div>
            <span>HIGH POTENTIAL (&gt;80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3 rounded bg-amber-500 border border-amber-300/40"></div>
            <span>MEDIUM POTENTIAL (55 - 79%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3 rounded bg-rose-500 border border-rose-300/40"></div>
            <span>LOW POTENTIAL (&lt;55%)</span>
          </div>
          <div className="flex items-center space-x-2 pt-1 border-t border-slate-800">
            <div className="w-3.5 h-3.5 rounded-full border border-amber-400 bg-slate-900 flex items-center justify-center text-[8px] text-amber-400 font-bold">M</div>
            <span>MOIL MINE HEAD</span>
          </div>
        </div>
      </div>

      {/* Layer Selector Drawer (Floating Top-Right) */}
      {layersOpen && (
        <div className="absolute top-14 right-3 z-20 w-64 bg-slate-950/95 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur text-xs text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <span className="font-mono font-bold tracking-wide text-amber-400 uppercase text-[11px]">Map Layers & GIS</span>
            <button
              onClick={() => setLayersOpen(false)}
              className="text-slate-400 hover:text-slate-100 text-xs px-1"
            >
              ✕
            </button>
          </div>

          {/* BASE MAP Selection */}
          <div className="mb-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
              BASE MAP
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'satellite', label: 'Satellite' },
                { id: 'dark', label: 'Dark Matter' },
                { id: 'terrain', label: 'Terrain' },
                { id: 'street', label: 'Street' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setBaseMap(opt.id as any)}
                  className={`py-1 px-2 rounded text-[11px] font-medium border text-left transition ${
                    baseMap === opt.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ANALYSIS LAYERS Selection */}
          <div className="mb-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
              ANALYSIS LAYERS
            </div>
            <div className="space-y-1.5 font-sans">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analysisLayers.mineLocations}
                  onChange={e => setAnalysisLayers(prev => ({ ...prev, mineLocations: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Mine Locations</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analysisLayers.miningBlocks}
                  onChange={e => setAnalysisLayers(prev => ({ ...prev, miningBlocks: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Mining Blocks</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analysisLayers.prospectivity}
                  onChange={e => setAnalysisLayers(prev => ({ ...prev, prospectivity: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Prospectivity Gradient</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analysisLayers.reserveZones}
                  onChange={e => setAnalysisLayers(prev => ({ ...prev, reserveZones: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Reserve Zones</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analysisLayers.riskZones}
                  onChange={e => setAnalysisLayers(prev => ({ ...prev, riskZones: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Shortfall Risk Zones</span>
              </label>
            </div>
          </div>

          {/* ENVIRONMENT LAYERS Selection */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5 flex items-center justify-between">
              <span>ENVIRONMENT (SPACE / SATELLITE)</span>
            </div>
            <div className="space-y-1.5 font-sans">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envLayers.rainfall}
                  onChange={e => setEnvLayers(prev => ({ ...prev, rainfall: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px] flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  <span>Rainfall (GPM Radar)</span>
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envLayers.soilMoisture}
                  onChange={e => setEnvLayers(prev => ({ ...prev, soilMoisture: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-teal-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">Soil Moisture (SMAP)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envLayers.ndvi}
                  onChange={e => setEnvLayers(prev => ({ ...prev, ndvi: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px]">NDVI (Sentinel-2)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envLayers.landTemperature}
                  onChange={e => setEnvLayers(prev => ({ ...prev, landTemperature: e.target.checked }))}
                  className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px] flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>Land Surface Temp</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
