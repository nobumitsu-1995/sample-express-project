type CircleWithdrawalCommandProps = {
  id: string
  userId: string
}

export default class CircleWithdrawalCommand {
  public readonly id: string
  public readonly userId: string
  constructor({ id, userId }: CircleWithdrawalCommandProps) {
    this.id = id
    this.userId = userId
  }
}
