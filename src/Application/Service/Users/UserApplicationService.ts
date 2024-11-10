import type { IUserFactory } from '@Domain/Models/Users/IUserFactory'
import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import UserId from '@Domain/Models/Users/UserId'
import type UserService from '@Domain/Services/UserService'
import UserGetAllDTO from './get/UserGetAllDTO'
import type UserGetCommand from './get/UserGetCommand'
import UserGetDTO from './get/UserGetDTO'
import type UserCreateCommand from './create/UserCreateCommand'
import type UserUpdateCommand from './update/UserUpdateCommand'
import type UserDeleteCommand from './delete/UserDeleteCommand'

const USER_NOT_FOUND_ERROR = 'ユーザーが見つかりませんでした。'
const USER_DUPLICATE_EMAIL_ERROR = 'このEmailはすでに使用されています。'

type UserApplicationServiceProps = {
  userRepository: IUserRepository
  userService: UserService
  userFactory: IUserFactory
}

export default class UserApplicationService {
  private readonly userRepository: IUserRepository
  private readonly userService: UserService
  private readonly userFactory: IUserFactory

  constructor({
    userRepository,
    userService,
    userFactory,
  }: UserApplicationServiceProps) {
    this.userRepository = userRepository
    this.userService = userService
    this.userFactory = userFactory
  }

  public async getAll(): Promise<UserGetAllDTO> {
    const users = await this.userRepository.findAll()
    return new UserGetAllDTO({ users })
  }

  public async get(command: UserGetCommand): Promise<UserGetDTO | null> {
    const userId = new UserId(command.id)
    const user = await this.userRepository.findById(userId)
    return user ? new UserGetDTO({ user }) : null
  }

  public async create(command: UserCreateCommand) {
    const user = this.userFactory.create(command)
    const isDuplicated = await this.userService.DuplicateEmail(user.email)

    if (isDuplicated) {
      throw new Error(USER_DUPLICATE_EMAIL_ERROR)
    }

    this.userRepository.save(user)
    return
  }

  public async update(command: UserUpdateCommand) {
    const userId = new UserId(command.id)
    const isExistUser = (await this.userRepository.findById(userId)) === null

    if (!isExistUser) {
      throw new Error(USER_NOT_FOUND_ERROR)
    }

    const user = this.userFactory.create(command)
    const isDuplicated = await this.userService.DuplicateEmail(user.email)

    if (isDuplicated) {
      throw new Error(USER_DUPLICATE_EMAIL_ERROR)
    }

    this.userRepository.save(user)
    return
  }

  public async delete(command: UserDeleteCommand) {
    const userId = new UserId(command.id)
    this.userRepository.delete(userId)
    return
  }
}
