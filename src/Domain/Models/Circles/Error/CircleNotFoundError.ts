const CIRCLE_NOT_FOUND_ERROR = 'サークルが見つかりませんでした。'

export default class CircleNotFoundError extends Error {
  statusCode: number
  constructor() {
    super(CIRCLE_NOT_FOUND_ERROR)
    this.name = 'CircleNotFoundError'
    this.statusCode = 400
  }
}
