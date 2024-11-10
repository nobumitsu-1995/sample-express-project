import type User from '../Users/User'
import type UserId from '../Users/UserId'
import type Circle from './Circle'
import type CircleId from './CircleId'
import type CircleName from './CircleName'

export interface ICircleRepository {
  findById: (id: CircleId) => Promise<Circle | null>
  findByIdWithUsersData: (
    id: CircleId,
  ) => Promise<{ circle: Circle; owner: User; members: User[] } | null>
  findByName: (name: CircleName) => Promise<Circle | null>
  searchByName: (name: CircleName) => Promise<Circle[]>
  save: (circle: Circle) => void
  disconnectMember: (id: CircleId, userId: UserId) => void
  delete: (id: CircleId) => void
}
