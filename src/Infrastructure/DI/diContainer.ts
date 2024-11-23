import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import UserRepository from '@Infrastructure/Repository/UserRepository'
import UUID from '@Infrastructure/UUID'
import type { IUserFactory } from '@Domain/Models/Users/IUserFactory'
import UserFactory from '@Application/Factory/UserFactory'
import UserService from '@Domain/Services/UserService'
import type { IUserRepository } from '@Domain/Models/Users/IUserRepository'
import UserApplicationService from '@Application/Service/Users/UserApplicationService'

const diContainer = new Container()

diContainer.bind<UUID>(TYPES.UUID).to(UUID)

diContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
diContainer.bind<IUserFactory>(TYPES.UserFactory).toDynamicValue((context) => {
  const uuid = context.container.get<UUID>(TYPES.UUID)
  return new UserFactory(uuid)
})
diContainer.bind<UserService>(TYPES.UserService).toDynamicValue((context) => {
  const userRepository = context.container.get<IUserRepository>(
    TYPES.UserRepository,
  )
  return new UserService(userRepository)
})
diContainer
  .bind<UserApplicationService>(TYPES.UserApplicationService)
  .toDynamicValue((context) => {
    const userRepository = context.container.get<IUserRepository>(
      TYPES.UserRepository,
    )
    const userService = context.container.get<UserService>(TYPES.UserService)
    const userFactory = context.container.get<IUserFactory>(TYPES.UserFactory)
    return new UserApplicationService(userRepository, userService, userFactory)
  })

export { diContainer }
