import type { ReactElement } from "react";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const BRAND = {
  navy: "#0B1426",
  navyLight: "#0F1B2E",
  electricBlue: "#0066FF",
  accentCyan: "#00D4FF",
  offWhite: "#F1F5F9",
  lightGray: "#CBD5E0",
  muted: "#94A3B8",
};

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

export type OgTemplateProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  accentColor?: string;
  footerRight?: string;
};

export function OgTemplate({
  title,
  eyebrow,
  description,
  accentColor = BRAND.accentCyan,
  footerRight = "B2B AI Automation",
}: OgTemplateProps): ReactElement {
  const displayTitle = truncate(title, 110);
  const displayDescription = description ? truncate(description, 180) : undefined;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
        color: BRAND.offWhite,
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        position: "relative",
      }}
    >
      {/* Ambient glow — top right */}
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -220,
          width: 760,
          height: 760,
          display: "flex",
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 65%)`,
        }}
      />
      {/* Ambient glow — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: -320,
          left: -160,
          width: 820,
          height: 820,
          display: "flex",
          background: `radial-gradient(circle, ${BRAND.electricBlue}33 0%, transparent 65%)`,
        }}
      />

      {/* Brand row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${BRAND.accentCyan}, ${BRAND.electricBlue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BRAND.navy,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          S
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: BRAND.offWhite,
            letterSpacing: -0.3,
          }}
        >
          Smart AI Workspace
        </div>
      </div>

      {/* Content block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 28,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: displayTitle.length > 70 ? 56 : 68,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {displayTitle}
        </div>

        {displayDescription ? (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: BRAND.muted,
              marginTop: 28,
              lineHeight: 1.4,
              letterSpacing: -0.2,
            }}
          >
            {displayDescription}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 48,
          paddingTop: 28,
          borderTop: `1px solid ${BRAND.muted}33`,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: BRAND.lightGray }}>
          smartaiworkspace.tech
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: accentColor,
          }}
        >
          {footerRight}
        </div>
      </div>
    </div>
  );
}
