import Invoice, { InvoiceStatus } from './invoice'
import InvoiceEvent, { InvoiceEventTypes } from './invoiceEvent'

describe('Testing Invoice', () => {
  describe('Get status method', () => {
    test('Should return status paid when balance is zero', () => {
      const invoice = new Invoice({
        code: '2021EM1A0001',
        month: 7,
        year: 2021,
        amount: 100
      })
      invoice.addEvent(new InvoiceEvent(InvoiceEventTypes.PAYMENT, 100))
      expect(invoice.getStatus(new Date('2021-07-06'))).toBe(InvoiceStatus.PAID)
    })

    test('Should return status overdue when the current date is after due date', () => {
      const invoice = new Invoice({
        code: '2021EM1A0001',
        month: 7,
        year: 2021,
        amount: 100
      })
      expect(invoice.getStatus(new Date('2021-07-06'))).toBe(InvoiceStatus.OVERDUE)
    })

    test('Should return status overdue when the current date is after due date', () => {
      const invoice = new Invoice({
        code: '2021EM1A0001',
        month: 7,
        year: 2021,
        amount: 100
      })
      expect(invoice.getStatus(new Date('2021-07-04'))).toBe(InvoiceStatus.OPENED)
    })
  })
})
