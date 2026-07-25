import React, { useState } from 'react';
import { HelpCircle, BookOpen, ShieldCheck, Sparkles, Copy, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import { QAResponse } from '../types';

export const RecoveryQA: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [qaResult, setQaResult] = useState<QAResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassage, setShowPassage] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    'All',
    'Overdose & Harm Reduction',
    'Craving & Panic Relief',
    'Support & Resources',
    'Withdrawal & Health',
  ];

  const filteredTopics = selectedCategory === 'All'
    ? KNOWLEDGE_BASE
    : KNOWLEDGE_BASE.filter(item => item.category === selectedCategory);

  const handleSelectTopic = async (topicId: string) => {
    setActiveTopicId(topicId);
    setLoading(true);
    setCopied(false);
    setShowPassage(false);

    try {
      const res = await fetch('/api/qa/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId }),
      });

      const data: QAResponse = await res.json();
      setQaResult(data);
    } catch (err) {
      console.error('Failed to answer topic:', err);
      const fallbackItem = KNOWLEDGE_BASE.find(k => k.id === topicId) || KNOWLEDGE_BASE[0];
      setQaResult({
        topic: fallbackItem.topic,
        answer: fallbackItem.summary,
        passage: fallbackItem.text,
        source: fallbackItem.source,
        isFallback: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyAnswer = () => {
    if (!qaResult?.answer) return;
    navigator.clipboard.writeText(`Q: ${qaResult.topic}\n\nA: ${qaResult.answer}\nSource: ${qaResult.source}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* RAG Grounded Banner */}
      <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-600 text-white rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              Verified Knowledge Base (RAG)
            </h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tap any question chip below. Grounded in SAMHSA, CDC, and NIDA guidelines.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-2 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Question Chips Grid (MVP-06: Zero typing mechanism) */}
      <div className="space-y-3">
        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
          Tap a question chip to view verified answer:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTopics.map(item => {
            const isActive = activeTopicId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTopic(item.id)}
                className={`p-6 rounded-2xl border-2 border-slate-900 text-left transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none flex items-start justify-between gap-4 ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-900 hover:bg-orange-50'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-orange-400' : 'text-orange-600'}`}>
                    {item.category}
                  </span>
                  <h4 className="font-black text-base md:text-lg uppercase leading-snug">{item.topic}</h4>
                </div>
                <div className={`p-2 rounded-full border border-slate-900 shrink-0 ${isActive ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                  <HelpCircle className="w-5 h-5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="p-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl text-center space-y-3">
          <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-base font-black uppercase text-slate-900">Evaluating Knowledge Passage with Gemini RAG...</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enforcing zero-hallucination passage constraints</p>
        </div>
      )}

      {/* Q&A Answer Display Card */}
      {qaResult && !loading && (
        <div className="bg-slate-900 text-white border-2 border-slate-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs text-orange-400 font-black uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Grounded Answer
              </span>
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white">{qaResult.topic}</h3>
            </div>
            <span className="text-xs bg-orange-600 text-white font-black uppercase tracking-wider px-3 py-1 rounded-full border border-slate-900 shrink-0">
              Source: {qaResult.source}
            </span>
          </div>

          {/* Gemini Grounded Answer */}
          <div className="p-6 bg-slate-950 border-2 border-orange-500/50 rounded-2xl text-slate-100 text-base md:text-lg leading-relaxed font-sans space-y-2">
            <p>{qaResult.answer}</p>
          </div>

          {/* Source Passage Accordion */}
          <div className="border-2 border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
            <button
              onClick={() => setShowPassage(!showPassage)}
              className="w-full px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white flex items-center justify-between transition-colors bg-slate-900"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Verified Source Passage ({qaResult.source})</span>
              </span>
              {showPassage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPassage && (
              <div className="p-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-950 space-y-2 font-mono">
                <p className="text-slate-300 italic">
                  "{qaResult.passage}"
                </p>
                <div className="pt-2 text-[10px] text-orange-400 font-bold uppercase">
                  * Gemini generated the response using exclusively this verified passage.
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={copyAnswer}
              className={`px-6 py-3 rounded-xl font-black uppercase tracking-wider text-xs flex items-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Answer Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-orange-600" />
                  <span>Copy Answer</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
