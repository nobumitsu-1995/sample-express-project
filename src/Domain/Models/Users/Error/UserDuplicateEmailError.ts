const USER_DUPLICATE_EMAIL_ERROR = 'このEmailはすでに使用されています。'

export default class UserDuplicateEmailError extends Error {
  statusCode: number
  constructor() {
    super(USER_DUPLICATE_EMAIL_ERROR)
    this.name = 'UserDuplicateEmailError'
    this.statusCode = 400
  }
}
