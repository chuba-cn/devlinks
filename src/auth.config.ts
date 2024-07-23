import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./queries/user";

export default {
    providers: [
      credentials({
        authorize: async (credentials) => {

            // Logic for verifying users
            let user = await getUserFromDb(credentials.email as string)

            if(!user){
                console.log("No user found");
                // User not found, which means this is the first attempt
                // to login
                return null;
            }

            return user;
        },
      }),
    ],
} satisfies NextAuthConfig;