import Student from '../../../../domain/entities/student';
import connectionPool from "../../../../infra/database/connection-pool";

type StudentRegister = {
    cpf: string,
    name: string,
    birth_date: Date
}

export default class StudentRepositoryDatabase {
    private database: typeof connectionPool;

    constructor() {
        this.database = connectionPool;
    }

    async find(cpf: string) {
        const [row] = await this.database.query<StudentRegister>(`
            SELECT * 
            FROM system.student
            WHERE cpf = $1`, [cpf]);
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
            student.cpf.value,
            student.name.value,
            student.birthDate,
        ]);
    }

    async update(student: Student) {
        await this.database.query(`
            UPDATE system.student
            SET cpf = $1, name = $2, birth_date = $3
            WHERE cpf = $1
        `, [
            student.cpf.value,
            student.name.value,
            student.birthDate
        ]);
    }

    async clean() {
        await this.database.query('DELETE FROM system.student');
    }
}