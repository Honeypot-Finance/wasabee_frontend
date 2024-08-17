// import Redis from 'ioredis';
import { BentoCache, bentostore } from 'bentocache';
import { memoryDriver } from 'bentocache/drivers/memory';
import { redisDriver } from 'bentocache/drivers/redis';
const { REDIS_URL } = process.env;

const bentoGlobal = global as typeof global & {
  bento?: BentoCache<any>;
};

export const bento =
  bentoGlobal.bento ||
  new BentoCache({
    default: 'multitier',
    stores: {
      multitier: bentostore()
        .useL1Layer(memoryDriver({ maxItems: 300, maxSize: 10_000_000 }))
        // .useL2Layer(
        //   redisDriver({
        //     connection: new Redis(REDIS_URL),
        //   }),
        // ),
    },
    timeouts: {
      soft: '100ms',
      hard: '3s'
    },
    ttl: 5 * 1000,
    earlyExpiration: 0.8,
    gracePeriod: {
      enabled: true,
      duration: '24h',
      fallbackDuration: '1m',
    },
  });

if (!bentoGlobal.bento) {
  bentoGlobal.bento = bento;
}

export const cacheProvider = bento.namespace("honeydex-" + process.env.NEXT_PUBLIC_ENV || "PRODUCTION");

export const getCacheKey = (key: string, args?: any) => {
   return `${key}-${JSON.stringify(args)}`;
}


