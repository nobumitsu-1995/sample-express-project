import type CircleFactory from '@Application/Factory/CircleFactory'
import CircleId from '@Domain/Models/Circles/CircleId'
import CircleName from '@Domain/Models/Circles/CircleName'
import type { ICircleRepository } from '@Domain/Models/Circles/ICircleRepository'
import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import UserId from '@Domain/Models/Users/UserId'
import type CircleService from '@Domain/Services/CircleService'
import type UserService from '@Domain/Services/UserService'
import type CircleGetCommand from './get/CircleGetCommand'
import CircleGetDTO from './get/CircleGetDTO'
import type CircleCreateCommand from './create/CircleCreateCommand'
import type CircleNameChangeCommand from './update/CircleNameChangeCommand'
import type CircleJoinCommand from './update/CircleJoinCommand'
import type CircleWithdrawalCommand from './update/CircleWithdrawalCommand'
import type CircleDeleteCommand from './delete/CircleDeleteCommand'
import CircleNameAlreadyTakenError from '@Domain/Models/Circles/Error/CircleNameAlreadyTakenError'
import CanNotJoinCircleError from '@Domain/Models/Circles/Error/CanNotJoinCircleError'
import CircleNotFoundError from '@Domain/Models/Circles/Error/CircleNotFoundError'
import CircleOwnerCanNotWithdrawalError from '@Domain/Models/Circles/Error/CircleOwnerCanNotWithdrawalError'
import UserNotFoundError from '@Domain/Models/Users/Error/UserNotFoundError'

type CircleApplicationServiceProps = {
  circleRepository: ICircleRepository
  userRepository: IUserRepository
  circleService: CircleService
  userService: UserService
  circleFactory: CircleFactory
}
export default class CircleApplicationService {
  private readonly circleRepository: ICircleRepository
  private readonly userRepository: IUserRepository
  private readonly circleService: CircleService
  private readonly userService: UserService
  private readonly circleFactory: CircleFactory

  constructor({
    circleRepository,
    userRepository,
    circleService,
    userService,
    circleFactory,
  }: CircleApplicationServiceProps) {
    this.circleRepository = circleRepository
    this.userRepository = userRepository
    this.circleService = circleService
    this.userService = userService
    this.circleFactory = circleFactory
  }

  public async get(command: CircleGetCommand): Promise<CircleGetDTO | null> {
    const circleId = new CircleId(command.id)
    const data = await this.circleRepository.findByIdWithUsersData(circleId)

    return data === null ? null : new CircleGetDTO(data)
  }

  public async create(command: CircleCreateCommand) {
    const circle = this.circleFactory.create(command)
    const isDuplicated = await this.circleService.DuplicateName(circle.name)

    if (isDuplicated) {
      throw new CircleNameAlreadyTakenError()
    }

    const canJoinCircle = await this.userService.canJoinCircle(circle.owner)

    if (!canJoinCircle) {
      throw new CanNotJoinCircleError()
    }

    this.circleRepository.save(circle)
    return
  }

  public async updateName(command: CircleNameChangeCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new CircleNotFoundError()
    }

    const circleName = new CircleName(command.name)
    const isDuplicated = await this.circleService.DuplicateName(circleName)

    if (isDuplicated) {
      throw new CircleNameAlreadyTakenError()
    }

    circle.changeName(circleName)
    this.circleRepository.save(circle)
    return
  }

  public async join(command: CircleJoinCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new CircleNotFoundError()
    }

    const joinUserId = new UserId(command.userId)
    const user = await this.userRepository.findByIdWithCircle(joinUserId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    if (user.circle !== null) {
      throw new CanNotJoinCircleError()
    }

    circle.join(user.user.id)
    this.circleRepository.save(circle)
    return
  }

  public async withdrawal(command: CircleWithdrawalCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new CircleNotFoundError()
    }

    const withdrawalUserId = new UserId(command.userId)
    const user = await this.userRepository.findById(withdrawalUserId)
    const isOwner = circle.isOwner(withdrawalUserId)

    if (user === null) {
      throw new UserNotFoundError()
    }
    if (isOwner) {
      throw new CircleOwnerCanNotWithdrawalError()
    }

    this.circleRepository.disconnectMember(circleId, withdrawalUserId)
    return
  }

  public async delete(command: CircleDeleteCommand) {
    const circleId = new CircleId(command.id)
    this.circleRepository.delete(circleId)
    return
  }
}
