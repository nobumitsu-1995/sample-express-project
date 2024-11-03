import User from '../Users/User'
import Circle from './Circle'
import CircleId from './CircleId'
import CircleName from './CircleName'

export interface ICircleRepository {
  findById: (id: CircleId) => Promise<Circle | null>
  findByIdWithUsersData: (
    id: CircleId,
  ) => Promise<{ circle: Circle; owner: User; members: User[] } | null>
  findByName: (name: CircleName) => Promise<Circle | null>
  searchByName: (name: CircleName) => Promise<Circle[]>
  save: (circle: Circle) => void
  delete: (id: CircleId) => void
}
