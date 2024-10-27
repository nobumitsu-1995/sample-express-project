import UserId from '../../Users/UserId'
import CircleId from '../CircleId'
import { IBlackListRepository } from './IBlackListRepository'

type BlackListSpecificationProps = {
  blackListRepository: IBlackListRepository
}

type IsBlockedArgs = {
  circleId: CircleId
  userId: UserId
}

export default class BlackListSpecification {
  private readonly blackListRepository: IBlackListRepository

  constructor({ blackListRepository }: BlackListSpecificationProps) {
    this.blackListRepository = blackListRepository
  }

  public isBlocked({ circleId, userId }: IsBlockedArgs) {
    const blackList = this.blackListRepository.findByCircleId(circleId)
    const blockedUsers = blackList.getBlockedUsers()

    return blockedUsers.some((blockedUserId) => blockedUserId === userId)
  }
}
