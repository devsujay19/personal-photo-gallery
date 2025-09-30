import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  cookies().delete('auth-token');
  const url = request.nextUrl.clone();
  url.pathname = '/';
  url.searchParams.set('logged_out', 'true');
  return redirect(url.toString());
}
