import Prototype from './prototype'

export default class Level implements Prototype {
    readonly code: string;
    readonly description: string;

    constructor ({ code, description }: { code: string, description: string }) {
      this.code = code
      this.description = description
    }

    clone (): Level {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}
