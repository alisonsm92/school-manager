import pino from 'pino';
import environment from '../config/environment';

const config: pino.LoggerOptions = {
    enabled: !environment.node.isTest,
    level: environment.logger.level,
    serializers: { error: pino.stdSerializers.err },
    transport: environment.node.isDevelopment && environment.logger.prettyPrint 
        ? { target: 'pino-pretty', options: { colorize: true } } 
        : undefined,
}

export default pino(config);