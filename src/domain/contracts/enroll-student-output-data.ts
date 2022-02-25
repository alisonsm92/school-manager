import Enrollment from '../entities/enrollment'

export default class EnrollStudentOutputData {
    readonly code: string;

    constructor (enrollment: Enrollment) {
      this.code = enrollment.code.value
    }
}
