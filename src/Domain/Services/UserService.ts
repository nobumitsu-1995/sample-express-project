import { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import UserEmail from '@Domain/Models/Users/UserEmail'
import UserId from '@Domain/Models/Users/UserId'

type UserServiceProps = {
  repository: IUserRepository
}
export default class UserService {
  private readonly userRepository: IUserRepository

  constructor({ repository }: UserServiceProps) {
    this.userRepository = repository
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
