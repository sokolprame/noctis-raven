const defaultSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const configured = process.env.SITE_URL?.trim()
    || process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    || process.env.VERCEL_URL?.trim();
  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Set SITE_URL to the public URL for this deployment.");
    }
    return new URL(defaultSiteUrl);
  }

  try {
    const normalized = configured.includes("://") ? configured : `https://${configured}`;
    const parsed = new URL(normalized);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Unsupported protocol");
    return new URL(parsed.origin);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SITE_URL must be a valid public HTTP or HTTPS URL.", { cause: error });
    }
    return new URL(defaultSiteUrl);
  }
}

export const siteUrl = resolveSiteUrl();
