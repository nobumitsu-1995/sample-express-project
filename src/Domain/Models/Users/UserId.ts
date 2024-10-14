import { type UUID } from 'Infrastructure/UUID'

export default class UserId {
  private readonly id: UUID

  constructor(id: UUID) {
    this.id = id
  }

  public get(): UUID {
    return this.id
  }
}
