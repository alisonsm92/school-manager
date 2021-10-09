import { config } from 'dotenv';
config();

export default {
    postgreSQL: {
        host: process.env.POSTGRESQL_HOST || 'localhost',
        user: process.env.POSTGRESQL_USER || 'postgres',
        password: process.env.POSTGRESQL_PASSWORD,
        port: process.env.POSTGRESQL_PORT ? Number(process.env.POSTGRESQL_PORT) : 5432,
    }
}