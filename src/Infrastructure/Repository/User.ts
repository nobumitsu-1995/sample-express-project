import { PrismaClient } from '@prisma/client'
import { IUserRepository } from 'Domain/Models/Users/IUserRepository'
import User from 'Domain/Models/Users/User'
import UserEmail from 'Domain/Models/Users/UserEmail'
import UserId from 'Domain/Models/Users/UserId'
import UserName from 'Domain/Models/Users/UserName'

export default class UserRepository implements IUserRepository {
  private prisma = new PrismaClient()

  public async findById(id: UserId): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.get() },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return new User({
      id: new UserId(user.id),
      name: new UserName(user.name),
      email: new UserEmail(user.email),
      type: user.type,
    })
  }

  public async findByIds(ids: UserId[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { id: { in: ids.map((id) => id.get()) } },
    })

    return users.map(
      (user) =>
        new User({
          id: new UserId(user.id),
          name: new UserName(user.name),
          email: new UserEmail(user.email),
          type: user.type,
        }),
    )
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users.map(
      (user) =>
        new User({
          id: new UserId(user.id),
          name: new UserName(user.name),
          email: new UserEmail(user.email),
          type: user.type,
        }),
    )
  }

  public async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.get() },
      update: { name: user.name.get() },
      create: {
        id: user.id.get(),
        name: user.name.get(),
        email: user.email.get(),
        type: user.type,
      },
    })
  }

  public async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.get() },
    })
  }
}
