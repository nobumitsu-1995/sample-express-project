type CircleGetCommandProps = {
  id: string
}

export default class CircleGetCommand {
  public readonly id: string
  constructor({ id }: CircleGetCommandProps) {
    this.id = id
  }
}
