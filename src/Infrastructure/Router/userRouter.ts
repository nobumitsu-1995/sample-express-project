import { Router } from 'express'
import UserController from '@Infrastructure/Controller/UserController'

const userController = new UserController()

export const userRouter = Router()

userRouter.get('/', userController.getAll)
userRouter.get('/:id', userController.get)
userRouter.post('/', userController.create)
userRouter.patch('/:id', userController.update)
userRouter.delete('/:id', userController.delete)
