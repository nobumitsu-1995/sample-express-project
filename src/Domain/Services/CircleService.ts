import CircleName from 'Domain/Models/Circles/CircleName'
import { ICircleRepository } from 'Domain/Models/Circles/ICircleRepository'
import { IUserRepository } from 'Domain/Models/Users/IUserRepository'

type CircleServiceRepositoryProps = {
  circleRepository: ICircleRepository
  userRepository: IUserRepository
}
export default class CircleService {
  private readonly circleRepository: ICircleRepository
  private readonly userRepository: IUserRepository

  constructor({
    circleRepository,
    userRepository,
  }: CircleServiceRepositoryProps) {
    this.circleRepository = circleRepository
    this.userRepository = userRepository
  }

  public async DuplicateName(name: CircleName) {
    const duplicatedCircle = await this.circleRepository.findByName(name)

    return duplicatedCircle !== null
  }
}
