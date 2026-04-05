export type Industry = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  painPoints: string[];
  useCases: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  relatedServices: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "AI Automation for Healthcare Organizations",
    description:
      "Reduce administrative burden, streamline patient intake, and automate compliance workflows — so your team can focus on patient care, not paperwork.",
    painPoints: [
      "Manual patient data entry across multiple systems",
      "Compliance documentation and audit trails",
      "Appointment scheduling and follow-up coordination",
      "Insurance claim processing bottlenecks",
      "Fragmented communication between departments",
    ],
    useCases: [
      {
        title: "Patient Intake Automation",
        description: "Auto-populate EHR systems from intake forms, verify insurance eligibility in real-time, and route patients to the right department.",
      },
      {
        title: "Compliance & Audit Workflows",
        description: "Automated HIPAA compliance checks, document retention policies, and audit trail generation across all patient touchpoints.",
      },
      {
        title: "Claims Processing Pipeline",
        description: "AI-powered claim validation, automatic coding suggestions, and real-time status tracking to reduce denial rates by up to 40%.",
      },
    ],
    stats: [
      { value: "40%", label: "Reduction in claim denials" },
      { value: "8hrs", label: "Saved per admin per week" },
      { value: "99.2%", label: "Compliance accuracy" },
    ],
    relatedServices: ["AI Workflow Automation", "Data Pipeline & Reporting"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "AI Automation for Real Estate Companies",
    description:
      "Automate lead nurturing, property data syncing, and transaction coordination to close deals faster with less manual effort.",
    painPoints: [
      "Leads falling through the cracks in manual follow-up",
      "Duplicate data entry across MLS, CRM, and marketing tools",
      "Slow document collection and contract processing",
      "Inconsistent client communication",
      "Manual reporting on pipeline and market trends",
    ],
    useCases: [
      {
        title: "Lead Nurturing Automation",
        description: "AI scores incoming leads, triggers personalized drip campaigns, and alerts agents when prospects are ready to engage.",
      },
      {
        title: "Transaction Coordination",
        description: "Automated document collection, deadline tracking, and multi-party communication for seamless closings.",
      },
      {
        title: "Market Analytics Pipeline",
        description: "Aggregate MLS data, public records, and market trends into automated weekly reports for your team and clients.",
      },
    ],
    stats: [
      { value: "3x", label: "Faster lead response time" },
      { value: "25%", label: "More deals closed per agent" },
      { value: "15hrs", label: "Saved per transaction" },
    ],
    relatedServices: ["CRM & Sales Automation", "AI Workflow Automation"],
  },
  {
    slug: "finance",
    name: "Finance & Banking",
    headline: "AI Automation for Financial Services",
    description:
      "Automate risk assessment, regulatory reporting, and client onboarding workflows while maintaining strict compliance standards.",
    painPoints: [
      "Manual KYC/AML verification processes",
      "Regulatory reporting that takes weeks to compile",
      "Siloed data across trading, risk, and operations",
      "Slow client onboarding with excessive paperwork",
      "Fraud detection relying on rule-based systems",
    ],
    useCases: [
      {
        title: "KYC/AML Automation",
        description: "AI-powered identity verification, document extraction, and risk scoring that reduces onboarding from days to minutes.",
      },
      {
        title: "Regulatory Reporting",
        description: "Automated data aggregation, validation, and report generation for SEC, FINRA, and internal compliance requirements.",
      },
      {
        title: "Fraud Detection Pipeline",
        description: "Real-time transaction monitoring with ML-powered anomaly detection that adapts to emerging fraud patterns.",
      },
    ],
    stats: [
      { value: "90%", label: "Faster KYC processing" },
      { value: "60%", label: "Reduction in false positives" },
      { value: "$2M+", label: "Annual compliance cost savings" },
    ],
    relatedServices: ["Data Pipeline & Reporting", "Custom AI Agents"],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    headline: "AI Automation for E-Commerce Businesses",
    description:
      "Automate inventory management, order fulfillment, customer support, and marketing workflows to scale your online store without scaling your team.",
    painPoints: [
      "Inventory sync issues across multiple sales channels",
      "Manual order processing and fulfillment delays",
      "Repetitive customer support tickets",
      "Inconsistent product data across platforms",
      "Time-consuming marketing campaign management",
    ],
    useCases: [
      {
        title: "Multi-Channel Inventory Sync",
        description: "Real-time inventory updates across Shopify, Amazon, and WooCommerce with automatic reorder triggers and low-stock alerts.",
      },
      {
        title: "AI Customer Support Agent",
        description: "Custom AI agent handles order status inquiries, returns, and FAQs — escalating to humans only for complex issues.",
      },
      {
        title: "Marketing Automation Pipeline",
        description: "Automated abandoned cart sequences, review requests, and personalized product recommendations based on purchase history.",
      },
    ],
    stats: [
      { value: "70%", label: "Support tickets resolved by AI" },
      { value: "35%", label: "Increase in repeat purchases" },
      { value: "99.9%", label: "Inventory accuracy" },
    ],
    relatedServices: ["Custom AI Agents", "CRM & Sales Automation"],
  },
  {
    slug: "legal",
    name: "Legal",
    headline: "AI Automation for Law Firms",
    description:
      "Automate document review, client intake, billing, and case management workflows so attorneys can focus on practicing law.",
    painPoints: [
      "Hours spent on document review and contract analysis",
      "Manual client intake and conflict checking",
      "Time tracking and billing inefficiencies",
      "Deadline management across hundreds of cases",
      "Knowledge management across the firm",
    ],
    useCases: [
      {
        title: "Contract Review Automation",
        description: "AI-powered clause extraction, risk flagging, and comparison against standard templates — reducing review time by 80%.",
      },
      {
        title: "Client Intake Pipeline",
        description: "Automated conflict checks, engagement letter generation, and matter creation across your practice management system.",
      },
      {
        title: "Billing Automation",
        description: "Automatic time capture from emails and documents, invoice generation, and payment follow-up sequences.",
      },
    ],
    stats: [
      { value: "80%", label: "Faster contract review" },
      { value: "12hrs", label: "Saved per attorney per week" },
      { value: "30%", label: "Increase in billable hours captured" },
    ],
    relatedServices: ["Custom AI Agents", "AI Workflow Automation"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "AI Automation for Manufacturing Companies",
    description:
      "Automate production scheduling, quality control reporting, and supply chain coordination to reduce downtime and increase throughput.",
    painPoints: [
      "Manual production scheduling and capacity planning",
      "Quality control data scattered across systems",
      "Supply chain visibility limited to spreadsheets",
      "Maintenance scheduling based on fixed intervals, not actual need",
      "Slow communication between shop floor and management",
    ],
    useCases: [
      {
        title: "Production Scheduling",
        description: "AI-optimized scheduling that balances capacity, material availability, and delivery deadlines across production lines.",
      },
      {
        title: "Quality Control Pipeline",
        description: "Automated defect logging, root cause analysis, and corrective action workflows triggered by real-time inspection data.",
      },
      {
        title: "Supply Chain Automation",
        description: "Automated PO generation, supplier communication, and inventory forecasting based on production schedules and lead times.",
      },
    ],
    stats: [
      { value: "25%", label: "Reduction in downtime" },
      { value: "40%", label: "Faster quality incident resolution" },
      { value: "15%", label: "Improvement in on-time delivery" },
    ],
    relatedServices: ["Data Pipeline & Reporting", "AI Workflow Automation"],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    headline: "AI Automation for Marketing Agencies",
    description:
      "Automate client reporting, campaign management, and internal operations so your agency can serve more clients without burning out.",
    painPoints: [
      "Hours spent building client reports every week",
      "Manual campaign setup across multiple platforms",
      "Client communication scattered across email and Slack",
      "Onboarding new clients takes too long",
      "Tracking profitability per client is nearly impossible",
    ],
    useCases: [
      {
        title: "Automated Client Reporting",
        description: "Pull data from Google Ads, Meta, analytics, and CRM into branded reports — generated and sent automatically on schedule.",
      },
      {
        title: "Campaign Operations",
        description: "Automated campaign briefs, asset routing, approval workflows, and cross-platform publishing.",
      },
      {
        title: "Client Onboarding",
        description: "Automated questionnaires, access provisioning, kickoff scheduling, and project setup across your PM tool.",
      },
    ],
    stats: [
      { value: "10hrs", label: "Saved per client per month" },
      { value: "50%", label: "Faster client onboarding" },
      { value: "2x", label: "More clients per account manager" },
    ],
    relatedServices: ["Data Pipeline & Reporting", "CRM & Sales Automation"],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    headline: "AI Automation for Logistics Companies",
    description:
      "Automate route optimization, shipment tracking, and partner coordination to move goods faster and more efficiently.",
    painPoints: [
      "Manual route planning and dispatch coordination",
      "Shipment status updates require constant human follow-up",
      "Document processing (BOL, customs, invoices) is manual",
      "Limited visibility across the entire supply chain",
      "Exception handling relies on phone calls and emails",
    ],
    useCases: [
      {
        title: "Shipment Tracking Automation",
        description: "Real-time tracking updates aggregated from carriers, with automated notifications to customers and internal teams.",
      },
      {
        title: "Document Processing",
        description: "AI-powered extraction from bills of lading, customs forms, and invoices — validated and routed automatically.",
      },
      {
        title: "Exception Management",
        description: "Automated detection of delays, damage reports, and compliance issues with instant escalation workflows.",
      },
    ],
    stats: [
      { value: "45%", label: "Faster document processing" },
      { value: "30%", label: "Reduction in delivery exceptions" },
      { value: "20%", label: "Lower operational costs" },
    ],
    relatedServices: ["AI Workflow Automation", "Custom AI Agents"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    headline: "AI Automation for Insurance Companies",
    description:
      "Automate underwriting, claims processing, and policyholder communication to reduce cycle times and improve customer satisfaction.",
    painPoints: [
      "Manual underwriting taking days per application",
      "Claims processing bottlenecks causing customer frustration",
      "Policy renewal communication is inconsistent",
      "Fraud detection relies on outdated rules",
      "Agent productivity limited by administrative tasks",
    ],
    useCases: [
      {
        title: "Automated Underwriting",
        description: "AI-assisted risk assessment that pulls data from multiple sources, scores applications, and routes decisions in minutes.",
      },
      {
        title: "Claims Processing Pipeline",
        description: "End-to-end claims automation from first notice of loss through settlement, with AI-powered damage assessment.",
      },
      {
        title: "Policyholder Communication",
        description: "Automated renewal reminders, policy change confirmations, and personalized cross-sell recommendations.",
      },
    ],
    stats: [
      { value: "75%", label: "Faster claims resolution" },
      { value: "50%", label: "Reduction in underwriting time" },
      { value: "35%", label: "Increase in renewal rates" },
    ],
    relatedServices: ["Custom AI Agents", "Data Pipeline & Reporting"],
  },
  {
    slug: "saas",
    name: "SaaS",
    headline: "AI Automation for SaaS Companies",
    description:
      "Automate user onboarding, churn prediction, support operations, and internal workflows to scale your SaaS business efficiently.",
    painPoints: [
      "User onboarding sequences require constant manual tuning",
      "Churn signals are detected too late to act on",
      "Support tickets overwhelm the team as user base grows",
      "Internal operations (billing, provisioning) don't scale",
      "Product usage data exists but isn't actionable",
    ],
    useCases: [
      {
        title: "Onboarding Automation",
        description: "Behavior-triggered email sequences, in-app guidance, and milestone tracking that adapts to each user's journey.",
      },
      {
        title: "Churn Prevention Pipeline",
        description: "AI monitors usage patterns, identifies at-risk accounts, and triggers personalized retention workflows automatically.",
      },
      {
        title: "Support Automation",
        description: "AI agent handles L1 support, auto-creates bug reports from conversations, and escalates intelligently to engineering.",
      },
    ],
    stats: [
      { value: "40%", label: "Reduction in churn" },
      { value: "3x", label: "Faster user activation" },
      { value: "60%", label: "Support tickets auto-resolved" },
    ],
    relatedServices: ["Custom AI Agents", "CRM & Sales Automation"],
  },
];
