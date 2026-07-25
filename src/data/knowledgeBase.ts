import { KnowledgeItem } from '../types';

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'naloxone-basics',
    topic: 'What is naloxone and how does it work?',
    category: 'Overdose & Harm Reduction',
    summary: 'Naloxone (Narcan) is a life-saving medication that reverses opioid overdoses.',
    text: 'Naloxone is an FDA-approved opioid antagonist medication used to rapidly reverse an opioid overdose. It works by attaching to opioid receptors in the brain and blocking the effects of opioids (such as fentanyl, heroin, and prescription painkillers). Naloxone is non-addictive, safe to administer, and usually takes effect within 2 to 3 minutes. It can be administered as a nasal spray (Narcan) or an intramuscular injection. Calling 911 immediately after administering naloxone is critical because opioids can remain in the body longer than naloxone.',
    source: 'SAMHSA & CDC Guidelines'
  },
  {
    id: 'overdose-signs',
    topic: 'How to recognize an opioid overdose',
    category: 'Overdose & Harm Reduction',
    summary: 'Key warning signs include pinpoint pupils, slow breathing, unresponsiveness, and blue/gray lips.',
    text: 'Signs of an opioid overdose include: extremely small "pinpoint" pupils; slow, shallow, or stopped breathing; choking or gurgling sounds; loss of consciousness or unresponsiveness to loud noise or firm touch; limp body; and pale, blue, or grayish skin, lips, or fingernails. If you suspect an overdose, call 911 immediately, administer naloxone if available, turn the person onto their side (recovery position) to prevent choking, and stay with them until emergency personnel arrive.',
    source: 'CDC Injury Prevention Center'
  },
  {
    id: 'craving-coping',
    topic: 'Managing intense craving spikes',
    category: 'Craving & Panic Relief',
    summary: 'Cravings are temporary surge waves that typically peak within 15–20 minutes.',
    text: 'Substance cravings are intense neurochemical urges that peak and subside like waves, usually lasting 15 to 20 minutes. Effective coping techniques include: "Urge Surfing" (observing craving sensations without acting), changing physical temperature (applying ice or cold water to the face to trigger the mammalian dive reflex), reaching out to a trusted contact or sponsor, and engaging in structured sensory grounding. Cravings are not signs of failure; they are automatic physiological responses that decrease in intensity as recovery progresses.',
    source: 'NIDA & SAMHSA Recovery Manuals'
  },
  {
    id: '988-lifeline',
    topic: 'What is the 988 Lifeline and how does it help?',
    category: 'Support & Resources',
    summary: '988 is a free, confidential, 24/7 crisis and substance support line.',
    text: 'The 988 Suicide & Crisis Lifeline provides free, confidential, 24/7 support for anyone experiencing mental health distress, substance use crisis, or emotional pain. By calling or texting 988, individuals are connected with trained crisis counselors who provide supportive listening, crisis stabilization, and local recovery connections. Services are available in English and Spanish, and callers do not need to share personal identifying details to receive immediate assistance.',
    source: 'SAMHSA 988 Hotline Documentation'
  },
  {
    id: 'tipp-skill',
    topic: 'What is the TIPP skill for crisis reduction?',
    category: 'Craving & Panic Relief',
    summary: 'TIPP uses physiological triggers to rapidly lower heart rate and emotional overload.',
    text: 'TIPP stands for Temperature, Intense Exercise, Paced Breathing, and Paired Muscle Relaxation. In moments of intense craving or panic, applying cold water or an ice pack to the upper face and eyes for 30 seconds triggers the "Mammalian Dive Reflex," which rapidly slows the heart rate and calms the sympathetic nervous system. Following this with slow, deep abdominal breathing (exhaling longer than inhaling) provides fast physiological relief without requiring complex cognitive processing.',
    source: 'Dialectical Behavior Therapy (DBT) Crisis Skills'
  },
  {
    id: 'withdrawal-basics',
    topic: 'Common opioid withdrawal symptoms and safety',
    category: 'Withdrawal & Health',
    summary: 'Withdrawal can cause flu-like distress and anxiety, but medically assisted treatment helps.',
    text: 'Opioid withdrawal symptoms can begin within hours of the last dose and include anxiety, sweating, muscle aches, nausea, abdominal cramps, rapid heart rate, and insomnia. While opioid withdrawal is intensely uncomfortable, FDA-approved medications for opioid use disorder (MOUD) such as buprenorphine and methadone can significantly relieve symptoms, decrease cravings, and prevent relapse. Medical detoxification and ongoing treatment drastically improve safety and long-term recovery outcomes.',
    source: 'NIDA Medical Review'
  },
  {
    id: 'helping-others',
    topic: 'How to support a loved one in recovery crisis',
    category: 'Support & Resources',
    summary: 'Focus on empathetic listening, non-judgmental presence, and clear safety steps.',
    text: 'When supporting someone experiencing a craving or emotional crisis: stay calm and present, avoid confrontation or lecturing, validate their distress without judgment, and ask simple yes/no questions to understand immediate needs. Help them move to a quiet environment, ensure naloxone is accessible if overdose risk exists, and encourage them to connect with professional support or crisis lifelines like 988.',
    source: 'SAMHSA Caregiver Guidelines'
  },
  {
    id: 'harm-reduction-basics',
    topic: 'Core principles of harm reduction',
    category: 'Overdose & Harm Reduction',
    summary: 'Harm reduction prioritizes keeping individuals alive, safe, and free from fatal overdose.',
    text: 'Harm reduction is a pragmatic, evidence-based public health approach that aims to minimize the negative health consequences of substance use. Essential harm reduction practices include: keeping naloxone (Narcan) nearby at all times, never using substances alone, using fentanyl test strips, ensuring access to sterile supplies, and knowing emergency contact protocols. Harm reduction meets individuals where they are without judgment or coercion.',
    source: 'National Harm Reduction Coalition'
  }
];
