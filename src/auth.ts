import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/util/db"
import authConfig from "./auth.config"
import { LoginSchema } from "@/util/schema/user";
import Credentials from "next-auth/providers/credentials"

export const { handlers , auth, signIn, signOut } = 
  NextAuth({
    pages :{
      signIn : "/auth/login"
    },
    providers: [
      Credentials({
        authorize: async (credentials) => {
          let user = null
   
          // logic to salt and hash password
          const validateFileds = LoginSchema.safeParse(credentials)
   
          if(validateFileds.success){
            const {email,password}=validateFileds.data
            
            const user=""
            /* const user=getUserByEmail(email)
            if(!user || !user.password) return null

            const passwordMatch=await bcrypt.compare(
              password,
              user.password
            )
            if(passwordMatch) return user
            */
          }
          return null
        },
      }),
    ],
  })
