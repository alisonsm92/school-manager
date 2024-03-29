import Classroom from './classroom'
import Currency from './currency'
import EnrollmentCode from './enrollment-code'
import Invoice, { InvoiceStatus } from './invoice'
import InvoiceEvent, { InvoiceEventTypes } from './invoiceEvent'
import Level from './level'
import Module from './module'
import Prototype from './prototype'
import Student from './student'

export enum EnrollmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
}

const byDate = (month: number, year: number) => (invoice: Invoice) => {
  return invoice.month === month && invoice.year === year
}

export default class Enrollment implements Prototype {
    readonly student: Student;
    readonly level: Level;
    readonly module: Module;
    readonly classroom: Classroom;
    readonly issueDate: Date;
    readonly sequence: number;
    readonly code: EnrollmentCode;
    readonly installments: number;
    invoices: Invoice[];
    status: EnrollmentStatus;

    constructor ({ student, level, module, classroom, issueDate, sequence, installments }:
        { student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number, installments: number }) {
      if (student.age.value < module.minimumAge) {
        throw new Error('Student below minimum age')
      }
      if (classroom.isFinished(issueDate)) {
        throw new Error('Class is already finished')
      }
      if (classroom.isStarted(issueDate)) {
        throw new Error('Class is already started')
      }
      this.student = student
      this.level = level
      this.module = module
      this.classroom = classroom
      this.issueDate = issueDate
      this.sequence = sequence
      this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence)
      this.installments = installments
      this.invoices = []
      this.generateInvoices()
      this.status = EnrollmentStatus.ACTIVE
    }

    generateInvoices () {
      const installmentAmount = new Currency(this.module.price / this.installments)
      installmentAmount.truncate()
      for (let month = 1; month < this.installments; month++) {
        const invoice = new Invoice({
          code: this.code.value,
          month,
          year: this.issueDate.getFullYear(),
          amount: installmentAmount.value
        })
        this.invoices.push(invoice)
      }
      const diff = new Currency(this.module.price - installmentAmount.value * this.installments)
        .round()
      const lastInvoice = new Invoice({
        code: this.code.value,
        month: this.invoices.length + 1,
        year: this.issueDate.getFullYear(),
        amount: installmentAmount.value + diff.value
      })
      this.invoices.push(lastInvoice)
    }

    getInvoicesBalance () {
      return this.invoices.reduce((total, invoice) => total + invoice.getBalance(), 0)
    }

    cancel () {
      this.status = EnrollmentStatus.CANCELLED
    }

    getInvoice (month: number, year: number) {
      return this.invoices.find(byDate(month, year))
    }

    async payInvoice (month: number, year: number, amount: number, paymentDate: Date) {
      const invoice = await this.getInvoice(month, year)
      if (!invoice) throw new Error('Invoice not found')
      const status = await invoice.getStatus(paymentDate)
      if (status === InvoiceStatus.PAID) throw new Error('Invoice is already paid')
      if (status === InvoiceStatus.OVERDUE) {
        const penaltyAmount = invoice.getPenalty(paymentDate)
        const interestsAmount = invoice.getInterests(paymentDate)
        invoice.addEvent(new InvoiceEvent(InvoiceEventTypes.PENALTY, penaltyAmount))
        invoice.addEvent(new InvoiceEvent(InvoiceEventTypes.INTERESTS, interestsAmount))
      }
      const dueAmount = invoice.getBalance()
      if (amount !== dueAmount) {
        throw new Error('Payment amount does not match with the due amount')
      }
      invoice.addEvent(new InvoiceEvent(InvoiceEventTypes.PAYMENT, amount))
    }

    clone (): Enrollment {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}
