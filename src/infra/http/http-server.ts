import express from 'express';
import RepositoryAbstractFactory from '../../domain/factories/repository-abstract-factory';
import Router from './router';
import environment from '../../config/environment';
import logger from '../logger';

export default class HttpServer {
    private readonly app: express.Application;
    private readonly port: number;
    private readonly repositoryFactory: RepositoryAbstractFactory;
    
    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.app = express();
        this.port = environment.server.port;
        this.repositoryFactory = repositoryFactory;
    }
    
    public start(): void {
        this.app.use(express.json());
        this.app.listen(this.port, () => 
            logger.debug(`Server started at http://localhost:${this.port}`));
        this.app.use(Router.build(this.repositoryFactory));
    }
}