"use server"

import { LoginSchema } from "@/util/schema/user"
import { z } from "zod"

export const login = async  (data: z.infer<typeof LoginSchema>)=>{
    const validateFileds=LoginSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }
    return { succes : "Login !"}
}