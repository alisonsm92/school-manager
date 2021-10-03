import DateHelper from "./date-helper";
import Classroom from "../entities/classroom";

export default class ClassroomBuilder {
    defaultData = {
        level: "EM",
        module: "1",
        code: "A",
        capacity: 10,
        startDate: new Date(),
        endDate: DateHelper.getDateAfter({ days: 30 })
    }
    
    withCapacity(value: number) {
        this.defaultData.capacity = value;
        return this;
    }

    withStartDate(value: Date) {
        this.defaultData.startDate = value;
        return this;
    }

    withEndDate(value: Date) {
        this.defaultData.endDate = value;
        return this;
    }

    build() {
        return new Classroom(this.defaultData);
    }
}