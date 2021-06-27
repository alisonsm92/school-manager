import Duration from "./duration";

type ClassDTO = {
    level: string,
    module: string,
    code: string,
    capacity: number,
    start_date: string,
    end_date: string
}
export default class Class {
    readonly level: string;
    readonly module: string;
    readonly code: string;
    readonly capacity: number;
    readonly startDate: Date;
    readonly endDate: Date;

    constructor({ level, module, code, capacity, start_date, end_date }: ClassDTO) {
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.startDate = new Date(start_date);
        this.endDate = new Date(end_date);
    }

    isFinished() {
        return new Date() > this.endDate;
    }

    isStarted() {
        const now = new Date();
        const classCalendarDuration = new Duration(this.startDate, this.endDate);
        const percentCompleted = classCalendarDuration.getPercentCompleteUntil(now);
        return percentCompleted > 25 ? true : false;
    }
}