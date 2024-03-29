import Module from '../../src/domain/entities/module'

export default class ModuleBuilder {
  defaultData = {
    level: 'EM',
    code: '1',
    description: '1o Ano',
    minimumAge: 15,
    price: 17000
  }

  withCode (value: string) {
    this.defaultData.code = value
    return this
  }

  withLevel (value: string) {
    this.defaultData.level = value
    return this
  }

  build () {
    return new Module(this.defaultData)
  }
}
