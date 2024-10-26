import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Alice',
      email: 'alice@example.com',
    },
  })

  console.log({ alice })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
