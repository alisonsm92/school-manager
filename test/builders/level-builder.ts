import Level from '../../src/domain/entities/level'

export default class LevelBuilder {
  defaultData = {
    code: 'EM',
    description: 'Ensino Médio'
  }

  withCode (value: string) {
    this.defaultData.code = value
    return this
  }

  withDescription (value: string) {
    this.defaultData.description = value
    return this
  }

  build () {
    return new Level(this.defaultData)
  }
}
