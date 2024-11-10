import type UserEmail from './UserEmail'
import type UserId from './UserId'
import type UserName from './UserName'
import UserType, { USER_TYPE } from './UserType'

type UserProps = {
  id: UserId
  name: UserName
  email: UserEmail
  type: UserType
}

export default class User {
  public readonly id: UserId
  public name: UserName
  public email: UserEmail
  public type: UserType

  constructor({ id, name, email, type }: UserProps) {
    this.id = id
    this.name = name
    this.email = email
    this.type = type
  }

  public changeName(name: UserName) {
    this.name = name
  }

  public upgrade() {
    this.type = new UserType(USER_TYPE.premium)
  }

  public downgrade() {
    this.type = new UserType(USER_TYPE.normal)
  }
}
