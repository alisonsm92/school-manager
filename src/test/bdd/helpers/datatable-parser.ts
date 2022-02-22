import { DataTable } from '@cucumber/cucumber'

export default class DataTableParser {
  dataTable: DataTable

  constructor (dataTable: DataTable) {
    this.dataTable = dataTable
  }

  parse () {
    return this.dataTable.rows().map((line: string[]) => line.map((item: string) => {
      switch (item) {
        case 'Ensino Médio':
          return 'EM'
        default:
          return item
      }
    }))
  }
}
