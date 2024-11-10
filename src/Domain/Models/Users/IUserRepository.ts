import type Circle from '../Circles/Circle'
import type User from './User'
import type UserEmail from './UserEmail'
import type UserId from './UserId'

export interface IUserRepository {
  findById: (id: UserId) => Promise<User | null>
  findByIdWithCircle: (
    id: UserId,
  ) => Promise<{ user: User; circle: Circle | null } | null>
  findByEmail: (email: UserEmail) => Promise<User | null>
  findByIds: (ids: UserId[]) => Promise<User[]>
  findAll: () => Promise<User[]>
  save: (user: User) => void
  delete: (id: UserId) => void
}
