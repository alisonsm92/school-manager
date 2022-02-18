import RepositoryDatabaseFactory from '../adapter/output/factories/repository-database-factory'
import HttpServer from '../infra/http/http-server'
import connectionPool from '../infra/database/connection-pool'

async function initialize () {
  if (!await connectionPool.isConnected()) throw new Error('Database connection failed')
  const repositoryFactory = new RepositoryDatabaseFactory()
  const httpServer = new HttpServer(repositoryFactory)
  httpServer.start()
}

initialize()
