import Classroom from '../../entities/classroom'
import Enrollment from '../../entities/enrollment'
import Level from '../../entities/level'
import Module from '../../entities/module'
import ClassroomBuilder from './classroom-builder'
import LevelBuilder from './level-builder'
import ModuleBuilder from './module-builder'
import StudentBuilder from './student-builder'

export default class EnrollmentBuilder {
  defaultData = {
    student: new StudentBuilder().build(),
    level: new LevelBuilder().build(),
    module: new ModuleBuilder().build(),
    classroom: new ClassroomBuilder().build(),
    issueDate: new Date(),
    sequence: 0,
    installments: 12
  }

  withLevel (value: Level) {
    this.defaultData.level = value
    return this
  }

  withModule (value: Module) {
    this.defaultData.module = value
    return this
  }

  withClassroom (value: Classroom) {
    this.defaultData.classroom = value
    return this
  }

  build () {
    return new Enrollment(this.defaultData)
  }
}
