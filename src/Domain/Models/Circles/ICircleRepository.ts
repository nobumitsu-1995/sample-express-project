import Circle from './Circle'
import CircleId from './CircleId'
import CircleName from './CircleName'

export interface ICircleRepository {
  findById: (id: CircleId) => Promise<Circle | null>
  searchByName: (name: CircleName) => Promise<Circle[]>
  save: (circle: Circle) => void
  delete: (id: CircleId) => void
}
