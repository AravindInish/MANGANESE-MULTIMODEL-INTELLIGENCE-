export type PageId =
  | 'dashboard'
  | 'mine-analysis'
  | 'prospectivity'
  | 'reserve-estimation'
  | 'production-forecast'
  | 'shortfall-risk'
  | 'decision-intelligence'
  | 'satellite-intelligence'
  | 'reports'
  | 'model-status'
  | 'data-sources'
  | 'settings';

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface MiningBlock {
  id: string;
  name: string;
  mineId: string;
  coordinates: [number, number][]; // Polygon coordinates [lat, lng]
  center: [number, number];
  prospectivity: number; // 0 - 100%
  classification: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedReserve: number; // Tonnes
  viableReserve: number; // Tonnes
  predictedGrade: number; // e.g. 44.2% Mn
  depth: number; // meters
  productionPriority: PriorityLevel;
  shortfallContribution: number; // % contribution to overall shortfall risk
  status: 'EXPLORATION' | 'DEVELOPMENT' | 'ACTIVE_EXTRACTION' | 'PLANNED';
  rockType: string;
  economicViability: number; // %
  recommendedAction: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  elevation: number; // meters
}

export interface MineLocation {
  id: string;
  name: string;
  state: string;
  district: string;
  coordinates: [number, number];
  type: 'Underground' | 'Opencast' | 'Mixed';
  operator: string;
  totalBlocks: number;
  estimatedReserve: number; // Tonnes
  viableReserve: number;
  prospectivity: number; // %
  annualTarget: number; // Tonnes
  currentMonthlyRate: number; // Tonnes
  shortfallRisk: number; // %
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  overallStatus: 'ACTION REQUIRED' | 'MONITORING' | 'OPTIMAL';
  description: string;
}

export interface MonthlyProductionRecord {
  month: string;
  historical?: number;
  forecast?: number;
  target: number;
  confidenceLower?: number;
  confidenceUpper?: number;
}

export interface RiskDriver {
  id: string;
  name: string;
  percentage: number;
  description: string;
  impactTonnes: number;
  mitigation: string;
}

export interface RecommendedAction {
  id: string;
  priority: PriorityLevel;
  title: string;
  reason: string;
  expectedObjective: string;
  category: 'EQUIPMENT' | 'GEOLOGY' | 'BLASTING' | 'SCHEDULE' | 'WEATHER';
  status: 'PENDING' | 'APPROVED' | 'IN_PROGRESS';
  estimatedImpact: string;
}

export interface EnvironmentalMetric {
  rainfall: number; // mm
  soilMoisture: number; // m3/m3
  ndvi: number; // Index -1 to 1
  landSurfaceTemperature: number; // °C
  pitStabilityIndex: number; // 0-100
  windSpeed: number; // km/h
}

export interface EnvironmentalTrend {
  date: string;
  rainfall: number;
  soilMoisture: number;
  ndvi: number;
  temperature: number;
}

export interface ModelSpec {
  id: string;
  modelNumber: string;
  name: string;
  shortName: string;
  status: 'READY' | 'ACTIVE' | 'CALIBRATING';
  algorithm: string;
  accuracy: string;
  f1Score: string;
  latency: string;
  trainingSamples: string;
  lastTrained: string;
  description: string;
  inputFeatures: string[];
}
