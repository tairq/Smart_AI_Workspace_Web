import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const INDEXNOW_KEY = "bdb30d37a1734386b7915ff88da3aa54";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = new URL(siteConfig.url).host;

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  const expected = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const urls =
    body && typeof body === "object" && "urls" in body
      ? (body as { urls: unknown }).urls
      : null;

  if (
    !Array.isArray(urls) ||
    urls.length === 0 ||
    urls.length > 10000 ||
    !urls.every(
      (u): u is string =>
        typeof u === "string" && u.startsWith(`${siteConfig.url}/`),
    )
  ) {
    return NextResponse.json(
      { error: "urls must be a non-empty array of same-host URLs" },
      { status: 400 },
    );
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "IndexNow rejected request", status: res.status, detail: text },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, submitted: urls.length });
}
