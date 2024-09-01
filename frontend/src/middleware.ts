import { match } from 'assert';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Middleware is running");
    const token=request.cookies.get('authToken')?.value;
    const userRole=request.cookies.get('userRole')?.value;
    console.log("token,userRole", token, userRole);

    // Comprueba si la ruta actual está en /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            // Si no hay token, redirige al login
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Verifica el rol para las rutas específicas
        if (request.nextUrl.pathname.startsWith('/dashboard/usuario')&&userRole!=='cliente') {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/dashboard/tecnico')&&userRole!=='tecnico') {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        console.log("token,userRole", token, userRole);
        if (token&&userRole==="tecnico") {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        } else if (token&&userRole==="cliente") {
            return NextResponse.redirect(new URL('/dashboard/home', request.url));
        } else {
            return NextResponse.next();
        }

    }

    return NextResponse.next();
}

export const config={
    matcher: '/:path*',
};
