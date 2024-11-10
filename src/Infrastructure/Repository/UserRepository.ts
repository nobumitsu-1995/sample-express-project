import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import Circle from '@Domain/Models/Circles/Circle'
import CircleId from '@Domain/Models/Circles/CircleId'
import CircleName from '@Domain/Models/Circles/CircleName'
import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import User from '@Domain/Models/Users/User'
import UserEmail from '@Domain/Models/Users/UserEmail'
import UserId from '@Domain/Models/Users/UserId'
import UserName from '@Domain/Models/Users/UserName'
import UserType from '@Domain/Models/Users/UserType'

export default class UserRepository implements IUserRepository {
  private prisma = new PrismaClient()

  public async findById(id: UserId): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.get() },
    })

    if (!user) {
      return null
    }

    return this.toModel(user)
  }

  public async findByIdWithCircle(
    id: UserId,
  ): Promise<{ user: User; circle: Circle | null } | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.get() },
      include: {
        circle: true,
        ownedCircle: true,
      },
    })

    if (!user) {
      return null
    }

    return this.toModelWithCircle(user)
  }

  public async findByEmail(email: UserEmail): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: email.get() },
    })

    if (!user) {
      return null
    }

    return this.toModel(user)
  }

  public async findByIds(ids: UserId[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { id: { in: ids.map((id) => id.get()) } },
    })

    return users.map((user) => this.toModel(user))
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map((user) => this.toModel(user))
  }

  public async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.get() },
      update: { name: user.name.get() },
      create: {
        id: user.id.get(),
        name: user.name.get(),
        email: user.email.get(),
        type: user.type.get(),
      },
    })
  }

  public async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.get() },
    })
  }

  private toModel(user: Prisma.UserGetPayload<null>) {
    return new User({
      id: new UserId(user.id),
      name: new UserName(user.name),
      email: new UserEmail(user.email),
      type: new UserType(user.type),
    })
  }

  private toModelWithCircle(
    user: Prisma.UserGetPayload<{
      include: {
        circle: true
      }
    }>,
  ) {
    const userInstance = new User({
      id: new UserId(user.id),
      name: new UserName(user.name),
      email: new UserEmail(user.email),
      type: new UserType(user.type),
    })

    if (!user.circle) {
      return {
        user: userInstance,
        circle: null,
      }
    }

    const circleInstance = new Circle({
      id: new CircleId(user.circle?.id),
      name: new CircleName(user.circle?.name),
      owner: new UserId(user.circle?.ownerId),
      members: [],
    })

    return { user: userInstance, circle: circleInstance }
  }
}
