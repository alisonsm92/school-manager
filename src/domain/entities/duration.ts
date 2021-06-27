export default class Duration {
    private readonly MsPerDay = 1000 * 60 * 60 * 24;
    private readonly start: Date;
    private readonly end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    getPercentCompleteUntil(date: Date) {
        if(date < this.start) return 0;
        if(date > this.end) return 100;
        const durationUntilDate = new Duration(this.start, date);
        return durationUntilDate.getInDays() * 100 / this.getInDays();
    }

    getInDays() {
        const diffTime = Math.abs(this.start.getTime() - this.end.getTime());
        return Math.ceil(diffTime / this.MsPerDay);
    }
}