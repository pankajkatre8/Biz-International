import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('authorization');

  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Block all protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/supervisor/:path*',
  ],
};
