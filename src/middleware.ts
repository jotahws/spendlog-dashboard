import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const apiKey = request.cookies.get('Authorization');
    const { pathname } = request.nextUrl;

    // Redirect to login if no cookie is present and accessing other pages
    if (pathname !== '/login' && !apiKey) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow the request if validation passes
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
          Apply middleware to all pages except static files, 
          API routes, or other specific exclusions.
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};