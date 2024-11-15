const CAN_NOT_JOIN_CIRCLE_ERROR =
  'すでにサークルに参加済みの場合、他のサークルには参加できません。'

export default class CanNotJoinCircleError extends Error {
  statusCode: number
  constructor() {
    super(CAN_NOT_JOIN_CIRCLE_ERROR)
    this.name = 'CanNotJoinCircleError'
    this.statusCode = 400
  }
}
