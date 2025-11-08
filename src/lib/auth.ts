import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Lista de emails autorizados para /admin
const AUTHORIZED_ADMIN_EMAILS = [
    'fellipefontanez@gmail.com',
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // Permite login apenas com Google
            if (account?.provider === 'google') {
                return true;
            }
            return false;
        },

        async jwt({ token, user }) {
            // Adiciona informação se o usuário é admin
            if (user) {
                token.isAdmin = AUTHORIZED_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '');
            }
            return token;
        },

        async session({ session, token }) {
            // Passa info de admin para a session com tipos corretos
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    isAdmin: token.isAdmin as boolean,
                }
            };
        }
    },
    pages: {
        signIn: '/login',
        error: '/login/error',
    }
});