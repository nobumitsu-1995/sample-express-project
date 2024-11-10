import { Request, Response } from 'express'
import { uuid as generateUUID } from '@Infrastructure/UUID'
import prisma from '@Infrastructure/Prisma'
import CircleRepository from '@Infrastructure/Repository/CircleRepository'
import UserRepository from '@Infrastructure/Repository/UserRepository'

import CircleGetCommand from '@Application/Service/Circles/get/CircleGetCommand'
import CircleCreateCommand from '@Application/Service/Circles/create/CircleCreateCommand'
import CircleNameChangeCommand from '@Application/Service/Circles/update/CircleNameChangeCommand'
import CircleJoinCommand from '@Application/Service/Circles/update/CircleJoinCommand'
import CircleWithdrawalCommand from '@Application/Service/Circles/update/CircleWithdrawalCommand'
import CircleDeleteCommand from '@Application/Service/Circles/delete/CircleDeleteCommand'
import UserFactory from '@Application/Factory/UserFactory'
import CircleFactory from '@Application/Factory/CircleFactory'
import CircleApplicationService from '@Application/Service/Circles/CircleApplicationService'

import CircleService from '@Domain/Services/CircleService'
import UserService from '@Domain/Services/UserService'

export default class CircleController {
  private readonly circleApplicationService: CircleApplicationService
  constructor() {
    const userFactory = new UserFactory(generateUUID)
    const circleFactory = new CircleFactory({ userFactory, generateUUID })
    const circleRepository = new CircleRepository({ prisma, circleFactory })
    const userRepository = new UserRepository()

    const userService = new UserService({ repository: userRepository })
    const circleService = new CircleService({
      circleRepository,
      userRepository,
    })

    this.circleApplicationService = new CircleApplicationService({
      userRepository,
      userService,
      circleFactory,
      circleRepository,
      circleService,
    })
  }

  public get = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const command = new CircleGetCommand({ id })
      const circle = await this.circleApplicationService.get(command)

      return res.status(200).json(circle)
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const bodyParams = req.body
      const command = new CircleCreateCommand(bodyParams)
      this.circleApplicationService.create(command)

      return res.status(201).json()
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  public updateName = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const { name } = req.body
      const command = new CircleNameChangeCommand({ id, name })
      this.circleApplicationService.updateName(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  public join = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const userId = req.params.userId
      const command = new CircleJoinCommand({ id, userId })
      this.circleApplicationService.join(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  public withdrawal = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const userId = req.params.userId
      const command = new CircleWithdrawalCommand({ id, userId })
      this.circleApplicationService.withdrawal(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const command = new CircleDeleteCommand({ id })
      this.circleApplicationService.delete(command)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}
