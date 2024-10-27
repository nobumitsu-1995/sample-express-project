import { UUID } from 'Infrastructure/UUID'

export default class BlackListId {
  private readonly id: UUID

  constructor(id: UUID) {
    this.id = id
  }

  public get(): UUID {
    return this.id
  }
}
