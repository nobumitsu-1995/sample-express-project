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

const CIRCLE_NOT_FOUND_ERROR = 'サークルが見つかりませんでした。'
const CIRCLE_DUPLICATE_NAME_ERROR = 'このサークル名はすでに使用されています。'
const CAN_NOT_JOIN_CIRCLE_ERROR =
  'すでにサークルに参加済みの場合、他のサークルには参加できません。'
const CIRCLE_OWNER_CAN_NOT_WITHDRAWAL_ERROR =
  'サークルオーナーはサークルを抜けることはできません'
const USER_NOT_FOUND_ERROR = 'ユーザーが見つかりませんでした。'

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
      throw new Error(CIRCLE_DUPLICATE_NAME_ERROR)
    }

    const canJoinCircle = await this.userService.canJoinCircle(circle.owner)

    if (!canJoinCircle) {
      throw new Error(CAN_NOT_JOIN_CIRCLE_ERROR)
    }

    this.circleRepository.save(circle)
    return
  }

  public async updateName(command: CircleNameChangeCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new Error(CIRCLE_NOT_FOUND_ERROR)
    }

    const circleName = new CircleName(command.name)
    const isDuplicated = await this.circleService.DuplicateName(circleName)

    if (isDuplicated) {
      throw new Error(CIRCLE_DUPLICATE_NAME_ERROR)
    }

    circle.changeName(circleName)
    this.circleRepository.save(circle)
    return
  }

  public async join(command: CircleJoinCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new Error(CIRCLE_NOT_FOUND_ERROR)
    }

    const joinUserId = new UserId(command.userId)
    const user = await this.userRepository.findByIdWithCircle(joinUserId)

    if (user === null) {
      throw new Error(USER_NOT_FOUND_ERROR)
    }

    if (user.circle !== null) {
      throw new Error(CAN_NOT_JOIN_CIRCLE_ERROR)
    }

    circle.join(user.user.id)
    this.circleRepository.save(circle)
    return
  }

  public async withdrawal(command: CircleWithdrawalCommand) {
    const circleId = new CircleId(command.id)
    const circle = await this.circleRepository.findById(circleId)

    if (circle === null) {
      throw new Error(CIRCLE_NOT_FOUND_ERROR)
    }

    const withdrawalUserId = new UserId(command.userId)
    const user = await this.userRepository.findById(withdrawalUserId)
    const isOwner = circle.isOwner(withdrawalUserId)

    if (user === null) {
      throw new Error(USER_NOT_FOUND_ERROR)
    }
    if (isOwner) {
      throw new Error(CIRCLE_OWNER_CAN_NOT_WITHDRAWAL_ERROR)
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
