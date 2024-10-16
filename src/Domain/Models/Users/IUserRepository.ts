import User from './User'
import UserId from './UserId'
import UserName from './UserName'

export interface IUserRepository {
  findById: (id: UserId) => Promise<User>
  findByName: (name: UserName) => Promise<User>
  findByIds: (ids: UserId[]) => Promise<User[]>
  findAll: () => Promise<User[]>
  save: (user: User) => void
  delete: (id: UserId) => void
}
