import React, { useState } from 'react';
import {
  Flame,
  AlertTriangle,
  Heart,
  Users,
  Home,
  MapPin,
  Car,
  MessageSquare,
  Wind,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Send,
  PhoneCall,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ScriptResponse, TriageState } from '../types';

interface CrisisTriageProps {
  onGoToGrounding: () => void;
  onGoToNaloxone: () => void;
}

export const CrisisTriage: React.FC<CrisisTriageProps> = ({
  onGoToGrounding,
  onGoToNaloxone,
}) => {
  // Triage state
  const [step, setStep] = useState<number>(0); // 0: Start Hero, 1: Experience, 2: Location, 3: Goal & Generate
  const [triage, setTriage] = useState<TriageState>({
    experience: null,
    location: null,
    need: null,
    recipientRole: 'Sponsor',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [scriptData, setScriptData] = useState<ScriptResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Question 1 Options: Experience
  const experiences = [
    {
      id: 'Intense Craving',
      title: 'Craving',
      description: 'Urge to use',
      icon: Flame,
      color: 'bg-white border-2 border-slate-900 text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      id: 'Panic & Anxiety',
      title: 'Panic',
      description: 'Extreme anxiety',
      icon: AlertTriangle,
      color: 'bg-white border-2 border-slate-900 text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-orange-50',
      iconColor: 'text-rose-600',
    },
    {
      id: 'Overdose Risk',
      title: 'Risk',
      description: 'Potential overdose / hazard',
      icon: ShieldCheck,
      color: 'bg-white border-2 border-slate-900 text-red-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      id: 'Loneliness & Distress',
      title: 'Isolated',
      description: 'Need to talk or connect',
      icon: Heart,
      color: 'bg-white border-2 border-slate-900 text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-orange-50',
      iconColor: 'text-blue-600',
    },
  ];

  // Question 2 Options: Location / Presence
  const locations = [
    {
      id: 'Alone at home',
      title: 'Alone at Home',
      description: 'Isolated in my room or house',
      icon: Home,
    },
    {
      id: 'With friend or family',
      title: 'With Others',
      description: 'Someone is nearby or in next room',
      icon: Users,
    },
    {
      id: 'In public space',
      title: 'In Public',
      description: 'Outdoors, store, or public area',
      icon: MapPin,
    },
    {
      id: 'In vehicle or transit',
      title: 'In Transit',
      description: 'Car, bus, or commuting',
      icon: Car,
    },
  ];

  // Question 3 Options: Immediate Need
  const needs = [
    {
      id: 'Emergency text message',
      title: 'Emergency SMS Script',
      description: 'Generate first-person message for my support contact',
      icon: MessageSquare,
      badge: 'Zero-Typing',
    },
    {
      id: 'Calming & breathing',
      title: 'Calming Breathing Guide',
      description: 'Immediate 5-4-3-2-1 sensory grounding & box breathing',
      icon: Wind,
      badge: 'Physiological',
    },
    {
      id: 'Overdose & Safety Protocol',
      title: 'Overdose & Safety Guide',
      description: 'Naloxone steps & emergency medical response',
      icon: ShieldCheck,
      badge: 'Life Safety',
    },
    {
      id: 'Caregiver script',
      title: 'Caregiver Support Script',
      description: 'Message for a family member or sponsor to assist me',
      icon: UserCheck,
      badge: 'Supporter',
    },
  ];

  // Recipient presets for script customization
  const recipientRoles = ['Sponsor', 'Family Member', 'Trusted Friend', 'Caregiver'];

  // Handle choice taps
  const handleSelectExperience = (exp: string) => {
    setTriage(prev => ({ ...prev, experience: exp }));
    setStep(2);
  };

  const handleSelectLocation = (loc: string) => {
    setTriage(prev => ({ ...prev, location: loc }));
    setStep(3);
  };

  const handleSelectNeed = (needItem: string) => {
    const updated = { ...triage, need: needItem };
    setTriage(updated);

    if (needItem === 'Calming & breathing') {
      onGoToGrounding();
      return;
    }
    if (needItem === 'Overdose & Safety Protocol') {
      onGoToNaloxone();
      return;
    }

    generateScript(updated);
  };

  const generateScript = async (currentState: TriageState) => {
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch('/api/triage/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentState),
      });

      const data: ScriptResponse = await res.json();
      setScriptData(data);
    } catch (err) {
      console.error('Failed to generate script:', err);
      // Hardcoded fallback if network fails
      const fallbackMsg = `Hey, I'm experiencing an intense craving right now and I'm alone. Could you please call or check on me as soon as possible? I need support.`;
      setScriptData({
        script: fallbackMsg,
        wordCount: fallbackMsg.split(' ').length,
        recipientRole: currentState.recipientRole,
        category: currentState.experience || 'Craving',
        isFallback: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role: string) => {
    const updated = { ...triage, recipientRole: role };
    setTriage(updated);
    generateScript(updated);
  };

  const copyToClipboard = () => {
    if (!scriptData?.script) return;
    navigator.clipboard.writeText(scriptData.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const resetTriage = () => {
    setStep(1);
    setScriptData(null);
    setTriage({
      experience: null,
      location: null,
      need: null,
      recipientRole: 'Sponsor',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 0. Hero Banner - Step 0 (Visible immediately on initial page load) */}
      {step === 0 && !scriptData && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden space-y-8">
          <div className="inline-flex items-center gap-2 bg-orange-600 text-white border-2 border-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Zero-Typing Crisis Engine</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tight uppercase text-slate-900">
              HOW ARE YOU <br />
              FEELING <span className="text-orange-600 italic">NOW?</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
              When craving or panic strikes, cognitive load is highest. You don't need to type or write messages. Simply tap 3 quick options to generate an instant SMS emergency script or grounding protocol.
            </p>
          </div>

          {/* Primary Big Tap CTA Button (MVP-01: Zero Navigation) */}
          <div className="pt-2">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xl uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 border-2 border-slate-900"
            >
              <AlertTriangle className="w-6 h-6 animate-bounce text-amber-200" />
              <span>START ZERO-TYPING TRIAGE</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Safety Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-slate-900/20 text-left">
            <button
              onClick={onGoToGrounding}
              className="p-4 bg-white hover:bg-slate-50 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all text-slate-900 font-black uppercase text-xs"
            >
              <Wind className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <p className="font-black text-sm">Grounding</p>
                <p className="text-[10px] text-slate-500 font-bold">Box Breathing</p>
              </div>
            </button>

            <button
              onClick={onGoToNaloxone}
              className="p-4 bg-white hover:bg-slate-50 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all text-slate-900 font-black uppercase text-xs"
            >
              <ShieldCheck className="w-6 h-6 text-orange-600 shrink-0" />
              <div>
                <p className="font-black text-sm">Naloxone</p>
                <p className="text-[10px] text-slate-500 font-bold">Narcan Steps</p>
              </div>
            </button>

            <a
              href="tel:988"
              className="p-4 bg-orange-600 hover:bg-orange-500 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all text-white font-black uppercase text-xs col-span-2 sm:col-span-1"
            >
              <PhoneCall className="w-6 h-6 text-white shrink-0" />
              <div>
                <p className="font-black text-sm">988 Lifeline</p>
                <p className="text-[10px] text-orange-200 font-bold">Direct Call</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Progress Indicator for 3-Question Flow */}
      {step > 0 && !scriptData && (
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {step}
            </span>
            <span className="text-xs font-black text-orange-600 uppercase tracking-widest">
              {step === 1 && 'Step 1 of 3: Current Experience'}
              {step === 2 && 'Step 2 of 3: Location / Context'}
              {step === 3 && 'Step 3 of 3: Immediate Support Goal'}
            </span>
          </div>
          <button
            onClick={resetTriage}
            className="text-xs font-black uppercase tracking-wider text-slate-700 hover:text-slate-900 underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Step 1: Current Experience (MVP-02: Tap choice) */}
      {step === 1 && !scriptData && (
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              Select Your State
            </h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tap one option below to proceed without typing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experiences.map(exp => {
              const Icon = exp.icon;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExperience(exp.id)}
                  className={`p-8 rounded-2xl border-2 border-slate-900 text-left transition-all ${exp.color} flex flex-col justify-between gap-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl md:text-4xl font-black uppercase tracking-tight">{exp.title}</span>
                    <Icon className={`w-8 h-8 ${exp.iconColor}`} />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">{exp.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Location (MVP-02: Tap choice) */}
      {step === 2 && !scriptData && (
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              Where are you right now?
            </h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Context helps customize your emergency script.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {locations.map(loc => {
              const Icon = loc.icon;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc.id)}
                  className="p-8 rounded-2xl border-2 border-slate-900 bg-white hover:bg-orange-50 text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-left flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-tight">{loc.title}</span>
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">{loc.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Immediate Need (MVP-02: Tap choice) */}
      {step === 3 && !scriptData && (
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              What do you need?
            </h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Select your immediate goal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {needs.map(need => {
              const Icon = need.icon;
              return (
                <button
                  key={need.id}
                  disabled={loading}
                  onClick={() => handleSelectNeed(need.id)}
                  className="p-8 rounded-2xl border-2 border-slate-900 bg-white hover:bg-orange-50 text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-left flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-black uppercase tracking-tight">{need.title}</span>
                    <span className="text-[10px] bg-orange-600 text-white font-black px-2 py-0.5 rounded-full border border-slate-900 uppercase">
                      {need.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-orange-600 shrink-0" />
                    <p className="text-sm font-semibold text-slate-600 leading-snug">{need.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {loading && (
            <div className="p-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl text-center space-y-3">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-base font-black uppercase text-slate-900">Generating script with Gemini AI...</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Zero-typing contextual script preparation</p>
            </div>
          )}
        </div>
      )}

      {/* Generated Script Display & Action Suite (MVP-03 & MVP-04) */}
      {scriptData && (
        <div className="bg-slate-900 text-white border-2 border-slate-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
              <h3 className="text-xl font-black uppercase tracking-wider text-white">Emergency Script Ready</h3>
              <span className="text-xs bg-orange-600 text-white font-black uppercase tracking-wider px-3 py-1 rounded-full border border-slate-900">
                {scriptData.wordCount} words
              </span>
            </div>
            <button
              onClick={resetTriage}
              className="text-xs text-slate-400 hover:text-white font-black uppercase tracking-wider flex items-center gap-1 underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          </div>

          {/* Script Text Box (No editing allowed, pure tap delivery) */}
          <div className="bg-slate-950 border-2 border-orange-500/50 rounded-2xl p-6 shadow-inner space-y-3">
            <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed select-all">
              "{scriptData.script}"
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase pt-2 border-t border-slate-900">
              <span>Target: {scriptData.recipientRole}</span>
              <span>Tone: First-Person SMS</span>
            </div>
          </div>

          {/* Recipient Adaptation Chips (One-tap role switch!) */}
          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Adapt message recipient:
            </p>
            <div className="flex flex-wrap gap-2">
              {recipientRoles.map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 transition-all ${
                    triage.recipientRole === role
                      ? 'bg-orange-600 text-white border-white shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Core Zero-Typing Delivery Action Buttons (MVP-04) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* 1. Copy Script Button */}
            <button
              onClick={copyToClipboard}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>Script Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-orange-600" />
                  <span>Tap to Copy Script</span>
                </>
              )}
            </button>

            {/* 2. Direct SMS Link Button */}
            <a
              href={`sms:?body=${encodeURIComponent(scriptData.script)}`}
              className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-center"
            >
              <Send className="w-5 h-5" />
              <span>Send as SMS</span>
            </a>
          </div>

          {/* Additional Instant Action Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800 pt-4">
            <button
              onClick={onGoToGrounding}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700"
            >
              <Wind className="w-4 h-4 text-teal-400" />
              <span>Grounding Tools</span>
            </button>

            <a
              href="tel:988"
              className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-900"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Call 988 Lifeline</span>
            </a>

            <button
              onClick={onGoToNaloxone}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Naloxone Guide</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
