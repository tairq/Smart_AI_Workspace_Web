export type Integration = {
  slug: string;
  name: string;
  category: string;
  description: string;
  brandColor: string;
  useCases: string[];
  setupSteps: string[];
  relatedIntegrations: string[];
};

export const integrations: Integration[] = [
  {
    slug: "claude",
    name: "Claude",
    category: "AI & ML",
    brandColor: "#CC785C",
    description:
      "Integrate Anthropic's Claude directly into your automation workflows. Use Claude's advanced reasoning, analysis, and generation capabilities to power intelligent decision-making at any step in your pipeline.",
    useCases: [
      "Analyze and summarize documents, contracts, and reports with high accuracy",
      "Build AI agents that reason through complex multi-step tasks",
      "Generate personalized content and responses from structured data",
      "Classify, extract, and transform unstructured data at scale",
    ],
    setupSteps: [
      "Add your Anthropic API key to your workflow credentials",
      "Select the Claude model (Opus, Sonnet, or Haiku) for each step",
      "Write system and user prompts tailored to your use case",
      "Configure output parsing for structured responses",
      "Monitor token usage and latency via the dashboard",
    ],
    relatedIntegrations: ["n8n", "openai", "slack"],
  },
  {
    slug: "n8n",
    name: "n8n",
    category: "Workflow Automation",
    brandColor: "#EA4B71",
    description:
      "n8n is the core automation engine powering Smart AI Workspace. Build visual, code-optional workflows that connect your entire tool stack with AI-powered logic, webhooks, and 400+ native integrations.",
    useCases: [
      "Orchestrate end-to-end business workflows across hundreds of tools",
      "Build AI agent pipelines with looping, branching, and human-in-the-loop steps",
      "Process webhooks and API events in real time with low latency",
      "Self-host workflows for full data privacy and compliance",
    ],
    setupSteps: [
      "Connect to your n8n instance via API key",
      "Import or build workflows using the visual canvas",
      "Configure credentials for each connected service",
      "Set up webhook triggers for real-time event processing",
      "Deploy and monitor workflows via the n8n dashboard",
    ],
    relatedIntegrations: ["claude", "openai", "slack"],
  },
  {
    slug: "vercel",
    name: "Vercel",
    category: "Cloud & DevOps",
    brandColor: "#000000",
    description:
      "Deploy and host your AI-powered web applications on Vercel's global edge network. Seamlessly connect frontend deployments to n8n automation backends for fast, scalable, production-ready solutions.",
    useCases: [
      "Deploy Next.js frontends with instant global edge distribution",
      "Trigger n8n workflows from Vercel serverless functions",
      "Automate deployment previews and CI/CD pipeline notifications",
      "Scale AI-powered web apps without managing infrastructure",
    ],
    setupSteps: [
      "Connect your Git repository to Vercel",
      "Configure environment variables for n8n webhook endpoints",
      "Set up deployment hooks to trigger automation workflows",
      "Configure edge functions for low-latency AI responses",
      "Monitor deployments and performance via Vercel analytics",
    ],
    relatedIntegrations: ["github", "n8n", "slack"],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    category: "CRM",
    brandColor: "#00A1E0",
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
    brandColor: "#FF7A59",
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
    brandColor: "#4A154B",
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
    brandColor: "#000000",
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
    brandColor: "#18BFFF",
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
    brandColor: "#34A853",
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
    brandColor: "#FF4A00",
    description:
      "Extend your automation capabilities by connecting SmartAI workflows to Zapier's 7,000+ app ecosystem. Bridge gaps between niche tools and enterprise systems.",
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
    name: "Make",
    category: "Integration Platform",
    brandColor: "#6D00CC",
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
    brandColor: "#6264A7",
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
    brandColor: "#96BF48",
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
  {
    slug: "stripe",
    name: "Stripe",
    category: "Payments",
    brandColor: "#635BFF",
    description:
      "Connect Stripe to automate payment workflows, revenue reporting, and customer lifecycle events. Trigger actions on successful charges, subscriptions, refunds, and disputes.",
    useCases: [
      "Auto-provision accounts when subscriptions activate",
      "Trigger onboarding sequences after successful payment",
      "Sync revenue data to your accounting and analytics tools",
      "Alert your team on failed payments and churn signals",
    ],
    setupSteps: [
      "Connect Stripe via API keys",
      "Select webhook events to listen for",
      "Map payment data to your workflow variables",
      "Configure retry logic for failed webhooks",
      "Test with Stripe's test mode",
    ],
    relatedIntegrations: ["shopify", "hubspot", "google-sheets"],
  },
  {
    slug: "gmail",
    name: "Gmail",
    category: "Email",
    brandColor: "#EA4335",
    description:
      "Automate email workflows with Gmail. Send personalized messages, parse inbound emails to trigger workflows, and keep your inbox-driven processes running hands-free.",
    useCases: [
      "Send personalized outreach emails from workflow triggers",
      "Parse incoming emails to create CRM contacts or support tickets",
      "Auto-label and route emails based on AI classification",
      "Trigger follow-up sequences from email engagement data",
    ],
    setupSteps: [
      "Authenticate with your Google account",
      "Grant Gmail API permissions",
      "Configure inbound email parsing rules",
      "Set up outbound email templates",
      "Test with a sandbox inbox",
    ],
    relatedIntegrations: ["hubspot", "salesforce", "slack"],
  },
  {
    slug: "github",
    name: "GitHub",
    category: "Developer Tools",
    brandColor: "#181717",
    description:
      "Integrate GitHub with your automation workflows to connect code activity to business processes — from PR reviews to release deployments and team notifications.",
    useCases: [
      "Notify stakeholders when PRs are merged or deployments complete",
      "Auto-create project tasks from GitHub issues",
      "Trigger CI/CD pipelines based on business rule changes",
      "Generate release notes from commit history using AI",
    ],
    setupSteps: [
      "Install the GitHub App on your organization",
      "Select repositories to monitor",
      "Configure event triggers (push, PR, release, issue)",
      "Map GitHub data to downstream workflow steps",
      "Test with a staging repository",
    ],
    relatedIntegrations: ["slack", "notion", "jira"],
  },
  {
    slug: "jira",
    name: "Jira",
    category: "Project Management",
    brandColor: "#0052CC",
    description:
      "Sync Jira with your automation ecosystem to keep engineering and business teams aligned. Automate issue creation, status updates, and cross-tool reporting.",
    useCases: [
      "Auto-create Jira tickets from customer support escalations",
      "Sync sprint status to dashboards and stakeholder reports",
      "Trigger Slack alerts when high-priority issues are raised",
      "Update CRM opportunities when related engineering tickets close",
    ],
    setupSteps: [
      "Connect your Jira Cloud or Server instance",
      "Authenticate via OAuth or API token",
      "Select projects and issue types to monitor",
      "Configure webhook triggers and JQL filters",
      "Test with a sample issue",
    ],
    relatedIntegrations: ["github", "slack", "notion"],
  },
  {
    slug: "zendesk",
    name: "Zendesk",
    category: "Customer Support",
    brandColor: "#03363D",
    description:
      "Automate support operations by connecting Zendesk to your AI workflows. Triage tickets, escalate urgent issues, and sync support data with your CRM and product tools.",
    useCases: [
      "Auto-tag and route tickets using AI classification",
      "Escalate urgent tickets to Slack and on-call systems",
      "Sync resolved tickets to CRM contact timelines",
      "Generate weekly support performance reports automatically",
    ],
    setupSteps: [
      "Connect your Zendesk subdomain via API token",
      "Select ticket events to trigger workflows",
      "Configure AI classification rules",
      "Map ticket data to CRM and reporting fields",
      "Test with sample ticket submissions",
    ],
    relatedIntegrations: ["salesforce", "hubspot", "slack"],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "Email Marketing",
    brandColor: "#FFE01B",
    description:
      "Automate your email marketing pipeline with Mailchimp. Sync audience segments, trigger campaigns from external events, and track engagement back to your CRM.",
    useCases: [
      "Add contacts to Mailchimp audiences from CRM events",
      "Trigger drip campaigns when leads reach scoring thresholds",
      "Sync campaign engagement data back to Salesforce or HubSpot",
      "Auto-segment audiences based on behavioral data",
    ],
    setupSteps: [
      "Authenticate your Mailchimp account",
      "Select audiences and lists to manage",
      "Configure segment sync rules",
      "Set up campaign triggers",
      "Monitor audience health and unsubscribe rates",
    ],
    relatedIntegrations: ["hubspot", "salesforce", "google-sheets"],
  },
  {
    slug: "twilio",
    name: "Twilio",
    category: "Messaging",
    brandColor: "#F22F46",
    description:
      "Add SMS, voice, and WhatsApp to your automation workflows via Twilio. Send transactional messages, power two-way SMS bots, and keep customers informed in real time.",
    useCases: [
      "Send SMS confirmations for form submissions and bookings",
      "Build two-way SMS workflows for lead qualification",
      "Trigger voice alerts for critical system events",
      "Route WhatsApp messages into your CRM as leads",
    ],
    setupSteps: [
      "Add your Twilio Account SID and Auth Token",
      "Configure a Twilio phone number",
      "Set up inbound webhook for incoming messages",
      "Build message templates for outbound flows",
      "Test with a staging phone number",
    ],
    relatedIntegrations: ["hubspot", "slack", "zendesk"],
  },
  {
    slug: "openai",
    name: "OpenAI",
    category: "AI & ML",
    brandColor: "#412991",
    description:
      "Embed GPT-4, Whisper, and DALL·E into your automation workflows. Summarize text, classify data, generate content, and build AI-powered decision layers at any step.",
    useCases: [
      "Summarize support tickets and sales calls automatically",
      "Classify and route inbound data using GPT-4",
      "Generate personalized email copy from CRM data",
      "Transcribe audio and video with Whisper for downstream workflows",
    ],
    setupSteps: [
      "Add your OpenAI API key",
      "Select the model for each workflow step",
      "Write system and user prompts",
      "Configure output parsing and error handling",
      "Monitor token usage and costs",
    ],
    relatedIntegrations: ["slack", "notion", "hubspot"],
  },
  {
    slug: "google-analytics",
    name: "Google Analytics",
    category: "Analytics",
    brandColor: "#E37400",
    description:
      "Pull GA4 data into your automation workflows for reporting, alerting, and audience activation. Combine web analytics with CRM and ad platform data for a full picture.",
    useCases: [
      "Alert teams when traffic anomalies are detected",
      "Sync GA4 audience segments to ad platforms automatically",
      "Generate weekly traffic reports and distribute via email or Slack",
      "Combine GA4 data with CRM data for revenue attribution",
    ],
    setupSteps: [
      "Authenticate with your Google account",
      "Select the GA4 property to connect",
      "Configure data export dimensions and metrics",
      "Set up scheduled or event-driven pulls",
      "Map analytics data to reporting templates",
    ],
    relatedIntegrations: ["google-sheets", "hubspot", "slack"],
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "Databases",
    brandColor: "#4169E1",
    description:
      "Connect PostgreSQL databases directly to your automation workflows. Query, insert, update, and transform data without manual SQL management or custom scripts.",
    useCases: [
      "Query production data to power scheduled business reports",
      "Insert enriched lead data from CRM events into your data warehouse",
      "Trigger workflows when database records meet defined criteria",
      "Sync operational data to analytics dashboards in real time",
    ],
    setupSteps: [
      "Provide your PostgreSQL host, port, and credentials",
      "Whitelist SmartAI IP ranges in your firewall",
      "Test the connection with a sample SELECT query",
      "Define queries and parameterized statements",
      "Monitor query performance via execution logs",
    ],
    relatedIntegrations: ["google-sheets", "airtable", "slack"],
  },
];
