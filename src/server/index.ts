import { Prisma, PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod"

const prisma = new PrismaClient();
export const appRouter = router({
    getPets: publicProcedure.query(async () => {
        try {
            const pets = await prisma.pet.findMany()
            return pets
        }
        catch (error) {
            throw error;
        }
    }),
    createPet: publicProcedure.input(z.object({ name: z.string(), owner: z.string() })).mutation(async ({ input }) => {
        try {
            const pet = await prisma.pet.create({
                data: {
                    name: input.name,
                    owner: input.owner
                }
            })
            return pet
        }
        catch (error) {
            throw error;
        }
    }),
    deletePet: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        try {
            await prisma.pet.delete({ where: { id: input.id } })
            return
        }
        catch (error) {
            throw error;
        }
    })
})

export type AppRouter = typeof appRouter


