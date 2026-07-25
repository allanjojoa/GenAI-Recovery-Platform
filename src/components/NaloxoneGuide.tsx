import React, { useState } from 'react';
import { Syringe, PhoneCall, AlertOctagon, CheckCircle2, ShieldAlert, HeartPulse } from 'lucide-react';

export const NaloxoneGuide: React.FC = () => {
  const [checkedSigns, setCheckedSigns] = useState<{ [key: string]: boolean }>({});

  const signs = [
    { id: 'unresponsive', text: 'Unresponsive to loud voice or firm chest rub' },
    { id: 'breathing', text: 'Shallow, extremely slow, or stopped breathing' },
    { id: 'gurgling', text: 'Gurgling, snoring, or choking sounds ("death rattle")' },
    { id: 'pupils', text: 'Extremely small "pinpoint" pupils' },
    { id: 'skin', text: 'Blue or purple lips, fingertips, or pale cold skin' },
  ];

  const toggleSign = (id: string) => {
    setCheckedSigns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(checkedSigns).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Emergency Header */}
      <div className="bg-orange-600 text-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-900 text-orange-400 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Opioid Overdose Protocol</h2>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-100">Naloxone (Narcan) reverses overdose in 2–3 mins</p>
            </div>
          </div>
          <a
            href="tel:911"
            className="bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest px-6 py-3.5 rounded-xl text-xs md:text-sm flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <PhoneCall className="w-4 h-4 text-orange-400" />
            <span>Call 911 Now</span>
          </a>
        </div>
      </div>

      {/* Overdose Recognition Interactive Tap Checklist */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              Step 1: Overdose Warning Signs
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tap items below to assess situation:</p>
          </div>
          {selectedCount > 0 && (
            <span className="text-xs font-black uppercase tracking-widest bg-orange-600 text-white px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {selectedCount} warning sign{selectedCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="space-y-3">
          {signs.map(sign => {
            const isChecked = checkedSigns[sign.id];
            return (
              <button
                key={sign.id}
                onClick={() => toggleSign(sign.id)}
                className={`w-full p-5 rounded-2xl border-2 border-slate-900 text-left transition-all flex items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${
                  isChecked
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-900 hover:bg-orange-50'
                }`}
              >
                <span className="text-sm md:text-base font-bold">{sign.text}</span>
                <CheckCircle2
                  className={`w-6 h-6 shrink-0 ${isChecked ? 'text-orange-400' : 'text-slate-400'}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Step Naloxone Administration Guide */}
      <div className="bg-slate-900 text-white border-2 border-slate-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] space-y-6">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
          <Syringe className="w-6 h-6 text-orange-400" />
          <span>Step-by-Step Narcan Nasal Spray</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1 */}
          <div className="p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                1
              </span>
              <h4 className="font-black text-white uppercase text-base">Peel Narcan Package</h4>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Peel back the package to remove the device. Place your thumb on the bottom of the plunger and two fingers on the nozzle.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                2
              </span>
              <h4 className="font-black text-white uppercase text-base">Insert into Nostril</h4>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Tilt person's head back slightly. Gently insert tip of nozzle into one nostril until your fingers touch bottom of nose.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                3
              </span>
              <h4 className="font-black text-white uppercase text-base">Press Plunger Firmly</h4>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Press plunger firmly to release full dose into nostril. Remove device from nose.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-slate-950 border-2 border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                4
              </span>
              <h4 className="font-black text-white uppercase text-base">Recovery Position</h4>
            </div>
            <p className="text-xs font-medium text-slate-300 leading-relaxed">
              Turn person onto side with knees bent to prevent choking. Stay with them until emergency help arrives. Repeat dose in 2–3 mins if needed.
            </p>
          </div>
        </div>

        {/* Call to action bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Naloxone is safe, non-addictive, and cannot harm even if opioids are absent.</span>
          </div>
          <a
            href="tel:911"
            className="bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl text-xs flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <HeartPulse className="w-4 h-4" />
            <span>Call 911 Immediately</span>
          </a>
        </div>
      </div>
    </div>
  );
};
