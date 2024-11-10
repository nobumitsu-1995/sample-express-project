import type UserId from '@Domain/Models/Users/UserId'
import type BlackListId from './BlackListId'
import type CircleId from '../CircleId'

type BlackListProps = {
  id: BlackListId
  circleId: CircleId
  users: UserId[]
}

export default class BlackList {
  public readonly id: BlackListId
  public readonly circleId: CircleId
  private users: UserId[]

  constructor({ id, circleId, users }: BlackListProps) {
    this.id = id
    this.circleId = circleId
    this.users = users
  }

  public getBlockedUsers() {
    return this.users
  }

  public block(id: UserId) {
    this.users = [...this.users, id]
  }

  public unblock(id: UserId) {
    this.users = this.users.filter((userId) => userId !== id)
  }
}
