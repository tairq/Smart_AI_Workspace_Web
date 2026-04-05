export type Integration = {
  slug: string;
  name: string;
  category: string;
  description: string;
  useCases: string[];
  setupSteps: string[];
  relatedIntegrations: string[];
};

export const integrations: Integration[] = [
  {
    slug: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description:
      "Connect Salesforce to your automation workflows for bi-directional sync of leads, contacts, opportunities, and custom objects. Trigger automations from Salesforce events and push enriched data back in real time.",
    useCases: [
      "Auto-create leads from web forms and enrich with third-party data",
      "Trigger follow-up sequences when opportunities change stage",
      "Sync custom objects with external databases and tools",
      "Generate automated reports from Salesforce data combined with other sources",
    ],
    setupSteps: [
      "Connect your Salesforce instance via OAuth",
      "Map fields between Salesforce and your other tools",
      "Configure trigger events (new lead, stage change, etc.)",
      "Test with sample data before going live",
      "Monitor sync health via our dashboard",
    ],
    relatedIntegrations: ["hubspot", "slack", "google-sheets"],
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description:
      "Integrate HubSpot with your AI automation stack to supercharge marketing, sales, and service operations. Automate contact enrichment, deal progression, and cross-platform data flows.",
    useCases: [
      "Enrich new contacts with firmographic and intent data automatically",
      "Trigger personalized email sequences based on website behavior",
      "Sync deal data with finance and project management tools",
      "Auto-assign leads to reps based on AI scoring",
    ],
    setupSteps: [
      "Authenticate your HubSpot account",
      "Select which objects to sync (contacts, deals, companies)",
      "Define automation triggers and actions",
      "Map custom properties to your workflow variables",
      "Enable real-time or scheduled sync",
    ],
    relatedIntegrations: ["salesforce", "slack", "microsoft-teams"],
  },
  {
    slug: "slack",
    name: "Slack",
    category: "Communication",
    description:
      "Turn Slack into your automation command center. Receive alerts, approve workflows, trigger actions, and get AI-generated summaries — all without leaving your workspace.",
    useCases: [
      "Get real-time alerts when workflows complete or fail",
      "Approve or reject workflow steps directly from Slack",
      "Trigger automations with slash commands",
      "Receive daily AI-generated summaries of key metrics",
    ],
    setupSteps: [
      "Install the SmartAI Slack app to your workspace",
      "Select channels for notifications",
      "Configure approval workflows with interactive buttons",
      "Set up slash command triggers",
      "Customize notification frequency and format",
    ],
    relatedIntegrations: ["microsoft-teams", "notion", "hubspot"],
  },
  {
    slug: "notion",
    name: "Notion",
    category: "Productivity",
    description:
      "Connect Notion databases and pages to your automation workflows. Sync project data, auto-generate documentation, and keep your knowledge base updated automatically.",
    useCases: [
      "Auto-create project pages when new deals close in CRM",
      "Sync task databases with external project management tools",
      "Generate meeting notes and action items from calendar events",
      "Keep documentation updated when code or processes change",
    ],
    setupSteps: [
      "Connect your Notion workspace via integration token",
      "Select databases and pages to sync",
      "Map database properties to workflow variables",
      "Configure create/update/archive triggers",
      "Test with a sample database",
    ],
    relatedIntegrations: ["slack", "airtable", "google-sheets"],
  },
  {
    slug: "airtable",
    name: "Airtable",
    category: "Database",
    description:
      "Use Airtable as a flexible data layer for your automation workflows. Read, write, and transform records across bases to power everything from inventory tracking to content calendars.",
    useCases: [
      "Use Airtable as the data source for automated email campaigns",
      "Sync inventory levels between Airtable and e-commerce platforms",
      "Trigger workflows when records match specific criteria",
      "Aggregate data from multiple bases into reporting dashboards",
    ],
    setupSteps: [
      "Generate a personal access token in Airtable",
      "Select the base and tables to integrate",
      "Map fields to your workflow schema",
      "Configure polling interval or webhook triggers",
      "Validate data mapping with test records",
    ],
    relatedIntegrations: ["google-sheets", "notion", "shopify"],
  },
  {
    slug: "google-sheets",
    name: "Google Sheets",
    category: "Spreadsheets",
    description:
      "Automate data flows in and out of Google Sheets. Use spreadsheets as workflow inputs, reporting destinations, or data transformation layers — no more manual exports.",
    useCases: [
      "Auto-populate reports from CRM and analytics data",
      "Use sheet rows as triggers for automation workflows",
      "Create approval workflows with sheet-based data entry",
      "Generate formatted exports for stakeholder reporting",
    ],
    setupSteps: [
      "Authenticate with your Google account",
      "Select the spreadsheet and worksheet",
      "Define column mappings for data flow",
      "Choose trigger mode: new row, updated cell, or scheduled",
      "Test with sample data",
    ],
    relatedIntegrations: ["airtable", "salesforce", "hubspot"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Integration Platform",
    description:
      "Extend your automation capabilities by connecting SmartAI workflows to Zapier's 6,000+ app ecosystem. Bridge gaps between niche tools and enterprise systems.",
    useCases: [
      "Connect niche industry tools that don't have native integrations",
      "Migrate existing Zapier automations to more robust AI workflows",
      "Use Zapier as a bridge to legacy systems",
      "Fan out data to multiple destinations simultaneously",
    ],
    setupSteps: [
      "Create a Zapier webhook trigger or action",
      "Connect the webhook to your SmartAI workflow",
      "Map data fields between systems",
      "Test the end-to-end flow",
      "Monitor execution logs for errors",
    ],
    relatedIntegrations: ["make", "slack", "google-sheets"],
  },
  {
    slug: "make",
    name: "Make (Integromat)",
    category: "Integration Platform",
    description:
      "Combine Make's visual automation builder with SmartAI's AI capabilities for complex, multi-branch workflows that handle data transformation and business logic at scale.",
    useCases: [
      "Orchestrate complex multi-step data transformations",
      "Build visual workflow prototypes before production deployment",
      "Connect to Make's 1,500+ app connectors",
      "Run parallel processing branches for high-volume data",
    ],
    setupSteps: [
      "Set up a Make webhook module",
      "Connect to your SmartAI workflow endpoint",
      "Configure data mapping between platforms",
      "Set up error handling and retry logic",
      "Monitor scenario execution",
    ],
    relatedIntegrations: ["zapier", "airtable", "notion"],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Communication",
    description:
      "Bring automation into Microsoft Teams with notifications, approval workflows, and AI-powered assistants that keep your team informed and in control.",
    useCases: [
      "Post workflow notifications to Teams channels",
      "Request approvals via adaptive cards",
      "Trigger automations from Teams messages",
      "Deploy an AI assistant bot for internal queries",
    ],
    setupSteps: [
      "Install the SmartAI connector in Teams admin",
      "Select channels for notifications",
      "Configure adaptive card templates for approvals",
      "Set up bot commands for workflow triggers",
      "Test with a pilot team before org-wide rollout",
    ],
    relatedIntegrations: ["slack", "hubspot", "salesforce"],
  },
  {
    slug: "shopify",
    name: "Shopify",
    category: "E-Commerce",
    description:
      "Automate your Shopify store operations — from inventory management and order processing to customer communication and analytics reporting.",
    useCases: [
      "Sync inventory across Shopify and other sales channels",
      "Automate order fulfillment and shipping notifications",
      "Trigger post-purchase email sequences and review requests",
      "Generate daily sales reports with AI-powered insights",
    ],
    setupSteps: [
      "Connect your Shopify store via API credentials",
      "Select which events to monitor (orders, products, customers)",
      "Map Shopify data to your workflow variables",
      "Configure webhook endpoints for real-time events",
      "Test with sample orders",
    ],
    relatedIntegrations: ["airtable", "google-sheets", "slack"],
  },
];
