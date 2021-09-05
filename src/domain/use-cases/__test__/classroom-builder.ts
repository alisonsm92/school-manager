import DateHelper from "../../../common/date-helper";
import Classroom from "../../entities/classroom";

export default class ClassroomBuilder {
    build() {
        return new Classroom({
            level: "EM",
            module: "1",
            code: "A",
            capacity: 10,
            startDate: new Date(),
            endDate: DateHelper.getDateAfter({ days: 30 })
        });
    }
}