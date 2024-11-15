const CIRCLE_OWNER_CAN_NOT_WITHDRAWAL_ERROR =
  'サークルオーナーはサークルを抜けることはできません'

export default class CircleOwnerCanNotWithdrawalError extends Error {
  statusCode: number
  constructor() {
    super(CIRCLE_OWNER_CAN_NOT_WITHDRAWAL_ERROR)
    this.name = 'CircleOwnerCanNotWithdrawalError'
    this.statusCode = 400
  }
}
