import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getUsers(page: number, pageSize: number) {
  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
    return users
  } catch (error) {
    throw error
  }
}

export { getUsers }