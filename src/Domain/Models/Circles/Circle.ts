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
  public readonly name: CircleName
  public readonly owner: UserId
  private readonly members: UserId[]

  constructor({ id, name, owner, members }: CircleProps) {
    this.id = id
    this.name = name
    this.owner = owner
    this.members = members
  }

  public changeName(name: CircleName) {
    return new Circle({
      id: this.id,
      name: name,
      owner: this.owner,
      members: this.members,
    })
  }

  public join(user: UserId) {
    return new Circle({
      id: this.id,
      name: this.name,
      owner: this.owner,
      members: [...this.members, user],
    })
  }

  public withdrawal(user: UserId) {
    const newMembers = this.members.filter(
      (memberId) => memberId.get() !== user.get(),
    )

    return new Circle({
      id: this.id,
      name: this.name,
      owner: this.owner,
      members: newMembers,
    })
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
