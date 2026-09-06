import {
  MineLocation,
  MiningBlock,
  MonthlyProductionRecord,
  RiskDriver,
  RecommendedAction,
  EnvironmentalMetric,
  EnvironmentalTrend,
  ModelSpec
} from '../types';

export const MINES_DATA: MineLocation[] = [
  {
    id: 'moil-balaghat',
    name: 'MOIL DEMO MINE (Balaghat Mine)',
    state: 'Madhya Pradesh',
    district: 'Balaghat',
    coordinates: [21.875, 80.185],
    type: 'Underground',
    operator: 'MOIL Limited (Govt. of India Enterprise)',
    totalBlocks: 24,
    estimatedReserve: 450000,
    viableReserve: 320000,
    prospectivity: 87,
    annualTarget: 120000,
    currentMonthlyRate: 9000,
    shortfallRisk: 78,
    riskLevel: 'HIGH',
    overallStatus: 'ACTION REQUIRED',
    description: "Flagship demonstration underground mine situated in the Sausar Group rock formations. High-grade braunite-psilomelane ore body."
  },
  {
    id: 'moil-dongri',
    name: 'MOIL Dongri Buzurg Mine',
    state: 'Maharashtra',
    district: 'Bhandara',
    coordinates: [21.554, 79.692],
    type: 'Opencast',
    operator: 'MOIL Limited',
    totalBlocks: 16,
    estimatedReserve: 380000,
    viableReserve: 295000,
    prospectivity: 82,
    annualTarget: 95000,
    currentMonthlyRate: 7800,
    shortfallRisk: 42,
    riskLevel: 'MEDIUM',
    overallStatus: 'MONITORING',
    description: "Major opencast manganese deposit famous for battery-grade manganese dioxide dioxide (MnO2) ore."
  },
  {
    id: 'moil-chikla',
    name: 'MOIL Chikla Mine',
    state: 'Maharashtra',
    district: 'Bhandara',
    coordinates: [21.551, 79.761],
    type: 'Underground',
    operator: 'MOIL Limited',
    totalBlocks: 14,
    estimatedReserve: 290000,
    viableReserve: 210000,
    prospectivity: 76,
    annualTarget: 70000,
    currentMonthlyRate: 5900,
    shortfallRisk: 55,
    riskLevel: 'MEDIUM',
    overallStatus: 'MONITORING',
    description: "Deep-seated manganese vein formation requiring precision geotechnical stress monitoring."
  },
  {
    id: 'moil-tirodi',
    name: 'MOIL Tirodi Mine',
    state: 'Madhya Pradesh',
    district: 'Balaghat',
    coordinates: [21.685, 79.724],
    type: 'Mixed',
    operator: 'MOIL Limited',
    totalBlocks: 12,
    estimatedReserve: 210000,
    viableReserve: 165000,
    prospectivity: 69,
    annualTarget: 55000,
    currentMonthlyRate: 4800,
    shortfallRisk: 34,
    riskLevel: 'LOW',
    overallStatus: 'OPTIMAL',
    description: "Historic opencast lease with peripheral underground vein expansions."
  }
];

export const MINING_BLOCKS: MiningBlock[] = [
  {
    id: 'BLOCK A01',
    name: 'Block A01 (North Vein)',
    mineId: 'moil-balaghat',
    center: [21.880, 80.184],
    coordinates: [
      [21.878, 80.180],
      [21.884, 80.183],
      [21.882, 80.190],
      [21.876, 80.187]
    ],
    prospectivity: 91,
    classification: 'HIGH',
    estimatedReserve: 68000,
    viableReserve: 54000,
    predictedGrade: 44.2,
    depth: 145,
    productionPriority: 'HIGH',
    shortfallContribution: 12,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Quartzite & Gondite',
    economicViability: 89,
    recommendedAction: 'Prioritize Block A01 for production planning to capture high-grade ore yield.',
    riskLevel: 'MEDIUM',
    elevation: 334
  },
  {
    id: 'BLOCK A02',
    name: 'Block A02 (Central Fault)',
    mineId: 'moil-balaghat',
    center: [21.874, 80.189],
    coordinates: [
      [21.873, 80.184],
      [21.878, 80.187],
      [21.876, 80.194],
      [21.870, 80.191]
    ],
    prospectivity: 84,
    classification: 'HIGH',
    estimatedReserve: 51000,
    viableReserve: 41000,
    predictedGrade: 42.8,
    depth: 178,
    productionPriority: 'HIGH',
    shortfallContribution: 15,
    status: 'DEVELOPMENT',
    rockType: 'Manganese Silicate Gondite',
    economicViability: 84,
    recommendedAction: 'Accelerate stoping preparation; ensure haulage shaft availability.',
    riskLevel: 'HIGH',
    elevation: 326
  },
  {
    id: 'BLOCK A03',
    name: 'Block A03 (East Flank)',
    mineId: 'moil-balaghat',
    center: [21.886, 80.189],
    coordinates: [
      [21.884, 80.183],
      [21.890, 80.186],
      [21.888, 80.193],
      [21.882, 80.190]
    ],
    prospectivity: 62,
    classification: 'MEDIUM',
    estimatedReserve: 42000,
    viableReserve: 29000,
    predictedGrade: 38.5,
    depth: 210,
    productionPriority: 'MEDIUM',
    shortfallContribution: 22,
    status: 'DEVELOPMENT',
    rockType: 'Mica Schist & Braunite',
    economicViability: 73,
    recommendedAction: 'Coordinate blasting to avoid geotechnical fracture propagation.',
    riskLevel: 'HIGH',
    elevation: 318
  },
  {
    id: 'BLOCK A04',
    name: 'Block A04 (South Boundary)',
    mineId: 'moil-balaghat',
    center: [21.869, 80.183],
    coordinates: [
      [21.868, 80.178],
      [21.873, 80.181],
      [21.871, 80.188],
      [21.865, 80.185]
    ],
    prospectivity: 31,
    classification: 'LOW',
    estimatedReserve: 19000,
    viableReserve: 8500,
    predictedGrade: 29.4,
    depth: 95,
    productionPriority: 'LOW',
    shortfallContribution: 8,
    status: 'EXPLORATION',
    rockType: 'Biotite Gneiss',
    economicViability: 46,
    recommendedAction: 'Defer capital expenditure until core drilling proves seam continuity.',
    riskLevel: 'LOW',
    elevation: 342
  },
  {
    id: 'BLOCK A05',
    name: 'Block A05 (Deep Hanging Wall)',
    mineId: 'moil-balaghat',
    center: [21.882, 80.197],
    coordinates: [
      [21.880, 80.192],
      [21.885, 80.195],
      [21.883, 80.202],
      [21.877, 80.199]
    ],
    prospectivity: 89,
    classification: 'HIGH',
    estimatedReserve: 72000,
    viableReserve: 58000,
    predictedGrade: 45.1,
    depth: 245,
    productionPriority: 'HIGH',
    shortfallContribution: 16,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Braunite-rich Gondite',
    economicViability: 88,
    recommendedAction: 'Prioritize continuous ventilation and raise-boring equipment deployment.',
    riskLevel: 'MEDIUM',
    elevation: 310
  },
  {
    id: 'BLOCK A06',
    name: 'Block A06 (South-East Lobe)',
    mineId: 'moil-balaghat',
    center: [21.865, 80.191],
    coordinates: [
      [21.864, 80.186],
      [21.870, 80.189],
      [21.868, 80.196],
      [21.861, 80.193]
    ],
    prospectivity: 74,
    classification: 'MEDIUM',
    estimatedReserve: 38000,
    viableReserve: 28000,
    predictedGrade: 40.6,
    depth: 130,
    productionPriority: 'MEDIUM',
    shortfallContribution: 14,
    status: 'PLANNED',
    rockType: 'Manganese Amphibolite',
    economicViability: 77,
    recommendedAction: 'Synchronize production haulage with main level 4 transport loop.',
    riskLevel: 'MEDIUM',
    elevation: 338
  },
  {
    id: 'BLOCK A07',
    name: 'Block A07 (North Exploration Target)',
    mineId: 'moil-balaghat',
    center: [21.891, 80.193],
    coordinates: [
      [21.889, 80.188],
      [21.895, 80.191],
      [21.893, 80.198],
      [21.886, 80.195]
    ],
    prospectivity: 94,
    classification: 'HIGH',
    estimatedReserve: 84000,
    viableReserve: 65000,
    predictedGrade: 46.8,
    depth: 280,
    productionPriority: 'HIGH',
    shortfallContribution: 9,
    status: 'EXPLORATION',
    rockType: 'High-Purity Braunite Seam',
    economicViability: 92,
    recommendedAction: 'Fast-track exploratory drill holes D-204 through D-212 to convert inferred to measured reserve.',
    riskLevel: 'HIGH',
    elevation: 295
  },
  {
    id: 'BLOCK A08',
    name: 'Block A08 (East Boundary Extension)',
    mineId: 'moil-balaghat',
    center: [21.872, 80.201],
    coordinates: [
      [21.871, 80.195],
      [21.876, 80.198],
      [21.874, 80.206],
      [21.868, 80.203]
    ],
    prospectivity: 48,
    classification: 'LOW',
    estimatedReserve: 24000,
    viableReserve: 12000,
    predictedGrade: 32.1,
    depth: 165,
    productionPriority: 'LOW',
    shortfallContribution: 6,
    status: 'PLANNED',
    rockType: 'Ferruginous Manganese Quartzite',
    economicViability: 58,
    recommendedAction: 'Schedule for secondary beneficiation testing; low metallurgical grade.',
    riskLevel: 'LOW',
    elevation: 320
  },
  // MOIL Dongri Buzurg Mine Blocks
  {
    id: 'BLOCK D01',
    name: 'Block D01 (Main Pit Crest)',
    mineId: 'moil-dongri',
    center: [21.556, 79.692],
    coordinates: [
      [21.554, 79.689],
      [21.558, 79.691],
      [21.557, 79.696],
      [21.552, 79.694]
    ],
    prospectivity: 88,
    classification: 'HIGH',
    estimatedReserve: 58000,
    viableReserve: 47000,
    predictedGrade: 45.8,
    depth: 85,
    productionPriority: 'HIGH',
    shortfallContribution: 10,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Cryptomelane & Pyrolusite',
    economicViability: 91,
    recommendedAction: 'Accelerate overburden stripping to maintain battery-grade MnO2 output.',
    riskLevel: 'MEDIUM',
    elevation: 285
  },
  {
    id: 'BLOCK D02',
    name: 'Block D02 (Battery Grade Zone)',
    mineId: 'moil-dongri',
    center: [21.552, 79.696],
    coordinates: [
      [21.550, 79.693],
      [21.555, 79.695],
      [21.553, 79.700],
      [21.548, 79.698]
    ],
    prospectivity: 84,
    classification: 'HIGH',
    estimatedReserve: 46000,
    viableReserve: 38000,
    predictedGrade: 43.4,
    depth: 110,
    productionPriority: 'HIGH',
    shortfallContribution: 14,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Supergene Manganese Oxide',
    economicViability: 86,
    recommendedAction: 'Coordinate pit dewatering pumps prior to monsoon ingress.',
    riskLevel: 'HIGH',
    elevation: 275
  },
  {
    id: 'BLOCK D03',
    name: 'Block D03 (South-West Extension)',
    mineId: 'moil-dongri',
    center: [21.549, 79.688],
    coordinates: [
      [21.547, 79.685],
      [21.552, 79.687],
      [21.550, 79.692],
      [21.545, 79.690]
    ],
    prospectivity: 72,
    classification: 'MEDIUM',
    estimatedReserve: 34000,
    viableReserve: 25000,
    predictedGrade: 39.2,
    depth: 135,
    productionPriority: 'MEDIUM',
    shortfallContribution: 12,
    status: 'DEVELOPMENT',
    rockType: 'Siliceous Manganese Ore',
    economicViability: 76,
    recommendedAction: 'Construct haul road ramp connecting Level 3 to primary crusher.',
    riskLevel: 'LOW',
    elevation: 260
  },
  // MOIL Chikla Mine Blocks
  {
    id: 'BLOCK C01',
    name: 'Block C01 (Underground Winze 1)',
    mineId: 'moil-chikla',
    center: [21.553, 79.762],
    coordinates: [
      [21.551, 79.759],
      [21.555, 79.761],
      [21.554, 79.766],
      [21.549, 79.764]
    ],
    prospectivity: 82,
    classification: 'HIGH',
    estimatedReserve: 52000,
    viableReserve: 41000,
    predictedGrade: 43.9,
    depth: 165,
    productionPriority: 'HIGH',
    shortfallContribution: 11,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Braunite & Gondite Vein',
    economicViability: 85,
    recommendedAction: 'Reinforce crown pillar supports and ensure hoist cage capacity.',
    riskLevel: 'MEDIUM',
    elevation: 290
  },
  {
    id: 'BLOCK C02',
    name: 'Block C02 (Footwall Drift)',
    mineId: 'moil-chikla',
    center: [21.548, 79.765],
    coordinates: [
      [21.546, 79.762],
      [21.551, 79.764],
      [21.549, 79.769],
      [21.544, 79.767]
    ],
    prospectivity: 75,
    classification: 'MEDIUM',
    estimatedReserve: 39000,
    viableReserve: 30000,
    predictedGrade: 41.5,
    depth: 195,
    productionPriority: 'MEDIUM',
    shortfallContribution: 15,
    status: 'DEVELOPMENT',
    rockType: 'Manganese Schist',
    economicViability: 79,
    recommendedAction: 'Drill drainage relief holes to prevent footwall hydraulic pressure.',
    riskLevel: 'HIGH',
    elevation: 270
  },
  // MOIL Tirodi Mine Blocks
  {
    id: 'BLOCK T01',
    name: 'Block T01 (Hill Top Quarry)',
    mineId: 'moil-tirodi',
    center: [21.687, 79.725],
    coordinates: [
      [21.685, 79.722],
      [21.689, 79.724],
      [21.688, 79.729],
      [21.683, 79.727]
    ],
    prospectivity: 78,
    classification: 'MEDIUM',
    estimatedReserve: 44000,
    viableReserve: 35000,
    predictedGrade: 42.1,
    depth: 65,
    productionPriority: 'HIGH',
    shortfallContribution: 8,
    status: 'ACTIVE_EXTRACTION',
    rockType: 'Braunite & Quartzite',
    economicViability: 82,
    recommendedAction: 'Optimize blasting patterns to reduce fines generation.',
    riskLevel: 'LOW',
    elevation: 350
  },
  {
    id: 'BLOCK T02',
    name: 'Block T02 (Sub-level Crosscut)',
    mineId: 'moil-tirodi',
    center: [21.682, 79.728],
    coordinates: [
      [21.680, 79.725],
      [21.685, 79.727],
      [21.683, 79.732],
      [21.678, 79.730]
    ],
    prospectivity: 65,
    classification: 'MEDIUM',
    estimatedReserve: 31000,
    viableReserve: 21000,
    predictedGrade: 37.8,
    depth: 120,
    productionPriority: 'MEDIUM',
    shortfallContribution: 13,
    status: 'DEVELOPMENT',
    rockType: 'Gondite Manganese',
    economicViability: 71,
    recommendedAction: 'Conduct exploratory diamond core drilling to confirm depth extension.',
    riskLevel: 'MEDIUM',
    elevation: 325
  }
];

export const EXECUTIVE_KPIS = {
  prospectivity: 87,
  prospectivityLabel: 'HIGH',
  estimatedReserve: 450000,
  viableReserve: 320000,
  production12Month: 103000,
  annualTarget: 120000,
  projectedGap: 17000,
  shortfallProbability: 78,
  shortfallLabel: 'HIGH RISK',
  overallStatus: 'ACTION REQUIRED',
  overallPriority: 'HIGH PRIORITY',
  averageGrade: 42.7,
  highGradeBlocks: 18,
  economicViability: 81,
  forecastConfidence: 84,
  currentMonthlyProduction: 9000,
  productionCapacity: 11500
};

export const MONTHLY_PRODUCTION_DATA: MonthlyProductionRecord[] = [
  // Historical 6 months
  { month: 'Mar 2026', historical: 8800, target: 10000 },
  { month: 'Apr 2026', historical: 9200, target: 10000 },
  { month: 'May 2026', historical: 9100, target: 10000 },
  { month: 'Jun 2026', historical: 7900, target: 10000 }, // monsoon dip
  { month: 'Jul 2026', historical: 7400, target: 10000 }, // monsoon dip
  { month: 'Aug 2026', historical: 8600, target: 10000 },
  // Current month
  { month: 'Sep 2026', historical: 9000, forecast: 9000, target: 10000, confidenceLower: 8600, confidenceUpper: 9400 },
  // Forecast next 11 months (totaling 103,000 T for 12 months)
  { month: 'Oct 2026', forecast: 9300, target: 10000, confidenceLower: 8800, confidenceUpper: 9800 },
  { month: 'Nov 2026', forecast: 9600, target: 10000, confidenceLower: 9100, confidenceUpper: 10100 },
  { month: 'Dec 2026', forecast: 9400, target: 10000, confidenceLower: 8900, confidenceUpper: 9900 },
  { month: 'Jan 2027', forecast: 9100, target: 10000, confidenceLower: 8500, confidenceUpper: 9600 },
  { month: 'Feb 2027', forecast: 8900, target: 10000, confidenceLower: 8300, confidenceUpper: 9400 },
  { month: 'Mar 2027', forecast: 9200, target: 10000, confidenceLower: 8600, confidenceUpper: 9700 },
  { month: 'Apr 2027', forecast: 8800, target: 10000, confidenceLower: 8200, confidenceUpper: 9300 },
  { month: 'May 2027', forecast: 8600, target: 10000, confidenceLower: 8000, confidenceUpper: 9100 },
  { month: 'Jun 2027', forecast: 7200, target: 10000, confidenceLower: 6600, confidenceUpper: 7800 },
  { month: 'Jul 2027', forecast: 6900, target: 10000, confidenceLower: 6200, confidenceUpper: 7500 },
  { month: 'Aug 2027', forecast: 8000, target: 10000, confidenceLower: 7400, confidenceUpper: 8600 }
];

export const RISK_DRIVERS: RiskDriver[] = [
  {
    id: 'rd-1',
    name: 'Equipment Downtime',
    percentage: 32,
    description: 'Underground LHD loaders and haulage locomotives exceeding scheduled maintenance intervals.',
    impactTonnes: 5440,
    mitigation: 'Implement predictive vibration telemetry and pre-stage replacement hydraulic cylinders.'
  },
  {
    id: 'rd-2',
    name: 'Production Capacity',
    percentage: 27,
    description: 'Skip hoisting capacity bottleneck at Shaft #2 limiting hoisted tonnage to 340 T/shift.',
    impactTonnes: 4590,
    mitigation: 'Upgrade hoist motor cycle times and divert auxiliary muck through incline drift.'
  },
  {
    id: 'rd-3',
    name: 'Weather Conditions',
    percentage: 18,
    description: 'Monsoon seepage into sublevel 3 increasing pumping overhead and ground softening.',
    impactTonnes: 3060,
    mitigation: 'Deploy high-head submersible dewatering pumps and apply shotcrete stabilization.'
  },
  {
    id: 'rd-4',
    name: 'Blasting Delays',
    percentage: 14,
    description: 'Explosive delivery and ventilation clearing times creating a 45-minute daily operational pause.',
    impactTonnes: 2380,
    mitigation: 'Transition to electronic delay detonators and high-velocity auxiliary exhaust fans.'
  },
  {
    id: 'rd-5',
    name: 'Reserve Constraints',
    percentage: 9,
    description: 'Localized shearing along hanging wall reducing stope extraction recovery factor.',
    impactTonnes: 1530,
    mitigation: 'Adjust stope geometry with cable-bolting pattern re-engineering.'
  }
];

export const RECOMMENDED_ACTIONS: RecommendedAction[] = [
  {
    id: 'act-1',
    priority: 'HIGH',
    title: 'Optimize Equipment Allocation',
    reason: 'Heavy excavator and LHD loader downtime accounts for 32% of projected production gap (5,440 T deficit).',
    expectedObjective: 'Restore fleet operational availability from 74% to 89%, recovering ~4,200 T/month.',
    category: 'EQUIPMENT',
    status: 'APPROVED',
    estimatedImpact: '+4,200 T / month'
  },
  {
    id: 'act-2',
    priority: 'HIGH',
    title: 'Prioritize High-Grade Blocks',
    reason: 'Blocks A01 and A07 possess >44% Mn grade and over 119,000 T viable reserve with minimal overburden.',
    expectedObjective: 'Re-align stoping sequences towards A01 & A07 to maximize metallurgical recovery and unit revenue.',
    category: 'GEOLOGY',
    status: 'IN_PROGRESS',
    estimatedImpact: '+2.8% Average Ore Grade'
  },
  {
    id: 'act-3',
    priority: 'MEDIUM',
    title: 'Optimize Blasting Schedule',
    reason: 'Secondary blasting and toxic gas clearing currently idling shifts for 11.2 hours per week.',
    expectedObjective: 'Implement automated blast telemetry and timed micro-delays to eliminate 6 hours of idle stope time.',
    category: 'BLASTING',
    status: 'PENDING',
    estimatedImpact: '+1,450 T / month'
  },
  {
    id: 'act-4',
    priority: 'MEDIUM',
    title: 'Adjust Production Schedule',
    reason: 'Peak monsoon months (June-July) historically suffer 26% production dips due to drainage bottlenecks.',
    expectedObjective: 'Front-load extraction targets during high-yield dry months (October through May).',
    category: 'SCHEDULE',
    status: 'APPROVED',
    estimatedImpact: 'Buffer 8,000 T pre-monsoon'
  },
  {
    id: 'act-5',
    priority: 'MEDIUM',
    title: 'Monitor Weather Conditions',
    reason: 'Satellite rainfall forecasts indicate a 112mm precipitation event over the Balaghat catchment.',
    expectedObjective: 'Pre-drain sump reservoirs and inspect underground drainage channels 48h prior to rainfall peaks.',
    category: 'WEATHER',
    status: 'IN_PROGRESS',
    estimatedImpact: 'Prevent 4-day inundation outage'
  }
];

export const ENVIRONMENTAL_CURRENT: EnvironmentalMetric = {
  rainfall: 112,
  soilMoisture: 0.42,
  ndvi: 0.61,
  landSurfaceTemperature: 31.4,
  pitStabilityIndex: 88,
  windSpeed: 14.5
};

export const ENVIRONMENTAL_TRENDS: EnvironmentalTrend[] = [
  { date: 'Apr 2026', rainfall: 22, soilMoisture: 0.21, ndvi: 0.45, temperature: 38.2 },
  { date: 'May 2026', rainfall: 48, soilMoisture: 0.28, ndvi: 0.50, temperature: 40.5 },
  { date: 'Jun 2026', rainfall: 185, soilMoisture: 0.56, ndvi: 0.68, temperature: 32.1 },
  { date: 'Jul 2026', rainfall: 240, soilMoisture: 0.64, ndvi: 0.74, temperature: 29.8 },
  { date: 'Aug 2026', rainfall: 168, soilMoisture: 0.52, ndvi: 0.70, temperature: 30.2 },
  { date: 'Sep 2026', rainfall: 112, soilMoisture: 0.42, ndvi: 0.61, temperature: 31.4 }
];

export const MODEL_SPECS: ModelSpec[] = [
  {
    id: 'model-1',
    modelNumber: 'MODEL 01',
    name: 'Manganese Prospectivity Prediction',
    shortName: 'Prospectivity Model',
    status: 'READY',
    algorithm: 'Spatial Bayesian Deep Neural Network & Random Forest Ensemble',
    accuracy: '91.4%',
    f1Score: '0.89',
    latency: '142 ms',
    trainingSamples: '42,800 Core Drill Points + Satellite Bands',
    lastTrained: '28 Aug 2026',
    description: 'Fuses geological core logs, magnetic anomalies, gravimetric surveys, and multispectral reflectance to delineate prospective manganese zones.',
    inputFeatures: ['Magnetic Susceptibility', 'Gravity Anomaly (mGal)', 'Sentinel-2 Band 11/12 SWIR Ratio', 'Apatite-Braunite Index', 'Lithological Proximity']
  },
  {
    id: 'model-2',
    modelNumber: 'MODEL 02',
    name: 'Manganese Reserve Estimation',
    shortName: 'Reserve Estimator',
    status: 'READY',
    algorithm: 'Geostatistical Indicator Kriging & 3D Spatial Transformer',
    accuracy: '88.7%',
    f1Score: '0.86',
    latency: '185 ms',
    trainingSamples: '18,400 Assay Boreholes (1998-2026)',
    lastTrained: '02 Sep 2026',
    description: 'Computes continuous 3D grade block models, classified into Measured, Indicated, and Inferred tonnage conforming to UNFC/CRIRSCO standards.',
    inputFeatures: ['Core Depth Interval', 'XRF Assay Mn%', 'SiO2/P Ratio', 'Bulk Density (g/cm3)', 'Dip & Strike Discontinuity']
  },
  {
    id: 'model-3',
    modelNumber: 'MODEL 03',
    name: 'Manganese Production Forecast',
    shortName: 'Production Forecaster',
    status: 'READY',
    algorithm: 'Temporal Fusion Transformer (TFT) with Monte Carlo Dropout',
    accuracy: '93.2%',
    f1Score: '0.91',
    latency: '118 ms',
    trainingSamples: '120 Months Shift-by-Shift Telemetry',
    lastTrained: '04 Sep 2026',
    description: 'Forecasts 12-month rolling extraction rates based on stope cycles, tramming capacity, workforce allocation, and ore grade.',
    inputFeatures: ['Active Stope Count', 'Drill-Blast Muck Tonnage', 'Haulage Availability %', 'Ventilation Index', 'Seasonal Precipitation Lag']
  },
  {
    id: 'model-4',
    modelNumber: 'MODEL 04',
    name: 'Manganese Production Shortfall Risk',
    shortName: 'Shortfall Risk Analyzer',
    status: 'READY',
    algorithm: 'Extreme Gradient Boosting (XGBoost) + SHAP Value Attribution',
    accuracy: '89.8%',
    f1Score: '0.88',
    latency: '95 ms',
    trainingSamples: '6,200 Shift Deviation Events',
    lastTrained: '05 Sep 2026',
    description: 'Predicts the probability and root drivers of failing monthly/annual extraction quotas under stochastic equipment and climate shocks.',
    inputFeatures: ['Equipment MTBF / MTTR', 'Shaft Hoist Cycle Variance', 'Overburden Stripping Ratio', '72h Rainfall Probability', 'Explosive Magazine Supply']
  },
  {
    id: 'decision-engine',
    modelNumber: 'DECISION ENGINE',
    name: 'Prescriptive Mining Action Engine',
    shortName: 'Decision Intelligence',
    status: 'READY',
    algorithm: 'Constraint-Satisfaction Mixed Integer Linear Programming (MILP)',
    accuracy: '96.5%',
    f1Score: '0.94',
    latency: '68 ms',
    trainingSamples: '1,400 MOIL Expert Mining Operational Guidelines',
    lastTrained: '05 Sep 2026',
    description: 'Synthesizes outputs from all 4 ML models to output optimal block prioritization, stope schedules, and risk-mitigation measures.',
    inputFeatures: ['Model 1 Probabilities', 'Model 2 Viable Tonnes', 'Model 3 Target Gaps', 'Model 4 Risk Weights', 'DGMS Mine Safety Regulations']
  }
];

export const GRADE_DISTRIBUTION_DATA = [
  { grade: '< 30% Low Grade', tonnage: 45000, percentage: 10 },
  { grade: '30% - 35% Medium-Low', tonnage: 85000, percentage: 19 },
  { grade: '35% - 40% Standard', tonnage: 130000, percentage: 29 },
  { grade: '40% - 45% High Grade', tonnage: 125000, percentage: 28 },
  { grade: '> 45% Premium Metallurgical', tonnage: 65000, percentage: 14 }
];

export const VIABILITY_DONUT_DATA = [
  { name: 'Viable Reserve (Economic)', value: 320000, color: '#10b981' },
  { name: 'Marginal / Non-Viable', value: 130000, color: '#64748b' }
];

export const BLOCK_RESERVE_COMPARISON = [
  { block: 'A01', estimated: 68000, viable: 54000, grade: 44.2 },
  { block: 'A02', estimated: 51000, viable: 41000, grade: 42.8 },
  { block: 'A03', estimated: 42000, viable: 29000, grade: 38.5 },
  { block: 'A04', estimated: 19000, viable: 8500, grade: 29.4 },
  { block: 'A05', estimated: 72000, viable: 58000, grade: 45.1 },
  { block: 'A06', estimated: 38000, viable: 28000, grade: 40.6 },
  { block: 'A07', estimated: 84000, viable: 65000, grade: 46.8 },
  { block: 'A08', estimated: 24000, viable: 12000, grade: 32.1 }
];

export interface DataSourceItem {
  id: string;
  name: string;
  type: string;
  description: string;
  status: string;
  updateFrequency: string;
}

export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'gsi',
    name: 'Geological Survey of India (GSI)',
    type: 'LITHOLOGY & AERO-GEOPHYSICAL',
    description: '1:50,000 baseline geological quadrangle maps, airborne magnetic anomaly grids, and Sausar belt core stratigraphy.',
    status: 'ACTIVE CONNECTION',
    updateFrequency: 'Quarterly Sync'
  },
  {
    id: 'moil-scada',
    name: 'MOIL Mine Production & Shift Telemetry',
    type: 'MINE OPERATIONS & SCADA',
    description: 'Digital stope extraction manifests, ore car weighbridge tallies, shaft hoist cycles, and equipment maintenance logs.',
    status: 'REAL-TIME FEED',
    updateFrequency: 'Shift-Level (8h)'
  },
  {
    id: 'isro-bhuvan',
    name: 'ISRO / Bhuvan Space Platform',
    type: 'SPACE TECHNOLOGY & SATELLITE',
    description: 'Indian Remote Sensing (IRS) Cartosat digital elevation models, thematic land-use maps, and geological structural lineaments.',
    status: 'ACTIVE CONNECTION',
    updateFrequency: 'Bi-Weekly'
  },
  {
    id: 'sentinel-2',
    name: 'ESA Sentinel-2 Multispectral MSI',
    type: 'EARTH OBSERVATION',
    description: '13-band optical and Short-Wave Infrared (SWIR Band 11/12) imagery for mineral alteration indices and NDVI vegetation canopy baseline.',
    status: '5-DAY REVISIT',
    updateFrequency: 'Every 5 Days'
  },
  {
    id: 'nasa-gpm',
    name: 'NASA Global Precipitation Measurement (GPM)',
    type: 'METEOROLOGICAL RADAR',
    description: 'Constellation microwave precipitation and IMERG ground-calibrated rainfall estimates for pit dewatering and landslide hazard modeling.',
    status: 'HOURLY TELEMETRY',
    updateFrequency: '3-Hour Latency'
  },
  {
    id: 'srtm-elevation',
    name: 'NASA SRTM 30m Digital Elevation Model',
    type: 'TOPOGRAPHY & DRAINAGE',
    description: '1-arc-second global topographic elevation for open pit slope stability analysis, drainage catchment delineation, and access haul roads.',
    status: 'STATIC GEODETIC',
    updateFrequency: 'Permanent Baseline'
  }
];

