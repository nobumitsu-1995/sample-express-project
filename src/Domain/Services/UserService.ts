import { IUserRepository } from 'Domain/Models/Users/IUserRepository'
import UserEmail from 'Domain/Models/Users/UserEmail'

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
}
