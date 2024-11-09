type CircleCreateCommandProps = {
  name: string
  owner: string
  members: string[]
}

export default class CircleCreateCommand {
  public readonly name: string
  public readonly owner: string
  public readonly members: string[]
  constructor({ name, owner, members }: CircleCreateCommandProps) {
    this.name = name
    this.owner = owner
    this.members = members
  }
}
