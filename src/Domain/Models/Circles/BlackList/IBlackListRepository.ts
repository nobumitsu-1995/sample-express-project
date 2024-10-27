import BlackList from './BlackList'
import BlackListId from './BlackListId'
import CircleId from '../CircleId'

export interface IBlackListRepository {
  findById: (id: BlackListId) => Promise<BlackList | null>
  findByCircleId: (id: CircleId) => Promise<BlackList | null>
  save: (blackList: BlackList) => void
  delete: (id: BlackListId) => void
}
