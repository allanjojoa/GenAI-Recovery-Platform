import React, { useState, useEffect } from 'react';
import { Wind, Eye, Hand, Ear, Sparkles, Thermometer, Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

export const GroundingExercise: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'box' | '54321' | 'tipp'>('box');

  // Box Breathing state
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [seconds, setSeconds] = useState<number>(4);

  // 5-4-3-2-1 Sensory technique state
  const [sensoryStep, setSensoryStep] = useState<number>(0);

  // Box Breathing Timer Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathing) {
      timer = setInterval(() => {
        setSeconds(prev => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Cycle phase
            setBreathPhase(current => {
              if (current === 'Inhale') return 'Hold';
              if (current === 'Hold') return 'Exhale';
              if (current === 'Exhale') return 'Pause';
              return 'Inhale';
            });
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  const sensoryItems = [
    {
      count: 5,
      title: 'Acknowledge 5 things you can SEE',
      description: 'Look around you right now. Notice 5 objects, colors, or shadows in your surroundings.',
      icon: Eye,
    },
    {
      count: 4,
      title: 'Acknowledge 4 things you can TOUCH',
      description: 'Feel the ground under your feet, the fabric of your clothes, or the texture of a surface near you.',
      icon: Hand,
    },
    {
      count: 3,
      title: 'Acknowledge 3 things you can HEAR',
      description: 'Listen closely. Notice distant ambient sounds, air conditioning hum, birds, or your breath.',
      icon: Ear,
    },
    {
      count: 2,
      title: 'Acknowledge 2 things you can SMELL',
      description: 'Notice any scent in the air around you, fresh coffee, soap, or deep fresh air.',
      icon: Sparkles,
    },
    {
      count: 1,
      title: 'Acknowledge 1 thing you can TASTE',
      description: 'Focus on the current taste in your mouth, or take a small sip of cold water.',
      icon: Wind,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Selector Tab Pills */}
      <div className="flex bg-white border-2 border-slate-900 rounded-2xl p-2 gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={() => setActiveTool('box')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 ${
            activeTool === 'box'
              ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
              : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
          }`}
        >
          <Wind className="w-4 h-4 text-orange-500" />
          <span>Box Breathing (4-4-4-4)</span>
        </button>

        <button
          onClick={() => setActiveTool('54321')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 ${
            activeTool === '54321'
              ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
              : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
          }`}
        >
          <Eye className="w-4 h-4 text-teal-400" />
          <span>5-4-3-2-1 Sensory Grounding</span>
        </button>

        <button
          onClick={() => setActiveTool('tipp')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 ${
            activeTool === 'tipp'
              ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
              : 'bg-white text-slate-800 border-transparent hover:border-slate-900'
          }`}
        >
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span>TIPP Cold Temperature</span>
        </button>
      </div>

      {/* 1. Box Breathing View */}
      {activeTool === 'box' && (
        <div className="bg-teal-600 text-white border-2 border-slate-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Rhythmic Box Breathing</h3>
            <p className="text-sm font-medium text-teal-100 max-w-lg mx-auto">
              Box breathing triggers the parasympathetic nervous system to slow heart rate and reduce panic spikes.
            </p>
          </div>

          {/* Animated Breath Visualizer */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto flex items-center justify-center">
            {/* Outer Pulsing Ring */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-slate-900 bg-white/20 transition-all duration-1000 ${
                breathPhase === 'Inhale'
                  ? 'scale-110 bg-white/30'
                  : breathPhase === 'Hold'
                  ? 'scale-110 bg-orange-500/40 animate-pulse'
                  : breathPhase === 'Exhale'
                  ? 'scale-90 bg-white/10'
                  : 'scale-95 bg-teal-900/40'
              }`}
            />

            {/* Inner Counter Core */}
            <div className="relative z-10 space-y-1 bg-slate-900 p-8 rounded-full border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white w-44 h-44 flex flex-col items-center justify-center">
              <span className="text-xs uppercase font-black tracking-widest text-orange-400">
                {isBreathing ? breathPhase : 'Ready'}
              </span>
              <p className="text-5xl font-black">{isBreathing ? seconds : '4s'}</p>
            </div>
          </div>

          {/* Control Taps */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsBreathing(!isBreathing)}
              className="px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              {isBreathing ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause Breathing</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Box Breathing</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsBreathing(false);
                setBreathPhase('Inhale');
                setSeconds(4);
              }}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. 5-4-3-2-1 Sensory Grounding View */}
      {activeTool === '54321' && (
        <div className="bg-teal-600 text-white border-2 border-slate-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-900/30 pb-4">
            <div>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">5-4-3-2-1 Grounding</h3>
              <p className="text-xs font-semibold text-teal-100">Reanchor your brain in the immediate physical environment.</p>
            </div>
            <span className="text-xs bg-slate-900 text-white font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Step {sensoryStep + 1} of 5
            </span>
          </div>

          {/* Current Step Card */}
          {(() => {
            const current = sensoryItems[sensoryStep];

            return (
              <div className="p-8 rounded-2xl bg-white text-slate-900 border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
                <div className="flex items-start gap-6">
                  <span className="text-6xl md:text-7xl font-black opacity-80 italic text-teal-700">
                    {current.count}
                  </span>
                  <div className="space-y-2">
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">{current.title}</h4>
                    <p className="text-base font-semibold text-slate-600 leading-snug">{current.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">Take your time. No rush.</span>
                  <button
                    onClick={() => setSensoryStep(prev => (prev < 4 ? prev + 1 : 0))}
                    className="bg-orange-600 text-white font-black uppercase tracking-wider px-6 py-3 rounded-xl text-xs md:text-sm flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                  >
                    <span>{sensoryStep === 4 ? 'Restart Guide' : 'Next Sense'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Step Indicator Chips */}
          <div className="grid grid-cols-5 gap-3 pt-2">
            {sensoryItems.map((item, idx) => (
              <button
                key={item.count}
                onClick={() => setSensoryStep(idx)}
                className={`py-3 px-2 rounded-xl text-center text-sm font-black border-2 transition-all ${
                  sensoryStep === idx
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-900 border-slate-900 hover:bg-orange-50'
                }`}
              >
                {item.count}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. TIPP Cold Temperature View */}
      {activeTool === 'tipp' && (
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-orange-600 text-white border-2 border-slate-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Thermometer className="w-4 h-4 text-white" />
              <span>Mammalian Dive Reflex</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">Cold Water Reset</h3>
            <p className="text-sm font-medium text-slate-600">
              When cravings or panic reach peak levels, changing your facial temperature rapidly forces your heart rate down within 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">1</span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Cold Splash / Ice</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Splash cold water on your face, or wrap an ice pack / frozen bag in a cloth and hold it over your eyes and cheeks.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">2</span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Hold Breath 15s</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Lean forward slightly, hold your breath, and keep the cold temperature on your face for 15 to 30 seconds.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-2 border-slate-900 rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900">3</span>
              <h4 className="font-black text-slate-900 uppercase text-lg">Slow Exhale</h4>
              <p className="text-xs font-semibold text-slate-600 leading-snug">
                Remove the cold water/ice, take a deep breath in through your nose, and exhale very slowly through your mouth.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
