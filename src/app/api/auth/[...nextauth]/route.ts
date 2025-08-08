import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (
					credentials?.email === 'abciitian@gmail.com' &&
					credentials?.password === 'abciitian'
				) {
					return { id: '1', name: 'Test User', email: 'abciitian@gmail.com' };
				}
				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/auth/login',
	},
	debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
