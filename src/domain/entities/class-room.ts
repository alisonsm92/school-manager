import Duration from "./duration";

export default class ClassRoom {
    readonly level: string;
    readonly module: string;
    readonly code: string;
    readonly capacity: number;
    readonly startDate: Date;
    readonly endDate: Date;

    constructor({ level, module, code, capacity, startDate, endDate }:
        { level: string, module: string, code: string, capacity: number, startDate: string, endDate: string }) {
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
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