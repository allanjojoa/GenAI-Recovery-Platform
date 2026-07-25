import React from 'react';
import { ShieldAlert, PhoneCall, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white text-slate-900 border-b-2 border-slate-900 sticky top-0 z-50 shadow-sm">
      {/* Permanent High-Priority 911/988 Hotline Bar */}
      <div className="bg-orange-600 text-white border-b-2 border-slate-900 px-4 py-2 text-xs md:text-sm font-extrabold uppercase tracking-wider flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-white shrink-0 animate-pulse" />
          <span>
            Emergency? Call <span className="underline decoration-2">911</span> or Lifeline <span className="underline decoration-2">988</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:988"
            className="bg-slate-900 hover:bg-slate-800 text-white font-black px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-all border border-slate-900 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>988</span>
          </a>
          <a
            href="tel:911"
            className="bg-red-700 hover:bg-red-600 text-white font-black px-3 py-1 rounded-full text-xs transition-all border border-slate-900 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            911
          </a>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('triage')}>
          <div className="w-10 h-10 rounded-full bg-orange-600 border-2 border-slate-900 flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <HeartHandshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-slate-900 flex items-center gap-2">
              RECOVER<span className="text-orange-600">.AI</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded-full border border-slate-900">
                Zero-Typing MVP
              </span>
            </h1>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              GenAI Crisis Intervention & Relapse Prevention
            </p>
          </div>
        </div>

        {/* Quick Crisis Launch Tap Button */}
        {activeTab !== 'triage' && (
          <button
            onClick={() => setActiveTab('triage')}
            className="bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-wider px-4 py-2 rounded-full text-xs md:text-sm flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Crisis Triage</span>
          </button>
        )}
      </div>
    </header>
  );
};
