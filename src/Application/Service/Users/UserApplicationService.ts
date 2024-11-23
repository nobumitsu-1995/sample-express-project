import 'reflect-metadata'
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
import UserDuplicateEmailError from '@Domain/Models/Users/Error/UserDuplicateEmailError'
import UserNotFoundError from '@Domain/Models/Users/Error/UserNotFoundError'
import { inject, injectable } from 'inversify'
import { TYPES } from '@Infrastructure/DI/types'

@injectable()
export default class UserApplicationService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.UserService)
    private readonly userService: UserService,
    @inject(TYPES.UserFactory)
    private readonly userFactory: IUserFactory,
  ) {}

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
      throw new UserDuplicateEmailError()
    }

    this.userRepository.save(user)
    return
  }

  public async update(command: UserUpdateCommand) {
    const userId = new UserId(command.id)
    const isExistUser = (await this.userRepository.findById(userId)) !== null

    if (!isExistUser) {
      throw new UserNotFoundError()
    }

    const user = this.userFactory.create(command)
    const isDuplicated = await this.userService.DuplicateEmail(user.email)

    if (isDuplicated) {
      throw new UserDuplicateEmailError()
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
