"use client";

import { useState, type FormEvent } from "react";
import { Mail, ExternalLink, Send, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const serviceOptions = [
  "AI Workflow Automation",
  "CRM & Sales Automation",
  "Data Pipeline & Reporting",
  "Custom AI Agent Development",
  "Other",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = "Name is required";
    if (!form.get("company")) errs.company = "Company is required";
    const email = form.get("email") as string;
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    if (!form.get("service")) errs.service = "Please select a service";
    const msg = form.get("message") as string;
    if (!msg || msg.length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Contact Us"
            title="Let's Build Something Incredible"
            subtitle="Tell us about your automation challenges and we'll show you what's possible."
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card hover={false}>
                {status === "success" ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <CheckCircle2 size={48} className="mb-4 text-accent-cyan" />
                    <h3 className="font-display text-xl font-bold text-off-white">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" name="name" error={errors.name} placeholder="Your name" />
                      <Field label="Company" name="company" error={errors.company} placeholder="Company name" />
                    </div>
                    <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@company.com" />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-off-white">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        className={cn(
                          "w-full rounded-xl border bg-navy px-4 py-2.5 text-sm text-off-white outline-none transition-colors",
                          errors.service ? "border-red-500" : "border-white/10 focus:border-accent-cyan/50",
                        )}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-off-white">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us about your automation needs..."
                        className={cn(
                          "w-full resize-none rounded-xl border bg-navy px-4 py-2.5 text-sm text-off-white outline-none transition-colors",
                          errors.message ? "border-red-500" : "border-white/10 focus:border-accent-cyan/50",
                        )}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                    )}
                    <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                      {status === "submitting" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              <Card hover={false}>
                <h3 className="mb-4 font-display text-lg font-semibold text-off-white">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:info@smartaiworkspace.tech"
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent-cyan"
                  >
                    <Mail size={18} className="text-electric-blue" />
                    info@smartaiworkspace.tech
                  </a>
                  <a
                    href="https://www.linkedin.com/company/smart-ai-workspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent-cyan"
                  >
                    <ExternalLink size={18} className="text-electric-blue" />
                    LinkedIn
                  </a>
                </div>
              </Card>

              <Card hover={false}>
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="mt-0.5 text-accent-cyan" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-off-white">
                      Schedule a Call
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Prefer to talk live? Book a 30-minute discovery call.
                    </p>
                    <div className="mt-4 rounded-xl border border-dashed border-white/10 p-6 text-center">
                      <p className="text-xs text-muted">Calendly embed placeholder</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-off-white">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border bg-navy px-4 py-2.5 text-sm text-off-white outline-none transition-colors",
          error ? "border-red-500" : "border-white/10 focus:border-accent-cyan/50",
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
