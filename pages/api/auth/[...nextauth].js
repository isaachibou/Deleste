import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb";
import { verifyPassword } from '../../../utils/auth';
import { server } from '../../../config';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      /*credentials: {
        username: { label: "Email", type: "email", placeholder: "isaac.chiboub@rien.com" },
        password: {  label: "Password", type: "password" }
      },*/
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db("Délesté").collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email, 
        });

        console.debug("user :" + JSON.stringify(user))

        if ( user === null) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        console.debug("user :" + JSON.stringify(user))

        return { 
          email: credentials.email
        };
       
      },
    }),
  ],
  //adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {

      const response = await fetch(`${server}/api/auth/users?email=`+session.user.email, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
      });
      let userx =await response.json()
      session.user.role = userx.role
      session.user.id = userx._id
      return session
    }
  },
/*pages: {
  
  signIn: '/auth/signin',
  signOut: '/auth/signout'
}*/

  debug: true
})
