import Level from '../../../../domain/entities/level'
import LevelRepository from '../../../../domain/repositories/level-repository'

export default class LevelRepositoryMemory implements LevelRepository {
    private data: Level[];

    constructor () {
      this.data = []
    }

    async find (code: string) {
      const row = this.data.find(level => level.code === code)
      return row ? row.clone() : undefined
    }

    async add (level: Level) {
      this.data.push(level)
    }

    async clean () {
      this.data = []
    }
}
