import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  callbacks: {
    jwt: ({ token, user }) => {
      // only the first time jwt callback is run we'll get the user object
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'Chidog' },
        password: { label: 'password', type: 'password' },
      },
      authorize: (credentials) => {
        // not worried about hashing/salting this password. it's just to practice the auth
        // if it gets popped the user/pass combo still isn't used elsewhere
        // if you get it, you can see who is attending the wedding. oOoOoOoOh
        if (
          credentials?.username.toLowerCase() ===
            process.env.DASHBOARD_USERNAME &&
          credentials?.password === process.env.DASHBOARD_PASSWORD
        ) {
          // just need to return a 'user' object to make it happy
          return {
            id: 2,
            name: 'bobby',
          };
        }

        // failed login
        return null;
      },
    }),
  ],
});
