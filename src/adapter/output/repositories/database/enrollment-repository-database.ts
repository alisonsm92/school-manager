import Classroom from "../../../../domain/entities/classroom";
import Enrollment, { EnrollmentStatus } from "../../../../domain/entities/enrollment";
import EnrollmentCode from "../../../../domain/entities/enrollment-code";
import EnrollmentRepository from "../../../../domain/repositories/enrollment-repository";
import connectionPool from "../../../../infra/database/connection-pool";
import ClassroomRepositoryDatabase from "./classroom-repository-database";
import InvoiceRepositoryDatabase from "./invoice-repository-database";
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
    private database: typeof connectionPool;
    private studentRepository: StudentRepositoryDatabase;
    private invoiceRepository: InvoiceRepositoryDatabase;
    private levelRepository: LevelRepositoryDatabase;
    private moduleRepository: ModuleRepositoryDatabase;
    private classroomRepository: ClassroomRepositoryDatabase;

    constructor() {
        this.database = connectionPool;
        this.studentRepository = new StudentRepositoryDatabase();
        this.invoiceRepository = new InvoiceRepositoryDatabase();
        this.levelRepository = new LevelRepositoryDatabase();
        this.moduleRepository = new ModuleRepositoryDatabase();
        this.classroomRepository = new ClassroomRepositoryDatabase();
    }

    private async buildEnrollment(row: EnrollmentRegister) {
        const student = await this.studentRepository.find(row.student);
        if(!student) throw new Error('Student not found');
        const level = await this.levelRepository.find(row.level);
        if(!level) throw new Error('Level not found');
        const module = await this.moduleRepository.find(row.level, row.module);
        if(!module) throw new Error('Module not found');
        const classroom = await this.classroomRepository.find(row.level, row.module, row.classroom);
        if(!classroom) throw new Error('Classroom not found');
        const invoices = await this.invoiceRepository.findMany(row.code);
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
        enrollment.invoices = invoices;
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
        const [row] = await this.database.query<{count: string}>(`
            SELECT COUNT(*) FROM system.enrollment
        `);
        return Number(row.count);
    }

    async add(enrollment: Enrollment) {
        await this.studentRepository.add(enrollment.student);
        await Promise.all(enrollment.invoices.map(this.invoiceRepository.add, this.invoiceRepository));
        await this.database.query(`
            INSERT INTO system.enrollment (code, sequence, level, module, classroom, student, installments, issue_date, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `, [
            enrollment.code.value,
            enrollment.sequence,
            enrollment.level.code,
            enrollment.module.code,
            enrollment.classroom.code,
            enrollment.student.cpf.value,
            enrollment.installments,
            enrollment.issueDate,
            enrollment.status,
        ]);
    }

    async update(enrollment: Enrollment) {
        await this.studentRepository.update(enrollment.student);
        await Promise.all(enrollment.invoices.map(this.invoiceRepository.update, this.invoiceRepository));
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
            enrollment.student.cpf.value,
            enrollment.installments,
            enrollment.issueDate,
            enrollment.status,
        ]);
    }

    async clean(): Promise<void> {
        await this.studentRepository.clean();
		await this.invoiceRepository.clean();
		await this.database.query("DELETE FROM system.enrollment");
	}
}