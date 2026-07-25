export interface KnowledgeItem {
  id: string;
  topic: string;
  category: string;
  summary: string;
  text: string;
  source: string;
}

export interface TriageState {
  experience: string | null; // e.g. "Craving", "Panic", "Overdose Risk", "Loneliness"
  location: string | null;   // e.g. "Alone at home", "With friend/family", "In public", "In vehicle"
  need: string | null;       // e.g. "Emergency text script", "Immediate calming exercise", "Safety protocol", "Caregiver script"
  recipientRole: string;     // e.g. "Sponsor", "Trusted Contact", "Family Member", "Caregiver"
}

export interface ScriptResponse {
  script: string;
  wordCount: number;
  recipientRole: string;
  category: string;
  isFallback?: boolean;
}

export interface QAResponse {
  topic: string;
  answer: string;
  source: string;
  passage: string;
  isFallback?: boolean;
}
