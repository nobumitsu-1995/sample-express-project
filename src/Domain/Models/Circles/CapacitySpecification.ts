import type { IUserRepository } from '../Users/IUserRepository'
import type User from '../Users/User'
import { USER_TYPE } from '../Users/UserType'
import type Circle from './Circle'

const MAX_CAPACITY = 30
const PREMIUM_CIRCLE_BOUNDARY = 5
const PREMIUM_CIRCLE_MAX_CAPACITY = 50

type CapacitySpecificationProps = {
  userRepository: IUserRepository
}

export default class CapacitySpecification {
  private readonly userRepository: IUserRepository

  constructor({ userRepository }: CapacitySpecificationProps) {
    this.userRepository = userRepository
  }

  public async isFullCapacity(circle: Circle) {
    const memberCount = circle.countMembers()

    if (memberCount < MAX_CAPACITY) return false

    const memberIds = circle.getMembers()
    const members = await this.userRepository.findByIds(memberIds)
    const premiumMemberCount = this.countPremiumMember(members)
    const capacity =
      premiumMemberCount >= PREMIUM_CIRCLE_BOUNDARY
        ? PREMIUM_CIRCLE_MAX_CAPACITY
        : MAX_CAPACITY

    return memberCount >= capacity
  }

  private countPremiumMember(members: User[]) {
    return members.filter((user) => user.type === USER_TYPE.premium).length
  }
}
