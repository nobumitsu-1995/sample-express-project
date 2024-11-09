import { IUserFactory } from '@Domain/Models/Users/IUserFactory'
import User from '@Domain/Models/Users/User'
import UserEmail from '@Domain/Models/Users/UserEmail'
import UserId from '@Domain/Models/Users/UserId'
import UserName from '@Domain/Models/Users/UserName'
import UserType from '@Domain/Models/Users/UserType'

export default class UserFactory implements IUserFactory {
  private readonly generateUUID: () => string
  constructor(generateUUID: () => string) {
    this.generateUUID = generateUUID
  }

  public create({
    id,
    name,
    email,
    type,
  }: {
    id?: string
    name: string
    email: string
    type?: string
  }): User {
    return new User({
      id: new UserId(id ?? this.generateUUID()),
      name: new UserName(name),
      email: new UserEmail(email),
      type: new UserType(type),
    })
  }
}
