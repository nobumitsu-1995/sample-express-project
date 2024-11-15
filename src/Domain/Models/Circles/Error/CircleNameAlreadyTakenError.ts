const CIRCLE_NAME_ALREADY_TAKEN_ERROR =
  'このサークル名はすでに使用されています。'

export default class CircleNameAlreadyTakenError extends Error {
  statusCode: number
  constructor() {
    super(CIRCLE_NAME_ALREADY_TAKEN_ERROR)
    this.name = 'CircleNameAlreadyTakenError'
    this.statusCode = 400
  }
}
