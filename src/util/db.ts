import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prismaInit = async ()=>{
    const prismaF = globalForPrisma.prisma || new PrismaClient()
    try {
        const existingOption = await prismaF.option.findUnique({
          where: { id: "1" },
        });
    
        if (!existingOption) {
          await prismaF.option.create({
            data: {
              id: "1", 
            },
          });
          console.log("Option with id=1 created.");
        } else {
          console.log("Option with id=1 already exists.");
        }
      } catch (error) {
        console.error("Error initializing options:", error);
      }

    return prismaF
}

export const prisma =await prismaInit()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma



 
