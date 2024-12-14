"use server"
export const env = async ()=> {
    console.log(process.env.DATABASE_URL)
    console.log("ok")
}