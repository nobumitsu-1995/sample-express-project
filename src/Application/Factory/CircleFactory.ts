import Circle from '@Domain/Models/Circles/Circle'
import CircleId from '@Domain/Models/Circles/CircleId'
import CircleName from '@Domain/Models/Circles/CircleName'
import type {
  CircleData,
  CircleDataWithOwner,
  ICircleFactory,
} from '@Domain/Models/Circles/ICircleFactory'
import { type CircleCreateArgs } from '@Domain/Models/Circles/ICircleFactory'
import type { IUserFactory } from '@Domain/Models/Users/IUserFactory'
import type User from '@Domain/Models/Users/User'
import UserId from '@Domain/Models/Users/UserId'

type CircleFactoryProps = {
  generateUUID: () => string
  userFactory: IUserFactory
}

export default class CircleFactory implements ICircleFactory {
  private readonly generateUUID: () => string
  private readonly userFactory: IUserFactory

  constructor({ generateUUID, userFactory }: CircleFactoryProps) {
    this.generateUUID = generateUUID
    this.userFactory = userFactory
  }

  public create({ id, name, owner, members }: CircleCreateArgs): Circle {
    return new Circle({
      id: new CircleId(id ?? this.generateUUID()),
      name: new CircleName(name),
      owner: new UserId(owner),
      members: members?.map((id) => new UserId(id)),
    })
  }

  public createFromData(circle: CircleData) {
    return new Circle({
      id: new CircleId(circle.id),
      name: new CircleName(circle.name),
      owner: new UserId(circle.ownerId),
      members: circle?.members.map((member) => new UserId(member.id)) || [],
    })
  }

  public createFromDataWithUsersData(circleData: CircleDataWithOwner): {
    circle: Circle
    owner: User
    members: User[]
  } {
    const circle = this.createFromData(circleData)
    const owner = this.userFactory.create({
      ...circleData.owner,
    })
    const members = circleData.members.map((member) =>
      this.userFactory.create({
        ...member,
      }),
    )

    return { circle, owner, members }
  }
}
