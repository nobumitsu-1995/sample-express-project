type CircleJoinCommandProps = {
  id: string
  userId: string
}

export default class CircleJoinCommand {
  public readonly id: string
  public readonly userId: string
  constructor({ id, userId }: CircleJoinCommandProps) {
    this.id = id
    this.userId = userId
  }
}
