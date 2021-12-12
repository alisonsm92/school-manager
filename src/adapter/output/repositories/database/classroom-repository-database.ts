/* eslint-disable camelcase */
import Classroom from '../../../../domain/entities/classroom'
import ClassroomRepository from '../../../../domain/repositories/classroom-repository'
import connectionPool from '../../../../infra/database/connection-pool'

type ClassroomRegister = {
    code: string,
    level: string,
    module: string,
    capacity: number,
    start_date: string,
    end_date: string,
}

export default class ClassroomRepositoryDatabase implements ClassroomRepository {
    private database: typeof connectionPool;

    constructor () {
      this.database = connectionPool
    }

    async find (level: string, module: string, code: string) {
      const [row] = await this.database.query<ClassroomRegister>(`
            SELECT * 
            FROM system.classroom
            WHERE level = $1
            AND module = $2
            AND code = $3`, [level, module, code])
      return row
        ? new Classroom({
          code: row.code,
          level: row.level,
          module: row.module,
          capacity: row.capacity,
          startDate: new Date(row.start_date),
          endDate: new Date(row.end_date)
        })
        : undefined
    }

    async add (classroom: Classroom) {
      await this.database.query(`
            INSERT INTO system.classroom (code, level, module, capacity, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5, $6);
        `, [
        classroom.code,
        classroom.level,
        classroom.module,
        classroom.capacity,
        classroom.startDate,
        classroom.endDate
      ])
    }

    async update (classroom: Classroom) {
      await this.database.query(`
            UPDATE system.classroom
            SET capacity = $4, start_date = $5, end_date = $6
            WHERE code = $1
            AND level = $2
            AND module = $3
        `, [
        classroom.code,
        classroom.level,
        classroom.module,
        classroom.capacity,
        classroom.startDate,
        classroom.endDate
      ])
    }

    async clean () {
      await this.database.query('DELETE FROM system.classroom')
    }
}
