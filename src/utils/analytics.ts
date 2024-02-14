import { redis } from '@/lib/redis';

type AnalyticsArgs = {
  retention?: number;
};

export class Analytics {
  private retention: number = 60 * 60 * 7 * 24;
  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) {
      this.retention = opts.retention;
    }
  }
  // object = {metadata}
  async track(namespace: string, event: object = {}) {
    // db call to persist this event
    const key = `analytics::${namespace}`;
    // JSON.stringify(event) is metadata
    await redis.hincrby(key, JSON.stringify(event), 1);
  }
}

export const analytics = new Analytics();
