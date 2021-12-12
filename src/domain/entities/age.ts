export default class Age {
    private readonly birthDate: Date;
    private readonly yearInMs = 365 * 24 * 60 * 60 * 1000;

    constructor (birthDate: Date) {
      this.birthDate = birthDate
    }

    get value () {
      return Math.floor((Date.now() - this.birthDate.getTime()) / this.yearInMs)
    }
}
