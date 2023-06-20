//generated by loglib
import { prismaAdapter } from "@loglib/prisma-adapter"
import { createServer } from "@loglib/next"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default createServer({
    adapter: prismaAdapter(db),
})