import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per serverless instance)
// For multi-instance production, replace with Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

const ALLOWED_SERVICES = [
  "AI Workflow Automation",
  "CRM & Sales Automation",
  "Data Pipeline & Reporting",
  "Custom AI Agent Development",
  "Other",
];

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, company, email, service, message, industry } = body;

    // Presence checks
    if (!name || !company || !email || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Length limits
    if (
      typeof name !== "string" ||
      name.length > 100 ||
      typeof company !== "string" ||
      company.length > 150 ||
      typeof email !== "string" ||
      email.length > 254 ||
      typeof service !== "string" ||
      typeof message !== "string" ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Service allowlist
    if (!ALLOWED_SERVICES.includes(service)) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim().toLowerCase(),
          service,
          industry: typeof industry === "string" ? industry.trim() : "",
          message: message.trim(),
        }),
      });

      if (!webhookRes.ok) {
        console.error("n8n webhook error:", webhookRes.status);
        return NextResponse.json(
          { error: "Failed to submit. Please try again." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
}
