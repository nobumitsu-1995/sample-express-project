export {}

declare global {
  type MappedConst<T extends string> = {
    [key in T]: key
  }

  type MappedConstKey<T extends string> = Array<T>
}
