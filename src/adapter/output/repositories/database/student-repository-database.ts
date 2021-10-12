import Cpf from '../../../../domain/entities/cpf';
import Student from '../../../../domain/entities/student';
import StudentRepository from '../../../../domain/repositories/student-repository';
import postgreSQL from "../../../../infra/postgresql";

type StudentRegister = {
    cpf: string,
    name: string,
    birth_date: Date
}

export default class StudentRepositoryDatabase implements StudentRepository {
    private database: typeof postgreSQL;

    constructor() {
        this.database = postgreSQL;
    }

    async find(cpf: Cpf) {
        const [row] = await this.database.query<StudentRegister>(`
            SELECT * 
            FROM system.student
            WHERE cpf = $1`, [cpf.value]);
        return row ? new Student({
            cpf: row.cpf,
            name: row.name,
            birthDate: row.birth_date
        }) : undefined;
    }

    async add(student: Student) {
        await this.database.query(`
            INSERT INTO system.student (cpf, name, birth_date)
            VALUES ($1, $2, $3);
        `, [
            student.cpf,
            student.name,
            student.birthDate,
        ]);
    }

    async clean() {
        await this.database.query('DELETE FROM system.student');
    }
}