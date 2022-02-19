import ConnectionPool from '../../../../domain/entities/connection-pool'
import Level from '../../../../domain/entities/level'
import LevelRepository from '../../../../domain/repositories/level-repository'

type LevelRegister = {
    code: string,
    description: string
}

export default class LevelRepositoryDatabase implements LevelRepository {
    private database: ConnectionPool;

    constructor (connectionPool: ConnectionPool) {
      this.database = connectionPool
    }

    async find (code: string) {
      const [row] = await this.database.query<LevelRegister>(`
            SELECT * 
            FROM system.level
            WHERE code = $1`, [code])
      return row
        ? new Level({
          code: row.code,
          description: row.description
        })
        : undefined
    }

    async add (level: Level) {
      await this.database.query(`
            INSERT INTO system.level (code, description)
            VALUES ($1, $2);
        `, [
        level.code,
        level.description
      ])
    }

    async clean () {
      await this.database.query('DELETE FROM system.level')
    }
}
