
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('oryon_user_session');
  const { pathname } = request.nextUrl;

  // Se não houver cookie e o utilizador não estiver na página de login, redirecione para o login
  if (!sessionCookie && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se houver cookie e o utilizador estiver na página de login, redirecione para o dashboard
  if (sessionCookie && pathname === '/') {
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
