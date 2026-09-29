import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { FinancialRAGVisualizer } from '../visualizers/FinancialRAGVisualizer';
import { BehavioralTruthVisualizer } from '../visualizers/BehavioralTruthVisualizer';
import { CivicEyeGeoVisualizer } from '../visualizers/CivicEyeGeoVisualizer';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface ProjectsViewProps {
  initialProjectId?: string;
  onNavigate: (tab: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ initialProjectId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(initialProjectId || 'privacy-guard-ai');
  const [expandedTab, setExpandedTab] = useState<'visualizer' | 'pipeline' | 'code'>('visualizer');

  const categories = ['All', 'RAG & NLP', 'Computer Vision & Audio', 'Full-Stack & Cloud'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const currentProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

  const renderVisualizer = (id: string) => {
    switch (id) {
      case 'privacy-guard-ai':
        return <FinancialRAGVisualizer />;
      case 'behavioral-truth-analysis':
        return <BehavioralTruthVisualizer />;
      case 'civiceye-rural-service':
        return <CivicEyeGeoVisualizer />;
      default:
        return <FinancialRAGVisualizer />;
    }
  };

  const getCodeSnippet = (id: string) => {
    switch (id) {
      case 'privacy-guard-ai':
        return `# Privacy-Guard AI: RAG Pipeline with Automated PII Masking
import re
import chromadb
from chromadb.utils import embedding_functions

class PrivacyGuardRAG:
    def __init__(self, collection_name="financial_docs"):
        self.chroma_client = chromadb.Client()
        self.embed_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        self.collection = self.chroma_client.get_or_create_collection(
            name=collection_name, 
            embedding_function=self.embed_fn
        )
        
    def mask_pii(self, text: str) -> str:
        """Sanitizes PAN, Bank Accounts, and Names before vector embedding."""
        text = re.sub(r'\\b\\d{9,18}\\b', '[REDACTED_ACCT]', text)
        text = re.sub(r'\\b[A-Z]{5}[0-9]{4}[A-Z]{1}\\b', '[REDACTED_PAN]', text)
        text = re.sub(r'\\b\\d{3}-\\d{2}-\\d{4}\\b', '[REDACTED_SSN]', text)
        return text

    def ingest_document_chunks(self, chunks: list[dict]):
        sanitized_texts = [self.mask_pii(c["text"]) for c in chunks]
        ids = [c["id"] for c in chunks]
        metadatas = [{"source": c["source"], "category": c["category"]} for c in chunks]
        
        self.collection.add(
            documents=sanitized_texts,
            metadatas=metadatas,
            ids=ids
        )

    def query(self, user_query: str, top_k: int = 5):
        results = self.collection.query(
            query_texts=[user_query],
            n_results=top_k
        )
        return results`;

      case 'behavioral-truth-analysis':
        return `# AI-Based Behavioral Truth Analysis: Multimodal Signal Engine
import cv2
import mediapipe as mp
import numpy as np
import librosa

class MultimodalAnalyzer:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5
        )
        
    def calculate_ear(self, landmarks, eye_indices):
        p2_p6 = np.linalg.norm(landmarks[eye_indices[1]] - landmarks[eye_indices[5]])
        p3_p5 = np.linalg.norm(landmarks[eye_indices[2]] - landmarks[eye_indices[4]])
        p1_p4 = np.linalg.norm(landmarks[eye_indices[0]] - landmarks[eye_indices[3]])
        return float((p2_p6 + p3_p5) / (2.0 * p1_p4))

    def extract_acoustic_features(self, audio_chunk, sr=22050):
        pitches, magnitudes = librosa.piptrack(y=audio_chunk, sr=sr)
        f0 = pitches[magnitudes > np.median(magnitudes)]
        mean_pitch = np.mean(f0) if len(f0) > 0 else 0.0
        mfccs = librosa.feature.mfcc(y=audio_chunk, sr=sr, n_mfcc=13)
        jitter = np.std(np.diff(f0)) / (mean_pitch + 1e-6) if len(f0) > 1 else 0.0
        
        return {
            "mean_pitch_hz": float(mean_pitch),
            "jitter_ratio": float(jitter),
            "mfcc_energy": float(np.mean(mfccs))
        }`;

      case 'civiceye-rural-service':
        return `// CivicEye: Express.js & MongoDB 2dsphere Geospatial Dispatch
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Nearest Technician Aggregation
router.post('/api/dispatch/match', async (req, res) => {
  const { lng, lat, serviceCategory, maxDistanceMeters = 25000 } = req.body;

  try {
    const technicians = await Technician.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: 'distanceMeters',
          maxDistance: maxDistanceMeters,
          query: { status: 'Available', specialties: serviceCategory },
          spherical: true
        }
      },
      { $sort: { distanceMeters: 1, rating: -1 } },
      { $limit: 3 }
    ]);

    res.json({ success: true, matches: technicians });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;`;

      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span>Academic Project Portfolio & Data Visualizers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered Systems & Interactive Visualization Labs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Each project is built to solve structured and unstructured data challenges. Below, you can inspect their architecture, execute live parameter simulations, and review production-grade code.
        </p>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Selector Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProjects.map((p) => {
          const isSelected = p.id === activeProjectId;
          return (
            <div
              key={p.id}
              onClick={() => setActiveProjectId(p.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-blue-600 dark:border-cyan-500/50 shadow-md shadow-blue-500/10 dark:shadow-cyan-950/30 ring-1 ring-blue-600/20'
                  : 'bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-mono text-blue-600 dark:text-cyan-400 font-semibold">{p.category}</span>
                <span>{p.timeline.split('·')[1]?.trim() || '2024'}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                {p.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {p.subtitle}
              </p>
              
              {/* Unboxed tech stack */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {p.techStack.slice(0, 4).join(' · ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Project Full Detail Console */}
      <div className="space-y-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        {/* Project Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-blue-600 dark:text-cyan-400 font-semibold">{currentProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{currentProject.timeline}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight break-words">
              {currentProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {currentProject.summary}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
            {currentProject.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
                <div className="text-sm sm:text-base font-bold font-mono text-blue-600 dark:text-cyan-400 tabular-nums">{m.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation for Visualizer / Architecture / Code */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setExpandedTab('visualizer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer ${
              expandedTab === 'visualizer'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Data Visualizer</span>
          </button>

          <button
            onClick={() => setExpandedTab('pipeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer ${
              expandedTab === 'pipeline'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pipeline Architecture</span>
          </button>

          <button
            onClick={() => setExpandedTab('code')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer ${
              expandedTab === 'code'
                ? 'bg-slate-900 text-white dark:bg-cyan-500/20 dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-900/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Source Code Implementation</span>
          </button>
        </div>

        {/* Tab 1: Interactive Data Visualizer */}
        {expandedTab === 'visualizer' && (
          <div className="space-y-4">
            {renderVisualizer(currentProject.id)}
          </div>
        )}

        {/* Tab 2: Architecture & Pipeline Stages */}
        {expandedTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Technical Architecture Notes</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {currentProject.architectureNotes}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProject.pipelineStages.map((stage, idx) => (
                <div key={idx} className="bg-slate-50/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{stage.title}</span>
                    <span className="font-mono text-[11px] text-blue-600 dark:text-cyan-400 font-semibold">{stage.tech}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider block">
                Datasets & Ground Truth Sources
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentProject.datasetInfo}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Code Implementation */}
        {expandedTab === 'code' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono">Production Module Implementation</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">Python / Node.js</span>
            </div>
            <pre className="p-4 bg-slate-900 dark:bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 text-xs font-mono overflow-x-auto leading-relaxed">
              {getCodeSnippet(currentProject.id)}
            </pre>
          </div>
        )}

        {/* Verified Bullet Points */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Academic Project Deliverables & Resume Verification
          </h4>
          <ul className="space-y-2">
            {currentProject.bulletPoints.map((point, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
