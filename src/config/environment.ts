import { config } from 'dotenv';
config();

export default {
    node: {
        isProduction: process.env.NODE_ENV === 'production',
        isDevelopment: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
        isTest: process.env.NODE_ENV === 'test',
    },
    server: {
        port: process.env.PORT ? Number(process.env.PORT) : 3000,
    },
    logger: {
        level: process.env.LOG_LEVEL || 'debug',
        prettyPrint: process.env.LOG_PRETTY_PRINT ? process.env.LOG_PRETTY_PRINT === 'true' : false,
    },
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        database: process.env.POSTGRES_DATABASE || 'default',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
    }
}