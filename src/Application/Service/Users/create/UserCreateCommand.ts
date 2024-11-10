type UserCreateCommandProps = {
  name: string
  email: string
  type?: string
}

export default class UserCreateCommand {
  public readonly name: string
  public readonly email: string
  public readonly type?: string
  constructor({ name, email, type }: UserCreateCommandProps) {
    this.name = name
    this.email = email
    this.type = type
  }
}
