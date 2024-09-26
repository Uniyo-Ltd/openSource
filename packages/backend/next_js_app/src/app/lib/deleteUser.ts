import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    return 'User deleted successfully'
  } catch (error) {
    throw error
  }
}

export { deleteUser }