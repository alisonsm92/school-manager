export default class DataTableParser {
  constructor (dataTable) {
    this.dataTable = dataTable
  }

  parse () {
    return this.dataTable.rows().map((line) => line.map((item) => {
      switch (item) {
        case 'Ensino Médio':
          return 'EM'
        default:
          return item
      }
    }))
  }
}
