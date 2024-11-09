import { Router } from 'express'
import CircleController from '@Infrastructure/Controller/CircleController'

const circleController = new CircleController()

export const circleRouter = Router()

circleRouter.get('/:id', circleController.get)
circleRouter.post('/', circleController.create)
circleRouter.patch('/:id/change-name', circleController.updateName)
circleRouter.patch('/:id/join/:userId', circleController.join)
circleRouter.patch('/:id/withdrawal/:userId', circleController.withdrawal)
circleRouter.delete('/:id', circleController.delete)
