import type { Request, Response } from 'express'
import type UserApplicationService from '@Application/Service/Users/UserApplicationService'
import UserGetCommand from '@Application/Service/Users/get/UserGetCommand'
import UserCreateCommand from '@Application/Service/Users/create/UserCreateCommand'
import UserUpdateCommand from '@Application/Service/Users/update/UserUpdateCommand'
import UserDeleteCommand from '@Application/Service/Users/delete/UserDeleteCommand'
import { diContainer } from '@Infrastructure/DI/diContainer'
import { TYPES } from '@Infrastructure/DI/types'

export default class UserController {
  private readonly userApplicationService: UserApplicationService

  constructor() {
    this.userApplicationService = diContainer.get<UserApplicationService>(
      TYPES.UserApplicationService,
    )
  }

  public getAll = (req: Request, res: Response) => {
    try {
      const user = this.userApplicationService.getAll()

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
