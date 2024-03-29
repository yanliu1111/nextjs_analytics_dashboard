import { NextRequest, NextResponse } from 'next/server';

import { analytics } from './utils/analytics';

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    try {
      //namespace pageview, to attribute the event
      analytics.track('pageview', {
        page: '/',
        country: req.geo?.country,
      });
    } catch (error) {
      console.error(error);
    }
  }
  // continue to the next middleware, for exploration of the page
  if (req.nextUrl.pathname === '/contact') {
    try {
      //namespace pageview, to attribute the event
      analytics.track('explore', {
        page: '/contact',
        country: req.geo?.country,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.next();
}

export const matchers = [
  {
    matcher: ['/'],
  },
  {
    matcher: ['/contact'],
  },
];

// recommended, custom tracking logic, you can track page visits you can track many things, just be careful that you are not too invasive, if you use cookies, you also notify the user we are not going to do that. but we still have really insightful tracking without any cookie notices.
