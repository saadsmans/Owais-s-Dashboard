import React, { useState, useEffect } from 'react';
import { Activity, Eye, Mic, Play, Pause } from 'lucide-react';

interface ScenarioPreset {
  name: string;
  earBase: number;
  blinkRate: number; // blinks per min
  f0Pitch: number; // Hz
  jitter: number; // %
  shimmer: number; // %
  stressIndex: number; // 0 - 100
  verdict: 'Normal / Truthful Baseline' | 'Moderate Cognitive Load' | 'High Stress / Anomaly Detected';
  description: string;
}

const PRESETS: ScenarioPreset[] = [
  {
    name: "Baseline Calibration (Calm)",
    earBase: 0.32,
    blinkRate: 14,
    f0Pitch: 122,
    jitter: 0.42,
    shimmer: 1.35,
    stressIndex: 12,
    verdict: "Normal / Truthful Baseline",
    description: "Subject exhibits steady Eye Aspect Ratio (EAR 0.32), normal blink frequency (14 bpm), and stable voice fundamental frequency (F0 122 Hz).",
  },
  {
    name: "Cognitive Load / Hesitation",
    earBase: 0.26,
    blinkRate: 26,
    f0Pitch: 168,
    jitter: 1.15,
    shimmer: 3.20,
    stressIndex: 48,
    verdict: "Moderate Cognitive Load",
    description: "Slight micro-furrowing observed. Eye blink frequency accelerated to 26 bpm with moderate acoustic jitter fluctuation.",
  },
  {
    name: "Deception & Stress Anomaly",
    earBase: 0.20,
    blinkRate: 38,
    f0Pitch: 224,
    jitter: 2.45,
    shimmer: 5.80,
    stressIndex: 86,
    verdict: "High Stress / Anomaly Detected",
    description: "Significant micro-expression deviations, rapid blinking (38 bpm), sudden pitch elevation (>220 Hz), and high acoustic shimmer.",
  },
];

export const BehavioralTruthVisualizer: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<ScenarioPreset>(PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [earHistory, setEarHistory] = useState<number[]>(Array(30).fill(0.32));
  const [audioWaveform, setAudioWaveform] = useState<number[]>(Array(36).fill(10));
  const [headPose, setHeadPose] = useState({ pitch: 1.2, yaw: -0.8, roll: 0.3 });
  const [blinkCount, setBlinkCount] = useState(14);

  // Animation frame loop to simulate live MediaPipe & Librosa feature stream
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setEarHistory((prev) => {
        const isBlink = Math.random() < (selectedPreset.blinkRate / 180);
        const noise = (Math.random() - 0.5) * 0.03;
        const nextEar = isBlink ? 0.08 : Math.max(0.12, selectedPreset.earBase + noise);
        
        if (isBlink) {
          setBlinkCount(c => c + 1);
        }
        return [...prev.slice(1), parseFloat(nextEar.toFixed(3))];
      });

      setAudioWaveform((prev) => {
        return prev.map(() => {
          const baseEnergy = (selectedPreset.stressIndex / 100) * 40 + 15;
          const variance = Math.random() * 35;
          return Math.min(85, Math.max(8, baseEnergy + variance));
        });
      });

      setHeadPose({
        pitch: parseFloat(((Math.random() - 0.5) * (selectedPreset.stressIndex > 50 ? 6.5 : 2.0)).toFixed(1)),
        yaw: parseFloat(((Math.random() - 0.5) * (selectedPreset.stressIndex > 50 ? 8.0 : 3.0)).toFixed(1)),
        roll: parseFloat(((Math.random() - 0.5) * (selectedPreset.stressIndex > 50 ? 4.0 : 1.5)).toFixed(1)),
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, selectedPreset]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm w-full max-w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Activity className="w-4 h-4 shrink-0" />
            <span className="truncate">Interactive Data Visualizer · Project 2</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 break-words">
            Multimodal Behavioral Truth & Stress Analysis
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Synchronized computer vision (MediaPipe 468 landmarks) & acoustic voice feature extraction (Librosa).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
            <span>{isPlaying ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>
        </div>
      </div>

      {/* Preset selection bar */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50/80 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 sm:mr-2 shrink-0">Scenarios:</span>
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedPreset(preset);
              setBlinkCount(preset.blinkRate);
            }}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 whitespace-nowrap cursor-pointer ${
              selectedPreset.name === preset.name
                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* Left: Multimodal Signal Displays (Vision & Audio) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stream 1: Computer Vision Landmark & EAR Monitor */}
            <div className="bg-slate-50/70 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>MediaPipe Eye Aspect Ratio (EAR)</span>
                </div>
                <span className="font-mono text-[11px] text-blue-600 dark:text-cyan-400 font-semibold">
                  EAR: {earHistory[earHistory.length - 1]}
                </span>
              </div>

              {/* Real-time EAR Waveform graph */}
              <div className="h-28 bg-white dark:bg-slate-900/90 rounded-xl p-2 border border-slate-200 dark:border-slate-800/80 flex items-end gap-1 overflow-hidden relative shadow-inner">
                {/* Blink threshold reference line */}
                <div className="absolute left-0 right-0 top-[65%] border-b border-dashed border-rose-500/40 pointer-events-none z-10" />
                <span className="absolute top-1 right-2 text-[9px] font-mono text-rose-600 dark:text-rose-400">
                  Blink Line (0.15)
                </span>

                {earHistory.map((val, i) => {
                  const heightPct = Math.min(100, Math.max(5, (val / 0.45) * 100));
                  const isBlink = val < 0.15;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-100"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: isBlink ? '#e11d48' : '#2563eb',
                      }}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[9px]">Pitch</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{headPose.pitch}°</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Yaw</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{headPose.yaw}°</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Roll</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{headPose.roll}°</span>
                </div>
              </div>
            </div>

            {/* Stream 2: Librosa Acoustic Signal Lab */}
            <div className="bg-slate-50/70 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Librosa Acoustic Spectrum & Pitch</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  F0: {selectedPreset.f0Pitch} Hz
                </span>
              </div>

              {/* Real-time Frequency spectrum visualizer */}
              <div className="h-28 bg-white dark:bg-slate-900/90 rounded-xl p-2 border border-slate-200 dark:border-slate-800/80 flex items-end gap-1 overflow-hidden shadow-inner">
                {audioWaveform.map((energy, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t transition-all duration-100"
                    style={{ height: `${energy}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-mono bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[9px]">Acoustic Jitter</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{selectedPreset.jitter}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Shimmer (Amp Var)</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{selectedPreset.shimmer}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multimodal Timeline & Synced Signal Log */}
          <div className="bg-slate-50/70 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Behavioral Diagnostic Summary</span>
              <span className="text-slate-500 font-mono text-[11px]">Stream: 30 FPS · 22,050 Hz Audio</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed shadow-xs">
              {selectedPreset.description}
            </p>
          </div>
        </div>

        {/* Right: Fusion Gauge & Anomaly Probability */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50/70 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 text-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Fused Stress Anomaly Index
            </span>

            {/* Circular score gauge */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#cbd5e1"
                  className="dark:stroke-slate-800"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={selectedPreset.stressIndex > 70 ? '#e11d48' : selectedPreset.stressIndex > 35 ? '#d97706' : '#059669'}
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * selectedPreset.stressIndex) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {selectedPreset.stressIndex}%
                </span>
                <span className="text-[10px] text-slate-500 uppercase">Stress Score</span>
              </div>
            </div>

            {/* Classification Badge */}
            <div className={`p-2.5 rounded-xl border text-xs font-semibold ${
              selectedPreset.stressIndex > 70
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-500/30'
                : selectedPreset.stressIndex > 35
                ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
            }`}>
              {selectedPreset.verdict}
            </div>

            {/* Feature Weights Breakdown */}
            <div className="space-y-2 text-left pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Eye Blink Frequency</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{blinkCount} bpm</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Voice Pitch Tension (F0)</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">{selectedPreset.f0Pitch} Hz</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">Facial Micro-Asymmetry</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {selectedPreset.stressIndex > 50 ? '4.8 mm dev' : '0.9 mm dev'}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">WebRTC Latency</span>
                <span className="font-mono text-blue-600 dark:text-cyan-400 font-semibold">18ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
