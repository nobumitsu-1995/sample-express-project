import { Request, Response } from 'express'
import { uuid as generateUUID } from '@Infrastructure/UUID'
import prisma from '@Infrastructure/Prisma'
import CircleRepository from '@Infrastructure/Repository/Circle'
import UserRepository from '@Infrastructure/Repository/User'

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
    const id = req.params.id
    const command = new CircleGetCommand({ id })

    this.circleApplicationService
      .get(command)
      .then((circle) => {
        res.status(200).json(circle)
      })
      .catch((e) => {
        console.log(e)
        res.status(404).json(e)
      })
  }

  public create = async (req: Request, res: Response) => {
    const bodyParams = req.body
    const command = new CircleCreateCommand(bodyParams)

    this.circleApplicationService
      .create(command)
      .then(() => {
        res.status(201).json()
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  }

  public updateName = async (req: Request, res: Response) => {
    const id = req.params.id
    const { name } = req.body
    const command = new CircleNameChangeCommand({ id, name })

    this.circleApplicationService
      .updateName(command)
      .then(() => {
        res.status(200).json()
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  }

  public join = async (req: Request, res: Response) => {
    const id = req.params.id
    const userId = req.params.userId
    const command = new CircleJoinCommand({ id, userId })

    this.circleApplicationService
      .join(command)
      .then(() => {
        res.status(200).json()
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  }

  public withdrawal = async (req: Request, res: Response) => {
    const id = req.params.id
    const userId = req.params.userId
    const command = new CircleWithdrawalCommand({ id, userId })

    this.circleApplicationService
      .withdrawal(command)
      .then(() => {
        res.status(200).json()
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  }

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id
    const command = new CircleDeleteCommand({ id })

    this.circleApplicationService
      .delete(command)
      .then(() => {
        res.status(200).json()
      })
      .catch((e) => {
        res.status(500).json(e)
      })
  }
}
