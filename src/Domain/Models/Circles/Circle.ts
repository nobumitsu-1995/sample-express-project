import type CircleName from './CircleName'
import type CircleId from './CircleId'
import type UserId from '../Users/UserId'

type CircleProps = {
  id: CircleId
  name: CircleName
  owner: UserId
  members: UserId[]
}

export default class Circle {
  public readonly id: CircleId
  public name: CircleName
  public owner: UserId
  private members: UserId[]

  constructor({ id, name, owner, members }: CircleProps) {
    this.id = id
    this.name = name
    this.owner = owner
    this.members = members
  }

  public changeName(name: CircleName) {
    this.name = name
  }

  public join(user: UserId) {
    this.members = [...this.members, user]
  }

  public withdrawal(user: UserId) {
    this.members = this.members.filter(
      (memberId) => memberId.get() !== user.get(),
    )
  }

  public getMembers(containsOwner = true) {
    return containsOwner ? [...this.members, this.owner] : this.members
  }

  public countMembers() {
    return this.members.length
  }

  public isOwner(user: UserId) {
    return user.get() === this.owner.get()
  }
}
