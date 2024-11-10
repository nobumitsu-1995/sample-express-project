import type { Request, Response } from 'express'
import { uuid as generateUUID } from '@Infrastructure/UUID'
import UserFactory from '@Application/Factory/UserFactory'
import UserRepository from '@Infrastructure/Repository/UserRepository'
import UserService from '@Domain/Services/UserService'
import UserApplicationService from '@Application/Service/Users/UserApplicationService'
import UserGetCommand from '@Application/Service/Users/get/UserGetCommand'
import UserCreateCommand from '@Application/Service/Users/create/UserCreateCommand'
import UserUpdateCommand from '@Application/Service/Users/update/UserUpdateCommand'
import UserDeleteCommand from '@Application/Service/Users/delete/UserDeleteCommand'

export default class UserController {
  private readonly userApplicationService: UserApplicationService

  constructor() {
    const userFactory = new UserFactory(generateUUID)
    const userRepository = new UserRepository()
    const userService = new UserService({ userRepository })

    this.userApplicationService = new UserApplicationService({
      userFactory,
      userRepository,
      userService,
    })
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const user = await this.userApplicationService.getAll()

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  public get = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const command = new UserGetCommand({ id })
      const user = await this.userApplicationService.get(command)

      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const bodyParams = req.body
      const command = new UserCreateCommand(bodyParams)
      await this.userApplicationService.create(command)

      return res.status(201).json()
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const bodyParams = req.body
      const command = new UserUpdateCommand({ ...bodyParams, id })
      await this.userApplicationService.update(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const command = new UserDeleteCommand({ id })
      await this.userApplicationService.delete(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }
}
