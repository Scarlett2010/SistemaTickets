import { match } from 'assert';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token=request.cookies.get('authToken')?.value;
    const userRole=request.cookies.get('userRole')?.value;

    // Comprueba si la ruta actual está en /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            // Si no hay token, redirige al login
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Verifica el rol para las rutas específicas
        if (request.nextUrl.pathname.startsWith('/dashboard/cliente')&&userRole!=='cliente') {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/dashboard/tecnico')&&userRole!=='tecnico') {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (token&&(userRole==="tecnico"||userRole==="cliente")) {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        } else {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config={
    // matcher: '/dashboard/:path*',
    matcherOrder: ['/dashboard/:path*', '/login'],
};