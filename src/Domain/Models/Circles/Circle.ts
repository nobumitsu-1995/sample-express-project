import CircleName from './CircleName'
import CircleId from './CircleId'
import UserId from '../Users/UserId'

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

  public getMembers(containsOwner = true) {
    return containsOwner ? [...this.members, this.owner] : this.members
  }
}
