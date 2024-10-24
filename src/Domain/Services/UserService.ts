import { IUserRepository } from 'Domain/Models/Users/IUserRepository'
import User from 'Domain/Models/Users/User'

type UserServiceProps = {
  repository: IUserRepository
}
export default class UserService {
  private readonly userRepository: IUserRepository

  constructor({ repository }: UserServiceProps) {
    this.userRepository = repository
  }

  public async Exists(user: User) {
    const duplicatedUser = await this.userRepository.findByEmail(user.email)

    return duplicatedUser !== null
  }
}
