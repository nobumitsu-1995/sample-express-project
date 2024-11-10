import User from '@Domain/Models/Users/User'

type UserGetDTOProps = {
  user: User
}

export default class UserGetDTO {
  private readonly id: string
  private readonly name: string
  private readonly email: string
  private readonly type: string

  constructor({ user }: UserGetDTOProps) {
    this.id = user.id.get()
    this.name = user.name.get()
    this.email = user.email.get()
    this.type = user.type.get()
  }
}
