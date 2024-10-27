import { IUserFactory } from 'Domain/Models/Users/IUserFactory'
import { IUserRepository } from 'Domain/Models/Users/IUserRepository'
import User from 'Domain/Models/Users/User'
import UserId from 'Domain/Models/Users/UserId'
import UserService from 'Domain/Services/UserService'

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

  public async getAll(): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }

  public async get(id: string): Promise<User | null> {
    const userId = new UserId(id)
    const user = await this.userRepository.findById(userId)
    return user
  }

  public async create(args: { name: string; email: string; type?: string }) {
    const user = this.userFactory.create(args)
    const isDuplicated = await this.userService.DuplicateEmail(user.email)

    if (isDuplicated) {
      throw new Error(USER_DUPLICATE_EMAIL_ERROR)
    }

    this.userRepository.save(user)
    return
  }

  public async update(args: {
    id: string
    name: string
    email: string
    type?: string
  }) {
    const userId = new UserId(args.id)
    const isExistUser = (await this.userRepository.findById(userId)) === null

    if (!isExistUser) {
      throw new Error(USER_NOT_FOUND_ERROR)
    }

    const user = this.userFactory.create(args)
    const isDuplicated = await this.userService.DuplicateEmail(user.email)

    if (isDuplicated) {
      throw new Error(USER_DUPLICATE_EMAIL_ERROR)
    }

    this.userRepository.save(user)
    return
  }

  public async delete(id: string) {
    const userId = new UserId(id)
    this.userRepository.delete(userId)
    return
  }
}
