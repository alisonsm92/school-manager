import { Pool } from 'pg';
import environment from '../config/environment';

class PostgreSQL {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: environment.postgres.host,
            database: environment.postgres.database,
            user: environment.postgres.user,
            password: environment.postgres.password,
            port: environment.postgres.port,
        });
    }

    private async getConnection() {
        return await this.pool.connect();
    }

    async query<T>(queryString: string, params?: unknown[]) {
        const connection = await this.getConnection();
        const result = await connection.query<T>(queryString, params);
        connection.release();
        return result.rows;
    }
}

export default new PostgreSQL();