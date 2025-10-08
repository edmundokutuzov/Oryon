
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('oryon_user_session');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/' || pathname === '/forgot-password';
  const isDashboardPage = pathname.startsWith('/dashboard');

  // If there's no session cookie and the user is trying to access a protected page
  if (!sessionCookie && isDashboardPage) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If there is a session cookie and the user is trying to access an authentication page
  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Corresponde a todas as rotas, exceto as que começam com:
  // - api (rotas de API)
  // - _next/static (ficheiros estáticos)
  // - _next/image (otimização de imagens)
  // - favicon.ico (ícone do site)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
