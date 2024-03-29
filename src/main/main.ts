import RepositoryDatabaseFactory from '../adapter/output/factories/repository-database-factory'
import HttpServer from '../infra/http/http-server'
import ConnectionPool from '../infra/database/postgresql'

async function initialize () {
  const connectionPool = new ConnectionPool()
  if (!await connectionPool.isConnected()) throw new Error('Database connection failed')
  const repositoryFactory = new RepositoryDatabaseFactory(connectionPool)
  const httpServer = new HttpServer(repositoryFactory)
  httpServer.start()
}

initialize()
