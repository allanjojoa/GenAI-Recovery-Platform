import React from 'react';
import { ShieldAlert, Wind, HelpCircle, Syringe, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'triage',
      label: 'Crisis Triage',
      icon: ShieldAlert,
      badge: 'Zero-Typing',
    },
    {
      id: 'grounding',
      label: 'Grounding Tools',
      icon: Wind,
      badge: 'Calming',
    },
    {
      id: 'qa',
      label: 'Recovery Q&A',
      icon: HelpCircle,
      badge: 'RAG Grounded',
    },
    {
      id: 'naloxone',
      label: 'Naloxone & Safety',
      icon: Syringe,
      badge: 'Overdose Protocol',
    },
    {
      id: 'caregiver',
      label: 'Caregiver Guide',
      icon: Users,
      badge: 'Support',
    },
  ];

  return (
    <nav className="bg-white border-b-2 border-slate-900 px-4 py-3 sticky top-[95px] z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar py-0.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider border-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-orange-500' : 'text-slate-600'
                }`}
              />
              <span>{tab.label}</span>
              {isActive && (
                <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-600 text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
