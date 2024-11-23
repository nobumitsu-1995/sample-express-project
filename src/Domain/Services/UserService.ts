import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import type UserEmail from '@Domain/Models/Users/UserEmail'
import type UserId from '@Domain/Models/Users/UserId'
import { TYPES } from '@Infrastructure/DI/types'

@injectable()
export default class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async DuplicateEmail(email: UserEmail) {
    const duplicatedUser = await this.userRepository.findByEmail(email)

    return duplicatedUser !== null
  }

  async canJoinCircle(userId: UserId): Promise<boolean> {
    const user = await this.userRepository.findByIdWithCircle(userId)
    return !user?.circle
  }
}
