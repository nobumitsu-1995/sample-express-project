import User from './User'
import UserEmail from './UserEmail'
import UserId from './UserId'

export interface IUserRepository {
  findById: (id: UserId) => Promise<User | null>
  findByEmail: (email: UserEmail) => Promise<User | null>
  findByIds: (ids: UserId[]) => Promise<User[]>
  findAll: () => Promise<User[]>
  save: (user: User) => void
  delete: (id: UserId) => void
}
