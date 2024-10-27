import BlackList from './BlackList'
import BlackListId from './BlackListId'
import CircleId from '../CircleId'

export interface IBlackListRepository {
  findById: (id: BlackListId) => BlackList
  findByCircleId: (id: CircleId) => BlackList
  save: (blackList: BlackList) => void
  delete: (id: BlackListId) => void
}
