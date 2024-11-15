const USER_NOT_FOUND_ERROR = 'ユーザーが見つかりませんでした。'

export default class UserNotFoundError extends Error {
  statusCode: number
  constructor() {
    super(USER_NOT_FOUND_ERROR)
    this.name = 'UserNotFoundError'
    this.statusCode = 400
  }
}
