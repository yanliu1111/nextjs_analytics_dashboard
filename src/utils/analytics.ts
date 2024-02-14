import { getDate } from '@/utils';
import { redis } from '@/lib/redis';

type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  persist?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 * 7 * 24;
  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) {
      this.retention = opts.retention;
    }
  }
  // object = {metadata}
  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    // db call to persist this event
    let key = `analytics::${namespace}`;
    if (!opts?.persist) {
      key += `::${getDate()}`; //getDate() is today, getDate(1) is yesterday, getDate(2) is 2 days ago
    }
    // JSON.stringify(event) is metadata
    await redis.hincrby(key, JSON.stringify(event), 1);
    if (!opts?.persist) {
      await redis.expire(key, this.retention);
    }
  }

  //retrieve is for one specific day
  async retrieve(namespace: string, date: string) {
    const res = await redis.hgetall<Record<string, string>>(
      `analytics::${namespace}::${date}`
    );
    return {
      date,
      //res ?? [] is a nullish coalescing operator
      events: Object.entries(res ?? [] ).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
    }
  }
}

export const analytics = new Analytics();
