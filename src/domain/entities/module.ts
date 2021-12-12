import Prototype from './prototype'

export default class Module implements Prototype {
    readonly level: string;
    readonly code: string;
    readonly description: string;
    readonly minimumAge: number;
    readonly price: number;

    constructor ({ level, code, description, minimumAge, price }:
        { level: string, code: string, description: string, minimumAge: number, price: number }) {
      this.level = level
      this.code = code
      this.description = description
      this.minimumAge = minimumAge
      this.price = price
    }

    clone (): Module {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}
