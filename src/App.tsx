import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CrisisTriage } from './components/CrisisTriage';
import { GroundingExercise } from './components/GroundingExercise';
import { RecoveryQA } from './components/RecoveryQA';
import { NaloxoneGuide } from './components/NaloxoneGuide';
import { CaregiverGuide } from './components/CaregiverGuide';
import { ShieldCheck, Heart, Lock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('triage');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-600 selection:text-white antialiased">
      {/* Top Fixed Header with 911/988 Hotline Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary Navigation Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-10 space-y-8">
        {activeTab === 'triage' && (
          <CrisisTriage
            onGoToGrounding={() => setActiveTab('grounding')}
            onGoToNaloxone={() => setActiveTab('naloxone')}
          />
        )}

        {activeTab === 'grounding' && <GroundingExercise />}

        {activeTab === 'qa' && <RecoveryQA />}

        {activeTab === 'naloxone' && <NaloxoneGuide />}

        {activeTab === 'caregiver' && <CaregiverGuide />}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t-2 border-slate-900 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-black uppercase tracking-wider text-sm text-white">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span>RECOVER.AI / BEACON</span>
              <span className="text-[10px] bg-orange-600 text-white font-black px-2 py-0.5 rounded-full border border-slate-900 uppercase">
                Zero-Typing MVP
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                No Login Required
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-orange-500" />
                RAG Grounded
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed max-w-4xl font-medium">
            <strong className="text-slate-200 uppercase font-black">Important Medical Disclaimer:</strong> This application is a zero-typing prototype proof-of-concept designed for crisis intervention UX demonstration. It does not provide medical diagnosis or substitute for emergency healthcare. If you or someone you know is in immediate medical danger, overdose risk, or emotional crisis, call <a href="tel:911" className="text-orange-400 underline font-black">911</a> or call/text the Suicide & Crisis Lifeline at <a href="tel:988" className="text-orange-400 underline font-black">988</a> immediately.
          </p>
        </div>
      </footer>
    </div>
  );
}
