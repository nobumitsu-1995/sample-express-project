type UserGetCommandProps = {
  id: string
}

export default class UserGetCommand {
  public readonly id: string
  constructor({ id }: UserGetCommandProps) {
    this.id = id
  }
}
