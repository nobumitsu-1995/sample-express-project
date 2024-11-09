export default class BlackListId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }

  public get(): string {
    return this.id
  }
}
