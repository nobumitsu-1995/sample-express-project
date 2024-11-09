type CircleDeleteCommandProps = {
  id: string
}

export default class CircleDeleteCommand {
  public readonly id: string
  constructor({ id }: CircleDeleteCommandProps) {
    this.id = id
  }
}
