export default class Period {
    private readonly MsPerDay = 1000 * 60 * 60 * 24;
    readonly start: Date;
    readonly end: Date;

    constructor (start: Date, end: Date) {
      this.start = start
      this.end = end
    }

    getPercentCompleteUntil (date: Date) {
      if (date < this.start) return 0
      if (date > this.end) return 100
      const periodUntilDate = new Period(this.start, date)
      return periodUntilDate.getDiffInDays() * 100 / this.getDiffInDays()
    }

    getDiffInDays () {
      const diffTime = Math.abs(this.start.getTime() - this.end.getTime())
      return Math.ceil(diffTime / this.MsPerDay)
    }
}
