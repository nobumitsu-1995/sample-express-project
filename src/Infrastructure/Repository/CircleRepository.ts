import type { PrismaClient } from '@prisma/client'
import type Circle from '@Domain/Models/Circles/Circle'
import type CircleId from '@Domain/Models/Circles/CircleId'
import type CircleName from '@Domain/Models/Circles/CircleName'
import type { ICircleFactory } from '@Domain/Models/Circles/ICircleFactory'
import type { ICircleRepository } from '@Domain/Models/Circles/ICircleRepository'
import type UserId from '@Domain/Models/Users/UserId'

type CircleRepositoryProps = {
  prisma: PrismaClient
  circleFactory: ICircleFactory
}
export default class CircleRepository implements ICircleRepository {
  private readonly prisma: PrismaClient
  private readonly circleFactory: ICircleFactory

  constructor({ prisma, circleFactory }: CircleRepositoryProps) {
    this.prisma = prisma
    this.circleFactory = circleFactory
  }

  public async findById(id: CircleId): Promise<Circle | null> {
    const circle = await this.prisma.circle.findUnique({
      where: { id: id.get() },
      include: { members: true },
    })

    if (!circle) {
      return null
    }

    return this.circleFactory.createFromData(circle)
  }

  public async findByIdWithUsersData(id: CircleId) {
    const circle = await this.prisma.circle.findUnique({
      where: { id: id.get() },
      include: {
        owner: true,
        members: true,
      },
    })

    if (!circle) {
      return null
    }

    return this.circleFactory.createFromDataWithUsersData({
      ...circle,
    })
  }

  public async findByName(name: CircleName): Promise<Circle | null> {
    const circle = await this.prisma.circle.findFirst({
      where: { name: name.get() },
      include: { members: true },
    })

    if (!circle) {
      return null
    }

    return this.circleFactory.createFromData(circle)
  }

  public async searchByName(name: CircleName): Promise<Circle[]> {
    const circles = await this.prisma.circle.findMany({
      where: {
        name: {
          contains: name.get(),
          mode: 'insensitive',
        },
      },
      include: { members: true },
    })

    return circles.map((circle) => this.circleFactory.createFromData(circle))
  }

  public async disconnectMember(id: CircleId, userId: UserId) {
    await this.prisma.circle.update({
      where: { id: id.get() },
      data: {
        members: {
          disconnect: {
            id: userId.get(),
          },
        },
      },
    })
  }
  public async save(circle: Circle) {
    await this.prisma.circle.upsert({
      where: { id: circle.id.get() },
      update: {
        name: circle.name.get(),
        ownerId: circle.owner.get(),
        members: {
          connect: circle.getMembers().map((id) => ({
            id: id.get(),
          })),
        },
      },
      create: {
        id: circle.id.get(),
        name: circle.name.get(),
        ownerId: circle.owner.get(),
        members: {
          connect: circle.getMembers().map((id) => ({
            id: id.get(),
          })),
        },
      },
    })
  }
  public async delete(id: CircleId) {
    await this.prisma.circle.delete({
      where: { id: id.get() },
    })
  }
}
