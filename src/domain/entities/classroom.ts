import Period from "./period";

export default class Classroom {
    readonly level: string;
    readonly module: string;
    readonly code: string;
    readonly capacity: number;
    readonly period: Period;

    constructor({ level, module, code, capacity, startDate, endDate }:
        { level: string, module: string, code: string, capacity: number, startDate: Date, endDate: Date }) {
        this.level = level;
        this.module = module;
        this.code = code;
        this.capacity = capacity;
        this.period = new Period(startDate, endDate);
    }

    isFinished(currentDate: Date) {
        return currentDate > this.period.end;
    }

    isStarted(currentDate: Date) {
        const percentCompleted = this.period.getPercentCompleteUntil(currentDate);
        return percentCompleted > 25 ? true : false;
    }
}