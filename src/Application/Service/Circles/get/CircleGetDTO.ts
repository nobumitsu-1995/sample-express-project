import Circle from '@Domain/Models/Circles/Circle'
import User from '@Domain/Models/Users/User'

type CircleGetDTOProps = {
  circle: Circle
  owner: User
  members: User[]
}

type UserData = {
  id: string
  name: string
  email: string
  type: string
}

export default class CircleGetDTO {
  private readonly id: string
  private readonly name: string
  private readonly owner: UserData
  private readonly members: UserData[]
  constructor({ circle, owner, members }: CircleGetDTOProps) {
    this.id = circle.id.get()
    this.name = circle.name.get()
    this.owner = {
      id: owner.id.get(),
      name: owner.name.get(),
      email: owner.email.get(),
      type: owner.type.get(),
    }
    this.members = members.map((member) => ({
      id: member.id.get(),
      name: member.name.get(),
      email: member.email.get(),
      type: member.type.get(),
    }))
  }
}
