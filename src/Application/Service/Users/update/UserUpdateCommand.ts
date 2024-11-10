type UserUpdateCommandProps = {
  id: string
  name: string
  email: string
  type?: string
}

export default class UserUpdateCommand {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly type?: string
  constructor({ id, name, email, type }: UserUpdateCommandProps) {
    this.id = id
    this.name = name
    this.email = email
    this.type = type
  }
}
