import 'reflect-metadata'
import { randomUUID } from 'crypto'
import { injectable } from 'inversify'

@injectable()
export default class UUID {
  public get = () => randomUUID()
}
