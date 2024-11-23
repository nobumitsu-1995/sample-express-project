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
    this.userApplicationService
      .getAll()
      .then((user) => {
        return res.status(200).json(user)
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json(error)
      })
  }

  public get = (req: Request, res: Response) => {
    const id = req.params.id
    const command = new UserGetCommand({ id })

    this.userApplicationService
      .get(command)
      .then((user) => {
        return res.status(200).json(user)
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json(error)
      })
  }

  public create = (req: Request, res: Response) => {
    const bodyParams = req.body
    const command = new UserCreateCommand(bodyParams)

    this.userApplicationService
      .create(command)
      .then(() => {
        return res.status(201).json()
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json(error)
      })
  }

  public update = async (req: Request, res: Response) => {
    const id = req.params.id
    const bodyParams = req.body
    const command = new UserUpdateCommand({ ...bodyParams, id })

    this.userApplicationService
      .update(command)
      .then(() => {
        return res.status(200).json()
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json(error)
      })
  }

  public delete = (req: Request, res: Response) => {
    const id = req.params.id
    const command = new UserDeleteCommand({ id })

    this.userApplicationService
      .delete(command)
      .then(() => {
        return res.status(200).json()
      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json(error)
      })
  }
}
