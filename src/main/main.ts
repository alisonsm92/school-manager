import RepositoryDatabaseFactory from '../adapter/output/factories/repository-database-factory'
import HttpServer from '../infra/http/http-server'

const repositoryFactory = new RepositoryDatabaseFactory()
const httpServer = new HttpServer(repositoryFactory)
httpServer.start()
