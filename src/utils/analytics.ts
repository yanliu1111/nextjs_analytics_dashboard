import { getDate } from '@/utils';
import { parse } from 'date-fns'
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
  // build a utility function to fetch multiple days, time series dashboard
  async retrieveDays(namespace: string, nDays: number) {
    type AnalyticsPromise = ReturnType<typeof analytics.retrieve>;
    const promises: AnalyticsPromise [] = [];
    for (let i = 0; i < nDays; i++) {
      const formatedDate = getDate(i);
      const promise = analytics.retrieve(namespace, formatedDate);
      promises.push(promise); //adding into array
  }
  const fetched = await Promise.all(promises);
  const data = fetched.sort ((a, b) => {
    if(parse(a.date, 'dd/MM/yyyy', new Date()) > parse(b.date, 'dd/MM/yyyy', new Date())) {
      return 1;
    } else {
      return -1;
    }
  }); //a.date.localeCompare(b.date)
  return data;
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


export const analytics = new Analytics();
