import React, { useState } from 'react';
import { Users, HeartHandshake, ShieldCheck, PhoneCall, Check, MessageSquare } from 'lucide-react';

export const CaregiverGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deescalate' | 'phrases' | 'safety'>('deescalate');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-600 text-white rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">Caregiver Crisis Guide</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Zero-typing reference for supporters supporting a loved one in distress.
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-slate-900 gap-2">
          <button
            onClick={() => setActiveTab('deescalate')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
              activeTab === 'deescalate'
                ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
                : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
            }`}
          >
            De-escalation Steps
          </button>
          <button
            onClick={() => setActiveTab('phrases')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
              activeTab === 'phrases'
                ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
                : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
            }`}
          >
            Supportive Tap Phrases
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
              activeTab === 'safety'
                ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
                : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
            }`}
          >
            Safety & Environment
          </button>
        </div>
      </div>

      {/* 1. De-escalation steps */}
      {activeTab === 'deescalate' && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-orange-600" />
            <span>4 Rules for Crisis De-escalation</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                1
              </span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Lower Your Tone</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Speak calmly, slowly, and softly. High arousal or lecturing triggers defensiveness and worsens panic.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                2
              </span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Validate Without Judgment</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Acknowledge that cravings and anxiety are intense physiological states. Say: "I hear you, and I am right here."
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                3
              </span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Ask Simple Yes/No Questions</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Avoid complex discussions or interrogations. Ask: "Would a cold cup of water help?" or "Should we breathe together?"
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">
                4
              </span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Low-Stimulus Space</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Move away from loud noise, bright lights, or crowded rooms to reduce sensory overload.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Supportive Tap Phrases */}
      {activeTab === 'phrases' && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-600" />
            <span>Supportive Tap-to-Copy SMS Replies</span>
          </h3>

          <div className="space-y-4">
            {[
              "I got your message. I am here for you and I'm on my way / calling right now. Stay safe.",
              "You are doing great by reaching out. Let's take slow deep breaths together. I am right here.",
              "This craving wave will peak and pass in a few minutes. I'm staying on the line with you.",
              "I'm bringing a fresh ice pack / cold water. Take it one minute at a time.",
            ].map((phrase, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-50 border-2 border-slate-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-sm md:text-base text-slate-900 font-bold">"{phrase}"</p>
                <button
                  onClick={() => navigator.clipboard.writeText(phrase)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 transition-all"
                >
                  Copy Text
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Safety Check */}
      {activeTab === 'safety' && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-orange-600" />
            <span>Caregiver Safety & Resource Checklist</span>
          </h3>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 border-2 border-slate-900 rounded-2xl flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Check className="w-6 h-6 text-orange-600 shrink-0 mt-0.5 stroke-[3]" />
              <div>
                <p className="font-black text-slate-900 uppercase text-base">Ensure Naloxone (Narcan) is Accessible</p>
                <p className="text-slate-600 text-xs font-medium">Keep nasal spray in a known unlocked location in the home.</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-2 border-slate-900 rounded-2xl flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Check className="w-6 h-6 text-orange-600 shrink-0 mt-0.5 stroke-[3]" />
              <div>
                <p className="font-black text-slate-900 uppercase text-base">Save SAMHSA Helpline (1-800-662-4357)</p>
                <p className="text-slate-600 text-xs font-medium">Free, confidential 24/7 treatment referral and information service.</p>
              </div>
            </div>

            <div className="p-5 bg-slate-50 border-2 border-slate-900 rounded-2xl flex items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Check className="w-6 h-6 text-orange-600 shrink-0 mt-0.5 stroke-[3]" />
              <div>
                <p className="font-black text-slate-900 uppercase text-base">988 Lifeline Support for Caregivers</p>
                <p className="text-slate-600 text-xs font-medium">Caregivers can call or text 988 for guidance when supporting someone in crisis.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
