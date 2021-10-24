import { config } from 'dotenv';
config();

export default {
    server: {
        port: process.env.PORT ? Number(process.env.PORT) : 3000,
    },
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        database: process.env.POSTGRES_DATABASE || 'default',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
    }
}