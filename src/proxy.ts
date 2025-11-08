import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTHORIZED_ADMIN_EMAILS = [
    'fellipefontanez@gmail.com',
];

// Função principal do proxy
export async function proxy(request: NextRequest) {
    const response = await handleAuthorization(request);
    return response;
}

// Lógica de autorização
async function handleAuthorization(request: NextRequest) {
    const session = await auth();
    const pathname = request.nextUrl.pathname;

    // Verifica se é uma rota protegida
    const isProtectedRoute =
        pathname.startsWith('/admin') ||
        pathname.startsWith('/api/admin');

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Verifica autenticação
    if (!session) {
        return redirectToLogin(request, pathname);
    }

    // Verifica autorização por email
    console.log(session);
    const userEmail = session.user?.email;
    console.log(userEmail);
    const isAuthorized = userEmail && AUTHORIZED_ADMIN_EMAILS.includes(userEmail.toLowerCase());
    console.log(isAuthorized)
    session.user = { ...session.user, isAdmin: !!isAuthorized }

    if (!isAuthorized) {
        return redirectToAccessDenied(request);
    }

    // Acesso permitido - pode adicionar headers personalizados aqui
    const response = NextResponse.next();
    response.headers.set('x-authorized-user', userEmail || 'unknown');

    return response;
}

// Funções auxiliares
function redirectToLogin(request: NextRequest, originalPath: string) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', originalPath);
    return NextResponse.redirect(loginUrl);
}

function redirectToAccessDenied(request: NextRequest) {
    const deniedUrl = new URL('/access-denied', request.url);
    return NextResponse.redirect(deniedUrl);
}

// Configuração de rotas
export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*'
    ]
};