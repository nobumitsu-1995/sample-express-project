type UserDeleteCommandProps = {
  id: string
}

export default class UserDeleteCommand {
  public readonly id: string
  constructor({ id }: UserDeleteCommandProps) {
    this.id = id
  }
}
