/* eslint-disable camelcase */
import ConnectionPool from '../../../../domain/entities/connection-pool'
import Module from '../../../../domain/entities/module'
import ModuleRepository from '../../../../domain/repositories/module-repository'

type ModuleRegister = {
    code: string,
    level: string,
    description: string,
    minimum_age: number,
    price: number
}

export default class ModuleRepositoryDatabase implements ModuleRepository {
    private database: ConnectionPool;

    constructor (connectionPool: ConnectionPool) {
      this.database = connectionPool
    }

    async find (level: string, code: string) {
      const [row] = await this.database.query<ModuleRegister>(`
            SELECT * 
            FROM system.module
            WHERE level = $1
            AND code = $2`, [level, code])
      return row
        ? new Module({
          code: row.code,
          level: row.level,
          description: row.description,
          minimumAge: row.minimum_age,
          price: row.price
        })
        : undefined
    }

    async add (module: Module) {
      await this.database.query(`
            INSERT INTO system.module (code, level, description, minimum_age, price)
            VALUES ($1, $2, $3, $4, $5);
        `, [
        module.code,
        module.level,
        module.description,
        module.minimumAge,
        module.price
      ])
    }

    async clean () {
      await this.database.query('DELETE FROM system.module')
    }
}
