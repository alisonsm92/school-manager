import { Pool } from 'pg';
import environment from '../config/environment';

class PostgreSQL {
    readonly pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: environment.postgreSQL.host,
            user: environment.postgreSQL.user,
            password: environment.postgreSQL.password,
            port: environment.postgreSQL.port,
        });
    }

    async getConnection() {
        return await this.pool.connect();
    }
}

export default new PostgreSQL();