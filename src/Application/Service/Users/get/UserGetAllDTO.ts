import type User from '@Domain/Models/Users/User'

type UserGetAllDTOProps = {
  users: User[]
}

export default class UserGetAllDTO {
  private readonly users: {
    id: string
    name: string
    email: string
    type: string
  }[]

  constructor({ users }: UserGetAllDTOProps) {
    this.users = users.map((user) => ({
      id: user.id.get(),
      name: user.name.get(),
      email: user.email.get(),
      type: user.type.get(),
    }))
  }
}
