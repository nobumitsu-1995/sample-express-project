import { v4 as uuidv4 } from 'uuid'

export type UUID = string
export const uuid = (): UUID => uuidv4()
