import { Prisma, PrismaClient } from '@prisma/client'
import BlackList from '@Domain/Models/Circles/BlackList/BlackList'
import BlackListId from '@Domain/Models/Circles/BlackList/BlackListId'
import { IBlackListRepository } from '@Domain/Models/Circles/BlackList/IBlackListRepository'
import CircleId from '@Domain/Models/Circles/CircleId'
import UserId from '@Domain/Models/Users/UserId'

export default class BlackListRepository implements IBlackListRepository {
  private prisma = new PrismaClient()

  public async findById(id: BlackListId): Promise<BlackList | null> {
    const blackList = await this.prisma.blackList.findUnique({
      where: { id: id.get() },
      include: { users: true },
    })

    if (!blackList) return null

    return this.toModel(blackList)
  }

  public async findByCircleId(id: CircleId): Promise<BlackList | null> {
    const blackList = await this.prisma.blackList.findUnique({
      where: { circleId: id.get() },
      include: { users: true },
    })

    if (!blackList) return null

    return this.toModel(blackList)
  }

  public async save(blackList: BlackList) {
    await this.prisma.blackList.upsert({
      where: { id: blackList.id.get() },
      update: {
        circleId: blackList.circleId.get(),
        users: {
          connect: blackList.getBlockedUsers().map((id) => ({
            id: id.get(),
          })),
        },
      },
      create: {
        id: blackList.id.get(),
        circleId: blackList.circleId.get(),
        users: {
          connect: blackList.getBlockedUsers().map((id) => ({
            id: id.get(),
          })),
        },
      },
    })
  }

  public async delete(id: BlackListId) {
    await this.prisma.blackList.delete({
      where: { id: id.get() },
    })
  }

  private toModel(
    blackList: Prisma.BlackListGetPayload<{ include: { users: true } }>,
  ): BlackList {
    return new BlackList({
      id: new BlackListId(blackList.id),
      circleId: new CircleId(blackList.circleId),
      users: blackList.users.map((user) => new UserId(user.id)),
    })
  }
}
