type CircleNameChangeCommandProps = {
  id: string
  name: string
}

export default class CircleNameChangeCommand {
  public readonly id: string
  public readonly name: string
  constructor({ id, name }: CircleNameChangeCommandProps) {
    this.id = id
    this.name = name
  }
}
