import UserEmail from './UserEmail'
import UserId from './UserId'
import UserName from './UserName'
import { USER_TYPE, UserType } from './UserType'

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
    this.type = USER_TYPE.premium
  }

  public downgrade() {
    this.type = USER_TYPE.normal
  }
}
