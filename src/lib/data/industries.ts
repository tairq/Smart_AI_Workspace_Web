export type Industry = {
  slug: string;
  name: string;
  metaTitle?: string;
  headline: string;
  description: string;
  painPoints: string[];
  useCases: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  relatedServices: string[];
  image?: string;
  faqs: { question: string; answer: string }[];
};

export const industries: Industry[] = [
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How does AI automation help real estate teams close deals faster?",
        answer:
          "By scoring incoming leads in real time and triggering personalized follow-up within minutes — not hours — your agents reach prospects while interest is highest. Automated transaction coordination then handles document collection, deadline tracking, and multi-party reminders so closings don't stall on missing paperwork. Most teams see lead-response time drop by 3x and per-agent capacity grow by ~25%.",
      },
      {
        question: "Can AI integrate with our MLS, CRM, and marketing tools at the same time?",
        answer:
          "Yes — that's the core use case. We build workflows that sync property data from your MLS into your CRM, push listings into marketing tools (Mailchimp, Constant Contact, social schedulers), and pull engagement signals back into the lead score. One source of truth, no duplicate data entry.",
      },
      {
        question: "Will automation make our communication feel impersonal to clients?",
        answer:
          "Done well, no — done badly, yes. Our drip campaigns are scored by engagement, not on a fixed schedule, so prospects only get a touch when they're showing buying signals. Agents get a clean handoff with full context the moment a lead becomes ready, and every outbound message references the prospect's specific search criteria. The goal is more personalized communication at scale, not less.",
      },
      {
        question: "How long until we see results from real estate automation?",
        answer:
          "Lead-routing and follow-up automation usually goes live within 2 to 4 weeks and produces measurable lift in the first 30 days. Transaction-coordination workflows take longer to build (6 to 8 weeks) because they touch more systems, but they deliver the largest time savings — around 15 hours per closed transaction.",
      },
    ],
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
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How can AI automation prevent inventory sync issues across sales channels?",
        answer:
          "We connect your channels (Shopify, Amazon, eBay, wholesale portals) to a central inventory source — usually your ERP or a single source-of-truth database — and run reconciliation workflows on every order, restock, and return. Stock levels stay accurate within seconds across every channel, and overselling alerts fire before a customer ever sees an out-of-stock product they just bought.",
      },
      {
        question: "What kind of customer support questions can AI agents handle automatically?",
        answer:
          "Order status, shipping updates, return initiation, sizing questions, and product recommendations all resolve without a human. AI agents pull from your order management system, knowledge base, and product catalog — and escalate to a human only for refunds, complaints, or anything ambiguous. Most stores see 60–70% of tickets resolved without intervention.",
      },
      {
        question: "Can AI automation work with our existing e-commerce platform?",
        answer:
          "Yes. We work with Shopify, WooCommerce, BigCommerce, Magento, custom Headless setups, and any platform with an API. We build on top of what you have rather than asking you to migrate, and integrations cover both storefront and back-office tools (Klaviyo, Gorgias, ShipStation, NetSuite, etc.).",
      },
      {
        question: "How does AI automation help scale e-commerce without hiring more staff?",
        answer:
          "Manual work — order routing, ticket triage, return processing, marketing personalization — scales linearly with order volume; automation breaks that link. You handle 5x the orders without 5x the headcount. The first 60 days usually focus on the highest-volume manual task, which alone often pays back the project.",
      },
    ],
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How does AI automation improve manufacturing operations?",
        answer:
          "We connect production data, ERP, MES, and supplier systems so you get real-time visibility into throughput, downtime, and inventory — without operators rekeying numbers into spreadsheets. AI models then forecast demand, predict equipment maintenance needs, and trigger reorder workflows automatically. The outcome is fewer stockouts, less unplanned downtime, and tighter operating margins.",
      },
      {
        question: "Can AI work with legacy manufacturing systems and PLCs?",
        answer:
          "Yes. We bridge legacy systems through API gateways, OPC-UA connectors, or scheduled data extracts where modern APIs don't exist. The automation layer sits on top — your PLCs, SCADA, and ERP keep running unchanged. We've connected systems as old as 20+ years to modern AI workflows.",
      },
      {
        question: "What kind of ROI should manufacturers expect from AI automation?",
        answer:
          "Typical wins: 15–30% reduction in unplanned downtime through predictive maintenance, 20% lower inventory holding costs through better demand forecasting, and 5–10 hours per week per operator saved on manual reporting and data entry. Most engagements pay back in 6 to 9 months.",
      },
      {
        question: "How do you handle data security in industrial environments?",
        answer:
          "All workflows run in your network — self-hosted n8n, your cloud, or on-prem — so production data never leaves your environment unless you choose to send it. AI calls go through providers that contractually don't train on your data, and we follow standard ISO 27001 / NIST guidance for credential handling and access scoping.",
      },
    ],
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
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How does AI automation help marketing agencies scale without scaling headcount?",
        answer:
          "Reporting, campaign QA, content briefing, and client onboarding are the four heaviest manual loads at most agencies — and all four are highly automatable. We build workflows that pull data from ad platforms, GA4, and CRMs into branded client reports, generate first-draft campaign briefs from intake forms, and run pre-flight checks on every campaign before launch. Account managers reclaim 10+ hours a week per client.",
      },
      {
        question: "Can AI automation work with our existing ad platforms and analytics tools?",
        answer:
          "Yes. We integrate with Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, GA4, Google Search Console, HubSpot, Salesforce, and any platform with an API. Reports pull live data on every refresh — no more month-end CSV exports.",
      },
      {
        question: "Will AI replace our creative and strategy work?",
        answer:
          "No — it removes the work around your creative work. Strategy, creative direction, and client relationships stay with your team. Automation handles the data movement, reporting, QA, and repetitive production tasks (resizing, formatting, briefing) so your senior people spend their time on the work clients actually pay for.",
      },
      {
        question: "How do you protect client data and brand voice in automated workflows?",
        answer:
          "Each client's data lives in its own scoped workspace; credentials never cross. For AI-generated content, we tune models against your client's brand guidelines, past approved work, and tone-of-voice docs — and a human reviewer always signs off before anything goes live or to the client.",
      },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    metaTitle: "AI Automation for Logistics",
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
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How does AI automation improve logistics and supply chain operations?",
        answer:
          "We connect your TMS, WMS, ERP, and carrier APIs into unified workflows that route shipments dynamically, update tracking automatically, flag exceptions before they become customer issues, and reconcile freight invoices line by line. Visibility goes up; manual coordination work goes down.",
      },
      {
        question: "Can AI handle exception management and shipment delays?",
        answer:
          "Yes. Workflows watch for delays, weather events, and carrier issues, then automatically reroute, notify customers, and update internal teams — with the right tone, the right ETA, and the right next step. Exceptions that used to take hours of phone calls resolve in minutes.",
      },
      {
        question: "Will AI automation work with our 3PL partners?",
        answer:
          "Yes. We integrate with major 3PLs through their portals, APIs, or EDI feeds, and normalize the data so you get a single view across in-house and outsourced operations. Inventory, in-transit, and proof-of-delivery data all stay in sync.",
      },
      {
        question: "How does AI improve freight cost visibility and accuracy?",
        answer:
          "Our reconciliation workflows compare every carrier invoice line against the original quote, accessorial charges, and contracted rates — flagging discrepancies for review before payment. Logistics teams typically recover 2–5% of total freight spend in the first 6 months.",
      },
    ],
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    faqs: [
      {
        question: "How does AI automation help SaaS companies reduce churn?",
        answer:
          "We build product-usage-driven workflows that detect early warning signs — drop in active users, drop in feature adoption, support ticket spikes — and trigger the right intervention automatically (CSM outreach, in-app message, exec escalation). Catching at-risk accounts 30 days earlier typically reduces gross churn by 1–3 percentage points.",
      },
      {
        question: "Can AI automate customer onboarding for SaaS platforms?",
        answer:
          "Yes — and it's one of the highest-leverage use cases. Workflows pull signup data, provision accounts, send role-based welcome content, schedule kickoff calls, and track activation milestones. Time-to-value drops by weeks, and CS teams stop manually piecing together onboarding for every new logo.",
      },
      {
        question: "How does AI improve sales operations for SaaS teams?",
        answer:
          "Lead scoring against firmographic + product-usage signals, automatic CRM enrichment, pipeline hygiene workflows, and AI-summarized call notes are the standard package. Sales reps spend more time selling and less time updating Salesforce; pipeline data gets dramatically more accurate.",
      },
      {
        question: "Will AI automation integrate with our existing tech stack?",
        answer:
          "Almost certainly yes. We work with HubSpot, Salesforce, Pipedrive, Intercom, Zendesk, Mixpanel, Amplitude, Segment, Stripe, and most SaaS tools with APIs. If a tool has an API or webhook, we can plug into it.",
      },
    ],
  },
];
