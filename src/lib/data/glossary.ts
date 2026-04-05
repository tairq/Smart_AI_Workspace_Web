export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  explanation: string;
  benefits: string[];
  useCases: string[];
  relatedTerms: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "workflow-automation",
    term: "Workflow Automation",
    definition:
      "The use of technology to automate repeatable business processes, reducing manual intervention and ensuring tasks are completed consistently and efficiently.",
    explanation:
      "Workflow automation takes multi-step business processes — like onboarding a new employee, processing an invoice, or qualifying a sales lead — and executes them automatically based on predefined rules and triggers. Modern workflow automation platforms can connect dozens of tools, route data between systems, handle conditional logic, and even incorporate AI for decision-making. Unlike simple task automation, workflow automation orchestrates entire processes end-to-end.",
    benefits: [
      "Eliminates manual, repetitive tasks",
      "Reduces human error and inconsistency",
      "Accelerates process completion times",
      "Improves visibility and accountability",
      "Scales operations without proportional headcount",
    ],
    useCases: [
      "Employee onboarding across HR, IT, and finance systems",
      "Invoice processing from receipt to payment",
      "Lead qualification and routing in sales pipelines",
      "Customer support ticket triage and escalation",
    ],
    relatedTerms: ["business-process-automation", "robotic-process-automation", "api-integration"],
  },
  {
    slug: "ai-agents",
    term: "AI Agents",
    definition:
      "Autonomous software programs powered by artificial intelligence that can perceive their environment, make decisions, and take actions to accomplish specific goals.",
    explanation:
      "AI agents go beyond traditional chatbots and rule-based automation. They use large language models (LLMs) and other AI technologies to understand context, reason about complex situations, and execute multi-step tasks across multiple tools and systems. An AI agent might read an email, look up customer data in a CRM, draft a response, and schedule a follow-up — all without human intervention. The key differentiator is autonomy: agents don't just follow scripts, they adapt to novel situations.",
    benefits: [
      "Handle complex tasks that require judgment",
      "Operate across multiple tools and data sources",
      "Learn and improve from feedback",
      "Scale customer-facing operations",
      "Reduce response times to seconds",
    ],
    useCases: [
      "Customer support triage and resolution",
      "Document analysis and data extraction",
      "Research and report generation",
      "Internal IT helpdesk automation",
    ],
    relatedTerms: ["conversational-ai", "workflow-automation", "machine-learning-ops"],
  },
  {
    slug: "robotic-process-automation",
    term: "Robotic Process Automation (RPA)",
    definition:
      "A technology that uses software robots to mimic human interactions with digital systems, automating rule-based tasks across applications.",
    explanation:
      "RPA bots interact with applications the same way humans do — clicking buttons, filling forms, copying data between systems, and following predetermined rules. Traditional RPA is best suited for high-volume, rule-based tasks where the process is well-defined and doesn't require judgment. Modern RPA is increasingly combined with AI (known as Intelligent Automation or Hyperautomation) to handle more complex scenarios. While API-based automation is generally preferred for reliability, RPA fills gaps where APIs aren't available.",
    benefits: [
      "Automates legacy systems without API access",
      "Non-invasive — doesn't require changing existing systems",
      "Fast deployment for rule-based processes",
      "24/7 operation without fatigue or errors",
      "Detailed audit trail of all actions",
    ],
    useCases: [
      "Data migration between legacy and modern systems",
      "Form filling and data entry across web applications",
      "Report generation from systems without export capabilities",
      "Compliance checks across multiple platforms",
    ],
    relatedTerms: ["workflow-automation", "business-process-automation", "intelligent-document-processing"],
  },
  {
    slug: "business-process-automation",
    term: "Business Process Automation (BPA)",
    definition:
      "The strategic use of technology to automate complex business processes and functions beyond simple individual tasks.",
    explanation:
      "BPA is broader than task automation or RPA. It focuses on optimizing entire business processes — from strategy through execution. BPA involves analyzing existing processes, identifying inefficiencies, redesigning workflows, and implementing technology to automate and monitor them. It typically involves multiple departments, systems, and stakeholders. Successful BPA requires both technical implementation and organizational change management.",
    benefits: [
      "End-to-end process optimization",
      "Cross-departmental efficiency gains",
      "Data-driven process improvement",
      "Consistent customer and employee experiences",
      "Measurable ROI at the process level",
    ],
    useCases: [
      "Order-to-cash process automation",
      "Procure-to-pay workflows",
      "Employee lifecycle management",
      "Customer journey orchestration",
    ],
    relatedTerms: ["workflow-automation", "robotic-process-automation", "data-pipeline"],
  },
  {
    slug: "api-integration",
    term: "API Integration",
    definition:
      "The process of connecting different software applications through their Application Programming Interfaces (APIs) to enable data exchange and coordinated functionality.",
    explanation:
      "APIs are the connective tissue of modern automation. When two systems need to share data or trigger actions in each other, API integration makes it possible. REST APIs, GraphQL endpoints, and webhooks allow automation platforms to read, write, and subscribe to events across hundreds of tools. Well-designed API integrations are more reliable and efficient than screen-scraping or RPA approaches, making them the preferred method for connecting cloud-based applications.",
    benefits: [
      "Real-time data synchronization",
      "Reliable and maintainable connections",
      "Bidirectional data flow between systems",
      "Event-driven automation triggers",
      "Scalable to high transaction volumes",
    ],
    useCases: [
      "CRM-to-marketing platform data sync",
      "E-commerce order data flowing to fulfillment",
      "Financial data aggregation for reporting",
      "Multi-tool workflow orchestration",
    ],
    relatedTerms: ["workflow-automation", "data-pipeline", "etl"],
  },
  {
    slug: "data-pipeline",
    term: "Data Pipeline",
    definition:
      "An automated series of steps that move and transform data from one or more sources to a destination system for storage, analysis, or further processing.",
    explanation:
      "Data pipelines are the plumbing of data-driven organizations. They extract data from source systems (databases, APIs, files), transform it (clean, validate, enrich, aggregate), and load it into destination systems (data warehouses, dashboards, other applications). Pipelines can run in real-time (streaming) or on a schedule (batch). Robust data pipelines include error handling, data quality checks, monitoring, and alerting to ensure reliable data delivery.",
    benefits: [
      "Automated, reliable data delivery",
      "Consistent data quality and format",
      "Real-time or scheduled processing options",
      "Scalable to growing data volumes",
      "Single source of truth for reporting",
    ],
    useCases: [
      "ETL from operational databases to data warehouse",
      "Real-time analytics dashboard feeds",
      "Cross-platform data synchronization",
      "Automated report generation and distribution",
    ],
    relatedTerms: ["etl", "api-integration", "business-process-automation"],
  },
  {
    slug: "etl",
    term: "ETL (Extract, Transform, Load)",
    definition:
      "A data integration pattern that extracts data from source systems, transforms it into a suitable format, and loads it into a target system such as a data warehouse.",
    explanation:
      "ETL is one of the most fundamental patterns in data engineering. Extract pulls raw data from databases, APIs, files, or streams. Transform cleans, validates, enriches, and restructures the data — handling type conversions, deduplication, and business logic. Load writes the transformed data to its destination. Modern variants include ELT (load raw data first, transform in the warehouse) which leverages the processing power of cloud data warehouses.",
    benefits: [
      "Centralized, clean data for analysis",
      "Handles complex data transformations",
      "Supports multiple data sources and formats",
      "Enables historical data analysis",
      "Feeds reliable data to BI tools",
    ],
    useCases: [
      "Loading sales data from CRM to data warehouse",
      "Combining data from multiple marketing platforms",
      "Migrating data between systems during upgrades",
      "Building unified customer profiles from disparate sources",
    ],
    relatedTerms: ["data-pipeline", "api-integration", "workflow-automation"],
  },
  {
    slug: "machine-learning-ops",
    term: "MLOps (Machine Learning Operations)",
    definition:
      "A set of practices that combines machine learning, DevOps, and data engineering to deploy, monitor, and maintain ML models in production reliably and efficiently.",
    explanation:
      "MLOps bridges the gap between building ML models and running them in production. It covers the entire ML lifecycle: data preparation, model training, testing, deployment, monitoring, and retraining. Without MLOps, models that work in notebooks fail in production — data drift causes accuracy to degrade, models aren't updated, and there's no visibility into performance. MLOps brings software engineering rigor to machine learning.",
    benefits: [
      "Reliable model deployment and serving",
      "Automated retraining when performance degrades",
      "Version control for models and data",
      "Monitoring for data drift and model decay",
      "Faster iteration from experiment to production",
    ],
    useCases: [
      "Deploying fraud detection models in financial services",
      "Maintaining recommendation systems for e-commerce",
      "Running computer vision models for quality control",
      "Operationalizing NLP models for document processing",
    ],
    relatedTerms: ["ai-agents", "data-pipeline", "etl"],
  },
  {
    slug: "intelligent-document-processing",
    term: "Intelligent Document Processing (IDP)",
    definition:
      "The use of AI technologies — including OCR, NLP, and machine learning — to automatically extract, classify, and process data from unstructured documents.",
    explanation:
      "IDP goes beyond simple OCR (optical character recognition). It uses AI to understand the context and meaning of documents — invoices, contracts, medical records, insurance claims — and extract structured data from them. Modern IDP systems can handle varying formats, handwritten text, and even make judgment calls about ambiguous information. The extracted data flows directly into business workflows, eliminating manual data entry.",
    benefits: [
      "90%+ reduction in manual data entry",
      "Handles varied document formats and layouts",
      "Continuous accuracy improvement with feedback",
      "Integrates directly with business workflows",
      "Audit trail for compliance requirements",
    ],
    useCases: [
      "Invoice processing and accounts payable",
      "Contract analysis and clause extraction",
      "Medical record data extraction",
      "Insurance claims document processing",
    ],
    relatedTerms: ["ai-agents", "robotic-process-automation", "workflow-automation"],
  },
  {
    slug: "conversational-ai",
    term: "Conversational AI",
    definition:
      "Technology that enables machines to engage in human-like dialogue, understanding natural language input and generating contextually appropriate responses.",
    explanation:
      "Conversational AI encompasses chatbots, virtual assistants, and voice interfaces powered by natural language processing (NLP) and large language models (LLMs). Unlike scripted chatbots that follow decision trees, modern conversational AI understands intent, maintains context across multi-turn conversations, and can handle unexpected queries. When integrated with business systems, conversational AI becomes a powerful automation interface — users can query data, trigger workflows, and get answers through natural conversation.",
    benefits: [
      "24/7 availability for customer and employee queries",
      "Natural language interface to complex systems",
      "Scales to handle thousands of simultaneous conversations",
      "Reduces support costs while improving response times",
      "Captures valuable interaction data for insights",
    ],
    useCases: [
      "Customer support chatbots for common inquiries",
      "Internal IT helpdesk virtual assistants",
      "Voice-enabled data querying and reporting",
      "Conversational lead qualification on websites",
    ],
    relatedTerms: ["ai-agents", "intelligent-document-processing", "workflow-automation"],
  },
];
