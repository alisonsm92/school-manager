import DateHelper from '../../../domain/__test__/date-helper'

export default class ClassroomBuilder {
    defaultData = {
      level: 'EM',
      module: '1',
      code: 'A',
      capacity: 10,
      startDate: new Date(),
      endDate: DateHelper.getDateAfter({ days: 30 })
    }

    withCode (value: string) {
      this.defaultData.code = value
      return this
    }

    withLevel (value: string) {
      this.defaultData.level = value
      return this
    }

    withModule (value: string) {
      this.defaultData.module = value
      return this
    }

    withCapacity (value: number) {
      this.defaultData.capacity = value
      return this
    }

    withStartDate (value: Date) {
      this.defaultData.startDate = value
      return this
    }

    withEndDate (value: Date) {
      this.defaultData.endDate = value
      return this
    }

    build () {
      return this.defaultData
    }
}
