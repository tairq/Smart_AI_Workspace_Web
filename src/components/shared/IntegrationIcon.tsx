"use client";

import {
  SiSalesforce,
  SiHubspot,
  SiSlack,
  SiNotion,
  SiAirtable,
  SiGooglesheets,
  SiZapier,
  SiMake,
  SiShopify,
  SiStripe,
  SiGmail,
  SiGithub,
  SiJira,
  SiZendesk,
  SiMailchimp,
  SiTwilio,
  SiOpenai,
  SiGoogleanalytics,
  SiPostgresql,
  SiAnthropic,
  SiN8N,
  SiVercel,
} from "react-icons/si";
import { MessageSquare } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type IconEntry =
  | { type: "si"; icon: IconType; color: string }
  | { type: "lucide"; icon: LucideIcon; color: string };

const iconMap: Record<string, IconEntry> = {
  claude:             { type: "si", icon: SiAnthropic,       color: "#CC785C" },
  n8n:                { type: "si", icon: SiN8N,             color: "#EA4B71" },
  vercel:             { type: "si", icon: SiVercel,          color: "#FFFFFF" },
  salesforce:         { type: "si", icon: SiSalesforce,      color: "#00A1E0" },
  hubspot:            { type: "si", icon: SiHubspot,         color: "#FF7A59" },
  slack:              { type: "si", icon: SiSlack,           color: "#E01E5A" },
  notion:             { type: "si", icon: SiNotion,          color: "#FFFFFF" },
  airtable:           { type: "si", icon: SiAirtable,        color: "#18BFFF" },
  "google-sheets":    { type: "si", icon: SiGooglesheets,    color: "#34A853" },
  zapier:             { type: "si", icon: SiZapier,          color: "#FF4A00" },
  make:               { type: "si", icon: SiMake,            color: "#A259FF" },
  "microsoft-teams":  { type: "lucide", icon: MessageSquare, color: "#6264A7" },
  shopify:            { type: "si", icon: SiShopify,         color: "#96BF48" },
  stripe:             { type: "si", icon: SiStripe,          color: "#635BFF" },
  gmail:              { type: "si", icon: SiGmail,           color: "#EA4335" },
  github:             { type: "si", icon: SiGithub,          color: "#E6EDF3" },
  jira:               { type: "si", icon: SiJira,            color: "#0052CC" },
  zendesk:            { type: "si", icon: SiZendesk,         color: "#03B585" },
  mailchimp:          { type: "si", icon: SiMailchimp,       color: "#FFE01B" },
  twilio:             { type: "si", icon: SiTwilio,          color: "#F22F46" },
  openai:             { type: "si", icon: SiOpenai,          color: "#FFFFFF" },
  "google-analytics": { type: "si", icon: SiGoogleanalytics, color: "#E37400" },
  postgresql:         { type: "si", icon: SiPostgresql,      color: "#4169E1" },
};

interface IntegrationIconProps {
  slug: string;
  brandColor: string;
  size?: number;
  className?: string;
}

export function IntegrationIcon({ slug, brandColor, size = 24, className }: IntegrationIconProps) {
  const entry = iconMap[slug];
  const containerSize = size + 18;

  const containerStyle = {
    width: containerSize,
    height: containerSize,
    backgroundColor: `${brandColor}18`,
    border: `1px solid ${brandColor}35`,
    flexShrink: 0,
  };

  if (entry) {
    if (entry.type === "si") {
      const Icon = entry.icon as IconType;
      return (
        <div
          className={`flex items-center justify-center rounded-xl ${className ?? ""}`}
          style={containerStyle}
        >
          <Icon size={size} style={{ color: entry.color }} />
        </div>
      );
    }
    // lucide icon
    const Icon = entry.icon as LucideIcon;
    return (
      <div
        className={`flex items-center justify-center rounded-xl ${className ?? ""}`}
        style={containerStyle}
      >
        <Icon size={size} style={{ color: entry.color }} />
      </div>
    );
  }

  // Fallback: colored circle with initial
  const initial = slug.charAt(0).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center rounded-xl font-bold ${className ?? ""}`}
      style={{
        ...containerStyle,
        fontSize: size * 0.55,
        color: brandColor,
      }}
    >
      {initial}
    </div>
  );
}
