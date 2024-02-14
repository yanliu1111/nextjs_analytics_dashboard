import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: 'https://usw2-harmless-bluejay-30374.upstash.io',
  token: process.env.REDIS_KEY!,
});
