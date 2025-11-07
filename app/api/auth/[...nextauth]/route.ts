import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ⚠️ Replace this mock logic with real DB validation later
        if (
          credentials?.email === "demo@user.com" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", name: "Demo User", email: "demo@user.com" }
        }
        return null
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as any
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
