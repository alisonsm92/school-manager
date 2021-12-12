import Currency from './currency'
import InvoiceEvent, { InvoiceEventTypes } from './invoiceEvent'
import Period from './period'
import Prototype from './prototype'

export enum InvoiceStatus {
    OPENED = 'opened',
    PAID = 'paid',
    OVERDUE = 'overdue'
}

export default class Invoice implements Prototype {
    readonly code: string;
    readonly month: number;
    readonly year: number;
    readonly amount: number;
    events: InvoiceEvent[];
    readonly dueDate: Date;
    private readonly penaltyPercentage = 0.10;
    private readonly interestPercentage = 0.01;

    constructor ({ code, month, year, amount }:
        { code: string, month: number, year: number, amount: number }) {
      this.code = code
      this.month = month
      this.year = year
      this.amount = amount
      this.events = []
      this.dueDate = new Date(`${year}-${month}-05`)
    }

    addEvent (invoiceEvent: InvoiceEvent) {
      this.events.push(invoiceEvent)
    }

    getBalance () {
      return this.events.reduce((total, event) => {
        switch (event.type) {
          case InvoiceEventTypes.PAYMENT:
            total -= event.amount
            break
          case InvoiceEventTypes.PENALTY:
          case InvoiceEventTypes.INTERESTS:
            total += event.amount
            break
        }
        return new Currency(total).round().value
      }, this.amount)
    }

    getStatus (currentDate: Date) {
      if (this.getBalance() === 0) return InvoiceStatus.PAID
      if (this.dueDate < currentDate) return InvoiceStatus.OVERDUE
      return InvoiceStatus.OPENED
    }

    getPenalty (currentDate: Date) {
      const status = this.getStatus(currentDate)
      if (status === InvoiceStatus.OPENED) return 0
      if (status === InvoiceStatus.PAID) return 0
      const penalty = new Currency(this.getBalance() * this.penaltyPercentage).round()
      return penalty.value
    }

    getInterests (currentDate: Date) {
      const status = this.getStatus(currentDate)
      if (status === InvoiceStatus.OPENED) return 0
      if (status === InvoiceStatus.PAID) return 0
      const dueDays = new Period(this.dueDate, currentDate).getDiffInDays() - 1
      const penalty = new Currency(this.getBalance() * (dueDays * this.interestPercentage)).round()
      return penalty.value
    }

    clone (): Invoice {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}
