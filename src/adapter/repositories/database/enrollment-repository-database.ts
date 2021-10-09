import Classroom from "../../../domain/entities/classroom";
import Enrollment from "../../../domain/entities/enrollment";
import EnrollmentCode from "../../../domain/entities/enrollment-code";
import EnrollmentRepository from "../../../domain/repositories/enrollment-repository";
import postgreSQL from "../../../infra/postgresql";

export default class EnrollmentRepositoryDatabase implements EnrollmentRepository {
    private database: typeof postgreSQL;

    constructor() {
        this.database = postgreSQL;
    }

    async findByCode(code: EnrollmentCode['value']) {
        return this.database.query('SELECT * FROM enrollment WHERE code = $1', [code]);
    }

    async findByCpf(cpf: string) {
        return this.database.query('SELECT * FROM enrollment WHERE cpf = $1', [cpf]);
    }

    async findAllByClass({ module, level, code }: Classroom) {
        return this.database.query(`
            SELECT * FROM enrollment 
            WHERE module = $1
            AND level = $2
            AND classroom = $3
        `, [module, level, code]);
    }

    async count() {
        return this.database.query('SELECT COUNT(*) FROM enrollment');
    }

    async add(enrollment: Enrollment) {
        this.database.query(`
            INSERT INTO enrollment (code, sequence, level, module, classroom, student, installments, issue_date, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `, [
            enrollment.code.value,
            enrollment.sequence,
            enrollment.level.code,
            enrollment.module.code,
            enrollment.classroom.code,
            enrollment.student,
            enrollment.installments,
            enrollment.issueDate.toISOString(),
            enrollment.status,
        ]);
    }

    async update(enrollment: Enrollment) {
        this.database.query(`
            UPDATE enrollment
            SET sequence = $2, level = $3, module = $4, classroom = $5, student = $6, installments = $7, issue_date = $8, status = $9
            WHERE code = $1;
        `, [
            enrollment.code.value,
            enrollment.sequence,
            enrollment.level.code,
            enrollment.module.code,
            enrollment.classroom.code,
            enrollment.student,
            enrollment.installments,
            enrollment.issueDate.toISOString(),
            enrollment.status,
        ]);
    }
}