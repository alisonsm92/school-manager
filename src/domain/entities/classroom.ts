import Duration from "./duration";

export default class Classroom {
    readonly level: string;
    readonly module: string;
    readonly code: string;
    readonly capacity: number;
    readonly startDate: Date;
    readonly endDate: Date;

    constructor({ level, module, code, capacity, startDate, endDate }:
        { level: string, module: string, code: string, capacity: number, startDate: Date, endDate: Date }) {
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    isFinished(currentDate: Date) {
        return currentDate > this.endDate;
    }

    isStarted(currentDate: Date) {
        const classCalendarDuration = new Duration(this.startDate, this.endDate);
        const percentCompleted = classCalendarDuration.getPercentCompleteUntil(currentDate);
        return percentCompleted > 25 ? true : false;
    }
}