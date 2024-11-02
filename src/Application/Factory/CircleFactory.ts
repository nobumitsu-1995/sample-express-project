import Circle from 'Domain/Models/Circles/Circle'
import CircleId from 'Domain/Models/Circles/CircleId'
import CircleName from 'Domain/Models/Circles/CircleName'
import {
  ICircleFactory,
  type CircleCreateArgs,
} from 'Domain/Models/Circles/ICircleFactory'
import UserId from 'Domain/Models/Users/UserId'

export default class CircleFactory implements ICircleFactory {
  private readonly generateUUID: () => string
  constructor(generateUUID: () => string) {
    this.generateUUID = generateUUID
  }

  public create({ id, name, owner, members }: CircleCreateArgs): Circle {
    return new Circle({
      id: new CircleId(id ?? this.generateUUID()),
      name: new CircleName(name),
      owner: new UserId(owner),
      members: members?.map((id) => new UserId(id)),
    })
  }
}
