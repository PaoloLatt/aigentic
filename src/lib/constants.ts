export interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  agents: Agent[];
}

export interface Agent {
  name: string;
  detail: string;
  automations: string[];
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

export interface Faq {
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export const SERVICES: ServiceCategory[] = [
  {
    id: "marketing",
    icon: "📈",
    title: "Marketing Agents",
    description: "Automatizza campagne, contenuti e analisi per massimizzare ROI.",
    color: "#3B82F6",
    agents: [
      {
        name: "Performance Ads Agent",
        detail: "Gestisce campagne Google Ads e Meta in tempo reale. Monitora ROAS, rialloca budget automaticamente, esegue A/B test su copy e creatività. Si integra con API di Google Ads e Meta per ottimizzazioni continue, riducendo costi e aumentando conversioni.",
        automations: ["Monitoraggio ROAS", "Riallocazione budget", "A/B test copy", "Ottimizzazione creatività", "Report performance", "Alert anomalie"]
      },
      {
        name: "Email & Nurturing Agent",
        detail: "Collegato a ActiveCampaign o Mailchimp, segmenta contatti automaticamente, crea sequenze welcome, nurturing e winback. Esegue A/B test su subject e contenuti. Invia email personalizzate basate su comportamenti, migliorando engagement e retention.",
        automations: ["Segmentazione contatti", "Sequenze email", "A/B test subject", "Personalizzazione contenuti", "Tracking aperture", "Winback campaigns"]
      },
      {
        name: "Social Media Agent",
        detail: "Usa Buffer o Hootsuite per creare piani editoriali, generare copy multi-piattaforma, schedulare post e monitorare engagement. Analizza performance e ottimizza timing, aumentando reach e interazioni senza intervento manuale.",
        automations: ["Piano editoriale", "Generazione copy", "Scheduling post", "Monitoraggio engagement", "Analisi performance", "Ottimizzazione timing"]
      },
      {
        name: "CRM Intelligence Agent",
        detail: "Integrato con HubSpot o Pipedrive, arricchisce contatti con dati pubblici, assegna lead scoring, invia alert per segnali di acquisto e pulisce dati duplicati. Mantiene CRM aggiornato automaticamente, migliorando qualità lead e efficienza vendite.",
        automations: ["Enrichment contatti", "Lead scoring", "Alert segnali acquisto", "Pulizia dati", "Aggiornamenti automatici", "Report lead quality"]
      },
      {
        name: "SEO & Content Agent",
        detail: "Esegue keyword research, identifica content gap, crea brief SEO e bozze di articoli ottimizzati. Gestisce internal linking e suggerisce miglioramenti tecnici. Si integra con tool SEO per monitoraggio posizionamenti e generazione contenuti scalabile.",
        automations: ["Keyword research", "Content gap analysis", "Brief SEO", "Bozze articoli", "Internal linking", "Monitoraggio posizionamenti"]
      }
    ]
  },
  {
    id: "sales",
    icon: "💼",
    title: "Sales Agents",
    description: "Qualifica lead, gestisci pipeline e genera proposte automaticamente.",
    color: "#10B981",
    agents: [
      {
        name: "Lead Qualifier Agent",
        detail: "Attraverso chatbot, email o WhatsApp, qualifica lead automaticamente con domande predefinite, assegna scoring e instrada a venditori. Riduce tempo di risposta e aumenta qualità lead, integrandosi con CRM per aggiornamenti real-time.",
        automations: ["Qualifica automatica", "Assegnazione scoring", "Routing lead", "Aggiornamenti CRM", "Risposta immediata", "Follow-up programmati"]
      },
      {
        name: "Follow-up Sequencer",
        detail: "Crea sequenze post-call o demo con email contestuali, reminder e materiale aggiuntivo. Personalizza messaggi basati su interazioni precedenti, migliorando conversion rate e mantenendo lead caldi senza intervento manuale.",
        automations: ["Sequenze post-call", "Email contestuali", "Reminder automatici", "Personalizzazione messaggi", "Tracking interazioni", "Alert escalation"]
      },
      {
        name: "Proposal Generator",
        detail: "Genera preventivi automatici basati su dati lead, applica pricing dinamico e crea PDF brandizzati. Si integra con CRM e tool di firma elettronica, accelerando processo vendita e riducendo errori umani.",
        automations: ["Generazione preventivi", "Pricing dinamico", "PDF brandizzati", "Integrazione CRM", "Firma elettronica", "Tracking accettazioni"]
      },
      {
        name: "Pipeline Analyst",
        detail: "Analizza pipeline per identificare deal a rischio, genera forecast accurati e analizza win/loss. Fornisce insight per migliorare strategia vendite, integrandosi con CRM per dati real-time e report automatici.",
        automations: ["Analisi deal a rischio", "Generazione forecast", "Win/loss analysis", "Report automatici", "Insight strategia", "Alert anomalie"]
      }
    ]
  },
  {
    id: "customer-service",
    icon: "🛠️",
    title: "Customer Service Agents",
    description: "Supporto 24/7, onboarding e analisi feedback automatizzati.",
    color: "#F59E0B",
    agents: [
      {
        name: "Support Agent L1",
        detail: "Risponde 24/7 a ticket e chat, risolvendo 60-70% casi automaticamente con knowledge base integrata. Esegue escalation intelligente a umani per casi complessi, usando Zendesk o Intercom per gestione unificata.",
        automations: ["Risposta 24/7", "Risoluzione automatica", "Escalation intelligente", "Aggiornamenti ticket", "Knowledge base", "Report risoluzioni"]
      },
      {
        name: "Onboarding Agent",
        detail: "Guida clienti attraverso sequenza onboarding con email, task e monitoraggio progressi. Invia alert per step incompleti o segnali churn, migliorando retention e soddisfazione attraverso follow-up personalizzati.",
        automations: ["Sequenza onboarding", "Monitoraggio progressi", "Alert step incompleti", "Segnali churn", "Follow-up personalizzati", "Report completamento"]
      },
      {
        name: "Feedback & Sentiment Agent",
        detail: "Raccoglie review da multi-canali, analizza sentiment con AI, identifica trend e invia alert per feedback critici. Genera report periodici per migliorare prodotto e servizio, integrandosi con tool di survey.",
        automations: ["Raccolta review", "Analisi sentiment", "Identificazione trend", "Alert critici", "Report periodici", "Miglioramenti suggeriti"]
      },
      {
        name: "Knowledge Base Builder",
        detail: "Analizza ticket risolti per generare FAQ e articoli automaticamente, identifica gap nella knowledge base e suggerisce contenuti. Mantiene documentazione aggiornata, riducendo ticket ripetitivi e migliorando self-service.",
        automations: ["Generazione FAQ", "Articoli auto-generati", "Gap analysis", "Aggiornamenti automatici", "Riduzione ticket", "Miglioramento self-service"]
      }
    ]
  },
  {
    id: "operations",
    icon: "⚙️",
    title: "Operations Agents",
    description: "Automatizza report, riunioni e analisi documenti per efficienza operativa.",
    color: "#8B5CF6",
    agents: [
      {
        name: "Report Automation Agent",
        detail: "Aggrega dati da multi-fonti, calcola KPI, identifica anomalie e genera report schedulati. Invia alert per metriche critiche, riducendo tempo su reporting manuale e fornendo insight real-time per decisioni.",
        automations: ["Aggregazione dati", "Calcolo KPI", "Identificazione anomalie", "Report schedulati", "Alert metriche", "Insight real-time"]
      },
      {
        name: "Meeting Intelligence Agent",
        detail: "Trascrive riunioni automaticamente, estrae action items, crea task in PM tool e invia follow-up. Analizza partecipazione e efficacia, migliorando produttività e accountability attraverso riepiloghi e reminder.",
        automations: ["Trascrizione riunioni", "Estrazione action items", "Creazione task", "Follow-up automatici", "Analisi partecipazione", "Riepiloghi riepiloghi"]
      },
      {
        name: "Document Analysis Agent",
        detail: "Analizza contratti e documenti per clausole chiave, rischi e sommari. Identifica termini sfavorevoli e genera alert, accelerando review legale e riducendo errori in gestione contratti.",
        automations: ["Analisi clausole", "Identificazione rischi", "Generazione sommari", "Alert termini", "Review legale", "Gestione contratti"]
      },
      {
        name: "HR Screening Agent",
        detail: "Parsa CV automaticamente, confronta con job description, assegna ranking candidati e genera report. Integrazione con ATS per flusso recruitment efficiente, riducendo tempo di screening e migliorando qualità assunzioni.",
        automations: ["Parsing CV", "Confronto job description", "Ranking candidati", "Report automatici", "Integrazione ATS", "Flusso recruitment"]
      }
    ]
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: "email-marketing",
    badge: "Marketing",
    badgeColor: "#3B82F6",
    title: "Email Marketing Autopilot",
    sector: "E-commerce",
    before: "Campagne email manuali con tassi di apertura del 15%. Segmentazione basata su intuizioni, sequenze ripetitive che richiedono ore di lavoro settimanali.",
    after: "Sequenze automatizzate con aperture al 35%, segmentazione dinamica basata su comportamenti. L'agente gestisce tutto, liberando il team per strategie creative.",
    result: "+133%",
    resultLabel: "aumento aperture",
    resultExtra: "Riduzione tempo gestione del 80%",
    stack: ["Mailchimp", "ActiveCampaign", "Google Analytics"]
  },
  {
    id: "lead-qualification",
    badge: "Sales",
    badgeColor: "#10B981",
    title: "Lead Qualification",
    sector: "SaaS",
    before: "Qualifica manuale di 50 lead al giorno, con risposta in 24-48 ore. Molti lead freddi instradati erroneamente, conversion rate del 5%.",
    after: "Qualifica automatica 24/7 con scoring preciso, routing immediato. Chatbot risponde in secondi, conversion rate al 15% grazie a follow-up tempestivi.",
    result: "+200%",
    resultLabel: "conversion rate",
    resultExtra: "Risposta immediata vs 48 ore",
    stack: ["HubSpot", "Intercom", "Pipedrive"]
  },
  {
    id: "social-media",
    badge: "Marketing",
    badgeColor: "#3B82F6",
    title: "Social Media Manager AI",
    sector: "Retail",
    before: "Post manuali 3 volte a settimana, engagement del 2%. Contenuti generici senza ottimizzazione per piattaforma, tempo dedicato 10 ore settimanali.",
    after: "Piano editoriale automatizzato con 15 post settimanali ottimizzati, engagement al 8%. L'agente genera copy e schedula, monitorando performance in tempo reale.",
    result: "+300%",
    resultLabel: "engagement",
    resultExtra: "Riduzione tempo del 70%",
    stack: ["Buffer", "Hootsuite", "Meta Ads"]
  },
  {
    id: "customer-support",
    badge: "Customer Service",
    badgeColor: "#F59E0B",
    title: "Customer Support 24/7",
    sector: "Fintech",
    before: "Supporto solo 9-17, ticket risolti in 48 ore. Escalation manuale, clienti insoddisfatti con NPS 30. Costi operativi elevati per staffing.",
    after: "Supporto 24/7 con risoluzione automatica del 65%, ticket chiusi in 2 ore. Escalation intelligente, NPS a 70 grazie a risposte rapide e accurate.",
    result: "+133%",
    resultLabel: "NPS",
    resultExtra: "Riduzione costi del 40%",
    stack: ["Zendesk", "Intercom", "Slack"]
  },
  {
    id: "report-automatici",
    badge: "Operations",
    badgeColor: "#8B5CF6",
    title: "Report Automatici Performance",
    sector: "Manufacturing",
    before: "Report mensili manuali da Excel, 20 ore di lavoro. Dati disallineati, insight ritardati, decisioni basate su dati vecchi di settimane.",
    after: "Report giornalieri automatici con KPI aggiornati, anomalie evidenziate. Alert real-time per metriche critiche, decisioni informate con dati freschi.",
    result: "-75%",
    resultLabel: "tempo reporting",
    resultExtra: "Insight real-time vs mensili",
    stack: ["Google Sheets", "Looker Studio", "Zapier"]
  },
  {
    id: "crm-autopilot",
    badge: "Marketing",
    badgeColor: "#3B82F6",
    title: "CRM Autopilot",
    sector: "Real Estate",
    before: "Aggiornamenti CRM manuali, lead scoring intuitivo. Dati obsoleti, campagne non targettizzate, conversion rate stagnante al 8%.",
    after: "CRM aggiornato automaticamente con enrichment, scoring preciso. Campagne personalizzate basate su dati real-time, conversion rate al 18%.",
    result: "+125%",
    resultLabel: "conversion rate",
    resultExtra: "Dati sempre aggiornati",
    stack: ["HubSpot", "Pipedrive", "Google Ads"]
  },
  {
    id: "onboarding-clienti",
    badge: "Customer Service",
    badgeColor: "#F59E0B",
    title: "Onboarding Clienti",
    sector: "Consulting",
    before: "Onboarding manuale con email sporadiche, completamento del 60% in 30 giorni. Churn precoce, feedback negativo su processo confusionario.",
    after: "Sequenza onboarding guidata con monitoraggio, completamento 90% in 14 giorni. Alert per step saltati, riduzione churn del 50% grazie a supporto proattivo.",
    result: "+50%",
    resultLabel: "riduzione churn",
    resultExtra: "Completamento più rapido",
    stack: ["Notion", "Slack", "Intercom"]
  },
  {
    id: "generazione-preventivi",
    badge: "Sales",
    badgeColor: "#10B981",
    title: "Generazione Preventivi",
    sector: "B2B Services",
    before: "Preventivi creati manualmente in 4 ore, errori frequenti. Clienti aspettano giorni, conversion rate del 10% per proposte ritardate.",
    after: "Preventivi automatici in 15 minuti, personalizzati e accurati. PDF brandizzati inviati immediatamente, conversion rate al 25% grazie a velocità e precisione.",
    result: "+150%",
    resultLabel: "conversion rate",
    resultExtra: "Da 4 ore a 15 minuti",
    stack: ["Pipedrive", "Stripe", "Google Docs"]
  },
  {
    id: "analisi-sentiment",
    badge: "Customer Service",
    badgeColor: "#F59E0B",
    title: "Analisi Sentiment",
    sector: "Hospitality",
    before: "Review lette manualmente, trend identificati tardivamente. Problemi emergenti non risolti, reputazione danneggiata da feedback negativi ignorati.",
    after: "Analisi sentiment automatica con alert per critiche, trend settimanali. Problemi risolti proattivamente, miglioramento reputazione con risposte rapide.",
    result: "-50%",
    resultLabel: "feedback negativi",
    resultExtra: "Risoluzioni proattive",
    stack: ["Google Reviews", "Trustpilot", "Intercom"]
  },
  {
    id: "meeting-intelligence",
    badge: "Operations",
    badgeColor: "#8B5CF6",
    title: "Meeting Intelligence",
    sector: "Tech Startup",
    before: "Note manuali da riunioni, action items dimenticati. Follow-up sporadici, progetti in ritardo per mancanza di accountability.",
    after: "Trascrizioni automatiche con task creati in Asana, follow-up schedulati. Accountability migliorata, progetti completati 30% più velocemente.",
    result: "+30%",
    resultLabel: "velocità progetti",
    resultExtra: "Action items mai dimenticati",
    stack: ["Zoom", "Asana", "Notion"]
  }
];

export const FAQS: Faq[] = [
  {
    question: "L'AI sostituirà il mio team?",
    answer: "No, gli agenti AI potenziano il tuo team automatizzando task ripetitivi. Il team si concentra su strategia, creatività e relazioni, mentre l'AI gestisce l'operativo 24/7."
  },
  {
    question: "Quanto costa?",
    answer: "Dipende dal numero di agenti e integrazioni. Partiamo da €500/mese per setup base, con scalabilità. ROI tipico in 3-6 mesi grazie a efficienze e aumenti conversioni."
  },
  {
    question: "Quanto tempo ci vuole?",
    answer: "Discovery e design in 1 settimana, build/test 2-4 settimane, deploy 1 settimana. Totale 1-2 mesi per agenti completi, con ottimizzazioni continue post-lancio."
  },
  {
    question: "E se l'agente sbaglia?",
    answer: "Gli agenti sono testati rigorosamente prima del deploy. Monitoriamo performance con alert, e umani supervisionano casi critici. Errori sotto 1%, con miglioramento continuo via feedback."
  },
  {
    question: "Che tecnologie usate?",
    answer: "LLM avanzati (GPT-4, Claude) con integrazioni API sicure. Stack: Next.js, Supabase, Framer Motion. Dati criptati, compliance GDPR, hosting su Vercel per sicurezza."
  },
  {
    question: "I miei dati sono al sicuro?",
    answer: "Sì, dati criptati end-to-end, server EU, compliance GDPR. Non vendiamo dati, contratti NDA. Backup automatici, disaster recovery per continuità operativa."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description: "Analizziamo processi attuali, identifichiamo opportunità automazione, definiamo obiettivi e metriche. Durata: 1 settimana."
  },
  {
    id: "design",
    title: "Design",
    description: "Progettiamo agenti su misura, workflow, integrazioni. Creiamo mockup e specifiche tecniche. Durata: 1 settimana."
  },
  {
    id: "build-test",
    title: "Build & Test",
    description: "Sviluppiamo agenti con testing rigoroso, iterazioni basate su feedback. Validazione su dati reali. Durata: 2-4 settimane."
  },
  {
    id: "deploy-train",
    title: "Deploy & Train",
    description: "Deploy in produzione, training team, monitoraggio iniziale. Transizione smooth con supporto. Durata: 1 settimana."
  },
  {
    id: "optimize",
    title: "Optimize",
    description: "Monitoraggio continuo, ottimizzazioni basate su dati, aggiunta features. Miglioramento prestazioni ongoing."
  }
];

export const INTEGRATIONS: string[] = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "Mailchimp",
  "ActiveCampaign",
  "Brevo",
  "Klaviyo",
  "Zendesk",
  "Intercom",
  "Freshdesk",
  "Slack",
  "Google Analytics",
  "Looker Studio",
  "Stripe",
  "Notion",
  "Asana",
  "Monday.com",
  "Google Sheets",
  "Zapier"
];

export const HERO_STATS: HeroStat[] = [
  {
    value: "-70%",
    label: "tempo su task ripetitivi"
  },
  {
    value: "+45%",
    label: "conversion rate"
  },
  {
    value: "24/7",
    label: "operatività agenti"
  },
  {
    value: "<4 sett.",
    label: "tempo di deploy"
  }
];