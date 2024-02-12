import { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    console.log('Page visit', req.nextUrl.pathname);
  }
}

export const matcher = {
  matcher: ['/'],
};

// recommended, custom tracking logic, you can track page visits you can track many things, just be careful that you are not too invasive, if you use cookies, you also notify the user we are not going to do that. but we still have really insightful tracking without any cookie notices.
