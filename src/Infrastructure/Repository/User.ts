import { Prisma, PrismaClient } from '@prisma/client'
import { IUserRepository } from 'Domain/Models/Users/IUserRepository'
import User from 'Domain/Models/Users/User'
import UserEmail from 'Domain/Models/Users/UserEmail'
import UserId from 'Domain/Models/Users/UserId'
import UserName from 'Domain/Models/Users/UserName'
import UserType from 'Domain/Models/Users/UserType'

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
}
