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
  public readonly name: UserName
  public readonly email: UserEmail
  public readonly type: UserType

  constructor({ id, name, email, type }: UserProps) {
    this.id = id
    this.name = name
    this.email = email
    this.type = type
  }

  public changeName(name: UserName) {
    return new User({
      id: this.id,
      name,
      email: this.email,
      type: this.type,
    })
  }

  public upgrade() {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email,
      type: new UserType(USER_TYPE.premium),
    })
  }

  public downgrade() {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email,
      type: new UserType(USER_TYPE.normal),
    })
  }
}
