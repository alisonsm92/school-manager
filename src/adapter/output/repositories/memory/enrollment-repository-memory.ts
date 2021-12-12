import Classroom from '../../../../domain/entities/classroom'
import Enrollment from '../../../../domain/entities/enrollment'
import EnrollmentCode from '../../../../domain/entities/enrollment-code'
import EnrollmentRepository from '../../../../domain/repositories/enrollment-repository'

const clone = (row: Enrollment) => row.clone()

export default class EnrollmentRepositoryMemory implements EnrollmentRepository {
    private data: Enrollment[];

    constructor () {
      this.data = []
    }

    async findByCode (code: EnrollmentCode['value']) {
      const row = this.data.find(enrollment => enrollment.code.value === code)
      return row ? row.clone() : undefined
    }

    async findByCpf (cpf: string) {
      const row = this.data.find(enrollment => enrollment.student.cpf.value === cpf)
      return row ? row.clone() : undefined
    }

    async findAllByClass ({ module, level, code }: Classroom) {
      const row = this.data.filter(enrollment => enrollment.module.code === module &&
            enrollment.level.code === level &&
            enrollment.classroom.code === code)
      return row.map(clone)
    }

    async count () {
      return this.data.length
    }

    async add (enrollment: Enrollment) {
      this.data.push(enrollment)
    }

    async update (enrollment: Enrollment) {
      const index = this.data.findIndex(item => item.code.value === enrollment.code.value)
      this.data[index] = enrollment
    }

    async clean () {
      this.data = []
    }
}
