import Circle from './Circle'

export type CircleCreateArgs = {
  id?: string
  name: string
  owner: string
  members: string[]
}

export interface ICircleFactory {
  create: (args: CircleCreateArgs) => Circle
}
