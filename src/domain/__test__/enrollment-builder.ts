import Enrollment from "../entities/enrollment";
import ClassroomBuilder from "./classroom-builder";
import LevelBuilder from "./level-builder";
import ModuleBuilder from "./module-builder";
import StudentBuilder from "./student-builder";

export default class EnrollmentBuilder {
    build() {
        return new Enrollment({
            student: new StudentBuilder().build(),
            level: new LevelBuilder().build(),
            module: new ModuleBuilder().build(),
            classroom: new ClassroomBuilder().build(),
            issueDate: new Date(),
            sequence: 0,
            installments: 12
        });
    }
}