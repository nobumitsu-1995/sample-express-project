import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import type UserEmail from '@Domain/Models/Users/UserEmail'
import type UserId from '@Domain/Models/Users/UserId'

type UserServiceProps = {
  userRepository: IUserRepository
}
export default class UserService {
  private readonly userRepository: IUserRepository

  constructor({ userRepository }: UserServiceProps) {
    this.userRepository = userRepository
  }

  public async DuplicateEmail(email: UserEmail) {
    const duplicatedUser = await this.userRepository.findByEmail(email)

    return duplicatedUser !== null
  }

  async canJoinCircle(userId: UserId): Promise<boolean> {
    const user = await this.userRepository.findByIdWithCircle(userId)
    return !user?.circle
  }
}
