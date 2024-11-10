import type User from './User'

export type UserCreateArgs = {
  id?: string
  name: string
  email: string
  type?: string
}

export interface IUserFactory {
  create: (args: UserCreateArgs) => User
}
