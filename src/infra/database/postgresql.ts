import { Pool } from 'pg'
import environment from '../../config/environment'
import ConnectionPool from '../../domain/entities/connection-pool'

export default class PostgreSQL implements ConnectionPool {
    private pool: Pool;

    constructor () {
      this.pool = new Pool({
        host: environment.postgres.host,
        database: environment.postgres.database,
        user: environment.postgres.user,
        password: environment.postgres.password,
        port: environment.postgres.port,
        connectionTimeoutMillis: 10000,
        statement_timeout: 10000
      })
    }

    private async getConnection () {
      return await this.pool.connect()
    }

    async isConnected () {
      return !!await this.getConnection()
    }

    async query<T> (queryString: string, params?: unknown[]) {
      const connection = await this.getConnection()
      const result = await connection.query<T>(queryString, params)
      connection.release()
      return result.rows
    }

    async end () {
      await this.pool.end()
    }
}
