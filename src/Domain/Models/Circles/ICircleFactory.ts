import User from '../Users/User'
import Circle from './Circle'

export type CircleCreateArgs = {
  id?: string
  name: string
  owner: string
  members: string[]
}

export type UserData = {
  id: string
  name: string
  email: string
  type: string
}

export type CircleData = {
  id: string
  name: string
  ownerId: string
  members: UserData[]
}

export type CircleDataWithOwner = {
  id: string
  name: string
  ownerId: string
  owner: UserData
  members: UserData[]
}

export interface ICircleFactory {
  create: (args: CircleCreateArgs) => Circle
  createFromData: (circle: CircleData) => Circle
  createFromDataWithUsersData: (circleData: CircleDataWithOwner) => {
    circle: Circle
    owner: User
    members: User[]
  }
}
