import client from "@/libs/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        console.log('Authorize function called with credentials:', credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log('User found:', user);
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        console.log('is corret password');
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },

  debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
export { authOptions }; // You can export this if you need to use it elsewhere