import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb";
import { verifyPassword } from '../../../utils/auth';

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
        const usersCollection = client.db("ZakIGatsbyProject").collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log("user :" + user)

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return { email: "toutpremieruser@gmail.com" };
       
      },
    }),
  ],
  //adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
/*pages: {
  
  signIn: '/auth/signin',
  signOut: '/auth/signout'
}*/

  debug: true
})
