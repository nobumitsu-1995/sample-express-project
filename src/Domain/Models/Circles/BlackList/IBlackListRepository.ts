import type BlackList from './BlackList'
import type BlackListId from './BlackListId'
import type CircleId from '../CircleId'

export interface IBlackListRepository {
  findById: (id: BlackListId) => Promise<BlackList | null>
  findByCircleId: (id: CircleId) => Promise<BlackList | null>
  save: (blackList: BlackList) => void
  delete: (id: BlackListId) => void
}
