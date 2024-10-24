import User from './User'
import UserId from './UserId'

export interface IUserRepository {
  findById: (id: UserId) => Promise<User>
  findByIds: (ids: UserId[]) => Promise<User[]>
  findAll: () => Promise<User[]>
  save: (user: User) => void
  delete: (id: UserId) => void
}
