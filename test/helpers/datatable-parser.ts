import { DataTable } from '@cucumber/cucumber'

function isNumber (value: string) {
  return !isNaN(Number(value))
}

export default class DataTableParser {
  dataTable: DataTable

  constructor (dataTable: DataTable) {
    this.dataTable = dataTable
  }

  parse (): unknown[] {
    return this.dataTable.rows().map((line: string[]) => line.map((item: string) => {
      if (isNumber(item)) return Number(item)
      switch (item) {
        case 'Ensino Médio':
          return 'EM'
        default:
          return item
      }
    }))
  }
}
