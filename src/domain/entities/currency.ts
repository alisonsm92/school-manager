export default class Currency {
    value: number;

    constructor (amount: number) {
      this.value = amount
    }

    getFractional () {
      return this.value * 100
    }

    round () {
      this.value = Math.round(this.getFractional()) / 100
      return this
    }

    truncate () {
      this.value = Math.trunc(this.getFractional()) / 100
      return this
    }
}
