type UserTypeLiteral = 'normal' | 'premium'
export const USER_TYPE: MappedConst<UserTypeLiteral> = {
  normal: 'normal',
  premium: 'premium',
}

export default class UserType {
  private readonly type: UserTypeLiteral

  constructor(type?: string) {
    if (!type) {
      this.type = USER_TYPE.normal
      return
    }
    if (!this.isUserType(type)) {
      throw new Error('userTypeが不正です')
    }

    this.type = type
  }

  public get(): UserTypeLiteral {
    return this.type
  }

  public readonly isUserType = (type: string): type is UserTypeLiteral =>
    Object.keys(USER_TYPE).some((v) => v === type)
}
