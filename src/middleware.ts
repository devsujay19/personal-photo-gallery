import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/gallery'];
const AUTH_ROUTE = '/';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_ROUTE;
    return NextResponse.redirect(url);
  }

  if (pathname === AUTH_ROUTE && authToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/gallery';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
