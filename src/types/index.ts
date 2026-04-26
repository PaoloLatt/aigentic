export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  interest: string;
  message?: string;
  score: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  source_page?: string;
  created_at?: string;
}

export interface UseCase {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  sector: string;
  before: string;
  after: string;
  result: string;
  resultLabel: string;
  resultExtra: string;
  stack: string[];
}

export interface SiteContent {
  services: unknown[];
  useCases: UseCase[];
  faqs: { question: string; answer: string }[];
  processSteps: { id: string; title: string; description: string }[];
  integrations: string[];
  heroStats: { value: string; label: string }[];
}