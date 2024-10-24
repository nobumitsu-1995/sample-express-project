export default class UserEmail {
  private readonly email: string

  constructor(name: string) {
    this.email = name
  }

  public get(): string {
    return this.email
  }
}
