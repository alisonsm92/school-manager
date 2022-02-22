import Invoice from '../../../../domain/entities/invoice'
import InvoiceEvent, { InvoiceEventTypes } from '../../../../domain/entities/invoiceEvent'
import ConnectionPool from '../../../../infra/database/postgresql'
import InvoiceRepositoryDatabase from './invoice-repository-database'

const inputData = {
  code: '2021EM1A0001',
  month: 7,
  year: 2021,
  amount: 100
}
const connectionPool = new ConnectionPool()

let sut: InvoiceRepositoryDatabase

beforeAll(async () => {
  sut = new InvoiceRepositoryDatabase(connectionPool)
  await sut.clean()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await connectionPool.end()
})

describe('Testing InvoiceRepositoryDatabase', () => {
  describe('Find and Add method', () => {
    test('Should return the invoice with code, month and year provided when it exists', async () => {
      await sut.add(new Invoice(inputData))
      const invoice = await sut.find(inputData.code, inputData.month, inputData.year)
      expect(invoice).toHaveProperty('code', inputData.code)
      expect(invoice).toHaveProperty('month', inputData.month)
      expect(invoice).toHaveProperty('year', inputData.year)
      expect(invoice).toHaveProperty('amount', inputData.amount)
    })

    test('Should return the invoice with events when it exists', async () => {
      const invoice = new Invoice(inputData)
      await sut.add(invoice)
      const interestsEvent = new InvoiceEvent(InvoiceEventTypes.INTERESTS, 100)
      const penaltyEvent = new InvoiceEvent(InvoiceEventTypes.PENALTY, 100)
      const paymentEvent = new InvoiceEvent(InvoiceEventTypes.PAYMENT, 1000)
      invoice.addEvent(interestsEvent)
      invoice.addEvent(penaltyEvent)
      invoice.addEvent(paymentEvent)
      await sut.update(invoice)
      const updatedInvoice = await sut.find(inputData.code, inputData.month, inputData.year)
      expect(updatedInvoice?.events).toEqual(
        expect.arrayContaining([
          expect.objectContaining(interestsEvent),
          expect.objectContaining(penaltyEvent),
          expect.objectContaining(paymentEvent)
        ])
      )
    })

    test('Should return undefined when the invoice it is not exists', async () => {
      const invoice = await sut.find(inputData.code, inputData.month, inputData.year)
      expect(invoice).toBeUndefined()
    })
  })

  describe('FindMany method', () => {
    test('Should return the invoices with code provided when it exists', async () => {
      const inputInvoices = [new Invoice(inputData), new Invoice({ ...inputData, month: 8 })]
      await sut.add(inputInvoices[0])
      await sut.add(inputInvoices[1])
      const invoices = await sut.findMany(inputData.code)
      expect(invoices).toEqual(inputInvoices)
    })

    test('Should return undefined when not exists invoices with the code', async () => {
      const invoices = await sut.findMany(inputData.code)
      expect(invoices).toHaveLength(0)
    })
  })

  describe('Update method', () => {
    it('Should return the invoice with the data updated', async () => {
      await sut.add(new Invoice(inputData))
      inputData.amount = 101
      await sut.update(new Invoice(inputData))
      const invoice = await sut.find(inputData.code, inputData.month, inputData.year)
      expect(invoice?.amount).toBe(101)
    })
  })

  describe('Clean method', () => {
    test('Should not found the register added', async () => {
      await sut.add(new Invoice(inputData))
      await sut.clean()
      const invoice = await sut.find(inputData.code, inputData.month, inputData.year)
      expect(invoice).toBeUndefined()
    })
  })
})
