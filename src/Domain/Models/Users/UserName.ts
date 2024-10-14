const MIN_LENGTH = 3
const MAX_LENGTH = 12

const VALIDATION_ERROR = {
  min_length: `ユーザー名は${MIN_LENGTH}文字以上である必要があります。`,
  max_length: `ユーザー名は${MAX_LENGTH}文字以下である必要があります。`,
}

export default class UserName {
  private readonly name: string

  constructor(name: string) {
    if (name.length < MIN_LENGTH) {
      throw new Error(VALIDATION_ERROR.min_length)
    }
    if (name.length > MAX_LENGTH) {
      throw new Error(VALIDATION_ERROR.max_length)
    }

    this.name = name
  }

  public get(): string {
    return this.name
  }
}
