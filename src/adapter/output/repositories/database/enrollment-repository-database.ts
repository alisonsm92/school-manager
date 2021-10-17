import Classroom from "../../../../domain/entities/classroom";
import Cpf from "../../../../domain/entities/cpf";
import Enrollment, { EnrollmentStatus } from "../../../../domain/entities/enrollment";
import EnrollmentCode from "../../../../domain/entities/enrollment-code";
import Student from "../../../../domain/entities/student";
import EnrollmentRepository from "../../../../domain/repositories/enrollment-repository";
import postgreSQL from "../../../../infra/postgresql";
import ClassroomRepositoryDatabase from "./classroom-repository-database";
import LevelRepositoryDatabase from "./level-repository-database";
import ModuleRepositoryDatabase from "./module-repository-database";
import StudentRepositoryDatabase from "./student-repository-database";

type EnrollmentRegister = {
    code: string,
    sequence: number,
    level: string,
    module: string,
    classroom: string,
    student: string,
    installments: number,
    issue_date: Date,
    status: string
}

export default class EnrollmentRepositoryDatabase implements EnrollmentRepository {
    private database: typeof postgreSQL;
    private studentRepository: StudentRepositoryDatabase;
    private levelRepository: LevelRepositoryDatabase;
    private moduleRepository: ModuleRepositoryDatabase;
    private classroomRepository: ClassroomRepositoryDatabase;

    constructor() {
        this.database = postgreSQL;
        this.studentRepository = new StudentRepositoryDatabase();
        this.levelRepository = new LevelRepositoryDatabase();
        this.moduleRepository = new ModuleRepositoryDatabase();
        this.classroomRepository = new ClassroomRepositoryDatabase();
    }

    private async buildEnrollment(row: EnrollmentRegister) {
        const student = await this.studentRepository.find(new Cpf(row.student));
        if(!student) throw new Error('Student not found');
        const level = await this.levelRepository.find(row.level);
        if(!level) throw new Error('Level not found');
        const module = await this.moduleRepository.find(row.level, row.module);
        if(!module) throw new Error('Module not found');
        const classroom = await this.classroomRepository.find(row.level, row.module, row.classroom);
        if(!classroom) throw new Error('Classroom not found');
        const enrollment = new Enrollment({
            student, 
            level, 
            module, 
            classroom,
            issueDate: row.issue_date, 
            sequence: row.sequence, 
            installments: row.installments 
        });
        enrollment.status = EnrollmentStatus.ACTIVE === row.status 
            ? EnrollmentStatus.ACTIVE 
            : EnrollmentStatus.CANCELLED;
        return enrollment;
    }

    async findByCode(code: EnrollmentCode['value']) {
        const [row] = await this.database.query<EnrollmentRegister>(`
            SELECT * 
            FROM system.enrollment 
            WHERE code = $1
        `, [code]);
        if(!row) return undefined;
        return this.buildEnrollment(row);
    }

    async findByCpf(cpf: string) {
        const [row] = await this.database.query<EnrollmentRegister>(`
            SELECT * 
            FROM system.enrollment 
            WHERE student = $1
        `, [cpf]);
        if(!row) return undefined;
        return this.buildEnrollment(row);
    }

    async findAllByClass({ module, level, code }: Classroom) {
        const rows = await this.database.query<EnrollmentRegister>(`
            SELECT * FROM system.enrollment 
            WHERE module = $1
            AND level = $2
            AND classroom = $3
        `, [module, level, code]);
        if(!rows.length) return [];
        return Promise.all(rows.map((row) => this.buildEnrollment(row)));
    }

    async count() {
        const [row] = await this.database.query<number>('SELECT COUNT(*) FROM enrollment');
        return row;
    }

    async add(enrollment: Enrollment) {
        await this.studentRepository.add(new Student(enrollment.student));
        await this.database.query(`
            INSERT INTO system.enrollment (code, sequence, level, module, classroom, student, installments, issue_date, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `, [
            enrollment.code.value,
            enrollment.sequence,
            enrollment.level.code,
            enrollment.module.code,
            enrollment.classroom.code,
            enrollment.student.cpf,
            enrollment.installments,
            enrollment.issueDate,
            enrollment.status,
        ]);
    }

    async update(enrollment: Enrollment) {
        // TO DO: Adicionar update no repositório de estudante
        await this.database.query(`
            UPDATE system.enrollment
            SET sequence = $2, level = $3, module = $4, classroom = $5, student = $6, installments = $7, issue_date = $8, status = $9
            WHERE code = $1;
        `, [
            enrollment.code.value,
            enrollment.sequence,
            enrollment.level.code,
            enrollment.module.code,
            enrollment.classroom.code,
            enrollment.student.cpf,
            enrollment.installments,
            enrollment.issueDate,
            enrollment.status,
        ]);
    }

    async clean(): Promise<void> {
		await this.database.query("DELETE FROM system.invoice_event");
		await this.database.query("DELETE FROM system.invoice");
		await this.database.query("DELETE FROM system.enrollment");
		await this.database.query("DELETE FROM system.student");
	}
}