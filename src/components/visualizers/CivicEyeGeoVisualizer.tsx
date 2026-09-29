import React, { useState } from 'react';
import { Navigation, CheckCircle2, Wrench, Zap, Droplets, Radio, Tractor } from 'lucide-react';

interface VillageNode {
  id: string;
  name: string;
  x: number; // SVG percentage
  y: number;
  population: string;
  activeRequests: number;
  category: 'Solar Microgrid' | 'Water Pump' | 'Electrical Line' | 'Tractor Machinery' | 'Telecom';
  urgency: 'High' | 'Medium' | 'Normal';
}

interface Technician {
  id: string;
  name: string;
  specialty: string;
  currentHub: string;
  status: 'Available' | 'Dispatched' | 'On-Site';
  x: number;
  y: number;
  rating: number;
  completedJobs: number;
}

const VILLAGES: VillageNode[] = [
  { id: 'v1', name: 'Alindra Hub', x: 22, y: 28, population: '3,400', activeRequests: 2, category: 'Solar Microgrid', urgency: 'High' },
  { id: 'v2', name: 'Limda Sector', x: 45, y: 20, population: '5,100', activeRequests: 1, category: 'Water Pump', urgency: 'Medium' },
  { id: 'v3', name: 'Vaghodia Rural', x: 74, y: 35, population: '7,800', activeRequests: 3, category: 'Electrical Line', urgency: 'High' },
  { id: 'v4', name: 'Khandi Hamlet', x: 30, y: 70, population: '2,200', activeRequests: 0, category: 'Telecom', urgency: 'Normal' },
  { id: 'v5', name: 'Dabhoi Outpost', x: 62, y: 75, population: '6,400', activeRequests: 2, category: 'Tractor Machinery', urgency: 'Medium' },
  { id: 'v6', name: 'Jarod Cluster', x: 80, y: 80, population: '4,100', activeRequests: 1, category: 'Solar Microgrid', urgency: 'Normal' },
];

const TECHNICIANS: Technician[] = [
  { id: 't1', name: 'Ramesh Solanki', specialty: 'Solar & Electrical', currentHub: 'Limda Sector', status: 'Available', x: 42, y: 24, rating: 4.9, completedJobs: 142 },
  { id: 't2', name: 'Vikram Patel', specialty: 'Water Pumps & Hydraulics', currentHub: 'Vaghodia Rural', status: 'Dispatched', x: 70, y: 38, rating: 4.8, completedJobs: 98 },
  { id: 't3', name: 'Mukesh Varma', specialty: 'Heavy Agro-Machinery', currentHub: 'Dabhoi Outpost', status: 'Available', x: 58, y: 72, rating: 4.9, completedJobs: 175 },
];

export const CivicEyeGeoVisualizer: React.FC = () => {
  const [selectedVillage, setSelectedVillage] = useState<VillageNode>(VILLAGES[0]);
  const [dispatchedTech, setDispatchedTech] = useState<Technician | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerDispatch = (village: VillageNode) => {
    setSelectedVillage(village);
    setIsSimulating(true);

    let nearest = TECHNICIANS[0];
    let minDistance = 9999;

    TECHNICIANS.forEach((tech) => {
      const dist = Math.hypot(tech.x - village.x, tech.y - village.y);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = tech;
      }
    });

    setTimeout(() => {
      setDispatchedTech(nearest);
      setIsSimulating(false);
    }, 450);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Solar Microgrid': return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'Water Pump': return <Droplets className="w-3.5 h-3.5 text-blue-500" />;
      case 'Electrical Line': return <Zap className="w-3.5 h-3.5 text-rose-500" />;
      case 'Tractor Machinery': return <Tractor className="w-3.5 h-3.5 text-emerald-500" />;
      default: return <Radio className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm w-full max-w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Navigation className="w-4 h-4 shrink-0" />
            <span className="truncate">Interactive Data Visualizer · Project 3</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 break-words">
            CivicEye · Rural Geospatial Dispatch & SLA Hub
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time technician proximity matching via MongoDB 2dsphere indexing and Express REST pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => triggerDispatch(selectedVillage)}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-200 dark:border-amber-500/40 transition-colors cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Matching...' : 'Simulate Nearest ($geoNear)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
        {/* Left: Interactive Geospatial Dispatch Map */}
        <div className="lg:col-span-7 p-4 sm:p-6 space-y-4 min-w-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Vadodara Rural District Map Mesh</span>
            <span className="font-mono text-[11px] text-slate-500">CRS: EPSG:4326 (WGS84 GeoJSON)</span>
          </div>

          {/* SVG Map Container */}
          <div className="relative h-72 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points="22,28 45,20 74,35 62,75 30,70 22,28" fill="none" stroke="#cbd5e1" className="dark:stroke-slate-700" strokeWidth="0.8" strokeDasharray="2 2" />
              <polyline points="45,20 62,75 80,80" fill="none" stroke="#e2e8f0" className="dark:stroke-slate-800" strokeWidth="0.6" />

              {/* Active Route Line when dispatched */}
              {dispatchedTech && (
                <line
                  x1={dispatchedTech.x}
                  y1={dispatchedTech.y}
                  x2={selectedVillage.x}
                  y2={selectedVillage.y}
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
              )}

              {/* Villages / Demand Nodes */}
              {VILLAGES.map((v) => {
                const isSelected = selectedVillage.id === v.id;
                return (
                  <g
                    key={v.id}
                    className="cursor-pointer"
                    onClick={() => triggerDispatch(v)}
                  >
                    <circle
                      cx={v.x}
                      cy={v.y}
                      r={isSelected ? 4.5 : 3.2}
                      fill={isSelected ? '#d97706' : '#ffffff'}
                      className="dark:fill-slate-800"
                      stroke={v.urgency === 'High' ? '#e11d48' : '#2563eb'}
                      strokeWidth="1.2"
                    />
                    <text
                      x={v.x}
                      y={v.y + 5.5}
                      fontSize="3"
                      fill="#475569"
                      className="dark:fill-slate-400"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {v.name}
                    </text>
                  </g>
                );
              })}

              {/* Technicians Markers */}
              {TECHNICIANS.map((t) => (
                <g key={t.id}>
                  <rect
                    x={t.x - 2}
                    y={t.y - 2}
                    width="4"
                    height="4"
                    rx="1"
                    fill="#059669"
                    stroke="#ffffff"
                    strokeWidth="0.6"
                  />
                  <text
                    x={t.x}
                    y={t.y - 3}
                    fontSize="2.4"
                    fill="#047857"
                    className="dark:fill-emerald-400"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {t.name.split(' ')[0]}
                  </text>
                </g>
              ))}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 inline-block" /> Village Node
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-emerald-600 dark:bg-emerald-400 inline-block" /> Field Tech
              </span>
            </div>
          </div>

          {/* Quick Village Select Bar */}
          <div className="grid grid-cols-3 gap-2">
            {VILLAGES.slice(0, 3).map((v) => (
              <button
                key={v.id}
                onClick={() => triggerDispatch(v)}
                className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  selectedVillage.id === v.id
                    ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300 font-medium'
                    : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-slate-900 dark:text-slate-200 truncate">{v.name}</div>
                <div className="text-[10px] text-slate-500">{v.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: MongoDB Query Aggregation Pipeline & Technician Match Card */}
        <div className="lg:col-span-5 p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
          {/* Selected Village Ticket */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                {getCategoryIcon(selectedVillage.category)}
                <span>{selectedVillage.name} Incident Card</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                selectedVillage.urgency === 'High' ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                Urgency: {selectedVillage.urgency}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-[10px] text-slate-400 block">Required Service:</span>
                <span className="text-slate-900 dark:text-slate-200 font-medium">{selectedVillage.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Hub Population:</span>
                <span className="font-mono text-slate-900 dark:text-slate-200">{selectedVillage.population} citizens</span>
              </div>
            </div>
          </div>

          {/* Assigned Technician Output */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Optimal Field Technician Match</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                ETA: ~18 mins
              </span>
            </div>

            {dispatchedTech ? (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{dispatchedTech.name}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold">★ {dispatchedTech.rating} (142+ jobs)</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px]">Specialization: {dispatchedTech.specialty}</div>
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Auto-dispatched via Express REST API endpoint
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center">
                Click any node on the map to trigger automated proximity dispatch.
              </div>
            )}
          </div>

          {/* MongoDB Aggregation Query Pipeline Preview */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <span>MongoDB 2dsphere Geospatial Pipeline</span>
              <span className="font-mono text-blue-600 dark:text-cyan-400 text-[10px]">Latency: 42ms</span>
            </div>
            
            <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto leading-relaxed">
{`db.technicians.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [${selectedVillage.x}.0, ${selectedVillage.y}.0] },
      distanceField: "dist.calculated",
      maxDistance: 25000,
      spherical: true
    }
  },
  { $match: { status: "Available" } },
  { $limit: 1 }
])`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
