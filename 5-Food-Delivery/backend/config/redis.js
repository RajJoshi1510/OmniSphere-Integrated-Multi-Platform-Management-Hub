import { Redis } from "@upstash/redis";

// Simple English Comment:
// Safe Upstash Redis initialization.
// If Redis credentials are not provided in local dev, provide a mock in-memory store
// so the food delivery backend server never crashes on startup.
let redis;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (err) {
    console.warn("[OmniBite] Redis connection warning, using memory fallback.");
  }
}

if (!redis) {
  const memoryCache = new Map();
  redis = {
    get: async (key) => memoryCache.get(key) || null,
    set: async (key, val) => { memoryCache.set(key, val); return "OK"; },
    del: async (key) => { memoryCache.delete(key); return 1; }
  };
}

export default redis;
