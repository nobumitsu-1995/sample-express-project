import { UUID } from 'Infrastructure/UUID'

export default class CircleId {
  private readonly id: UUID

  constructor(id: UUID) {
    this.id = id
  }

  public get(): UUID {
    return this.id
  }
}
