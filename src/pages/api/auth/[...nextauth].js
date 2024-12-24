// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

export default NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        

       // Direct MongoDb
       const client = await MongoClient.connect(process.env.MONGODB_URI || "");
       const result = await client
         .db(process.env.MONGODB_DB)
         .collection("user")
         .find(
           {
             username: credentials.username,
             password: credentials.password,
           },
           {
             projection: { username: 1, email: 1, _id: 0 },
           }
         )
         .toArray();

       // If authentication is successful, return the user
       if (result && result.length > 0) {
         return {...result[0]};
       } else {
         throw new Error("User not found ...");
       }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT to store session data
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("token : ",user);
      
      if (user) {
        token.username = user.username;
        token.email = user.email
      }
      return token;
    },
    async session({ session, token ,user}) {
      console.log("token : ",token);
      
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Customize the sign-in page URL
  },
});
