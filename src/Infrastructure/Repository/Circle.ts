import { Prisma, PrismaClient } from '@prisma/client'
import Circle from 'Domain/Models/Circles/Circle'
import CircleId from 'Domain/Models/Circles/CircleId'
import CircleName from 'Domain/Models/Circles/CircleName'
import { ICircleRepository } from 'Domain/Models/Circles/ICircleRepository'
import UserId from 'Domain/Models/Users/UserId'

export default class CircleRepository implements ICircleRepository {
  private prisma = new PrismaClient()

  public async findById(id: CircleId): Promise<Circle | null> {
    const circle = await this.prisma.circle.findUnique({
      where: { id: id.get() },
      include: { members: true },
    })

    if (!circle) {
      return null
    }

    return this.toModel(circle)
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

    return circles.map((circle) => this.toModel(circle))
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

  private toModel(
    circle: Prisma.CircleGetPayload<{ include: { members: true } }>,
  ): Circle {
    return new Circle({
      id: new CircleId(circle.id),
      name: new CircleName(circle.name),
      owner: new UserId(circle.ownerId),
      members: circle?.members.map((member) => new UserId(member.id)) || [],
    })
  }
}
