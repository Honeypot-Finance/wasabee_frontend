import { kv as vercelKv} from "@vercel/kv";

export const kv = process.env.VERCEL_KV ? vercelKv : new Map();