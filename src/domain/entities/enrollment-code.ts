export default class EnrollmentCode {
    readonly value: string;
    constructor (level: string, module: string, classroom: string, date: Date, sequence: number) {
      const fullYear = date.getFullYear()
      const sequenceWithPad = sequence.toString().padStart(4, '0')
      this.value = `${fullYear}${level}${module}${classroom}${sequenceWithPad}`
    }
}
