import "server-only";

/**
 * Small in-memory sliding-window rate limiter.
 * On serverless (Vercel) each warm instance has its own memory, so this is a
 * best-effort spam brake, not a hard guarantee. Swap for Upstash/Redis if needed.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { allowed: false as const, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // keep the map from growing forever
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return { allowed: true as const };
}
