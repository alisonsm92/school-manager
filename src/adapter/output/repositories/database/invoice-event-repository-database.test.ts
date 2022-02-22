import Invoice from '../../../../domain/entities/invoice'
import InvoiceEvent, { InvoiceEventTypes } from '../../../../domain/entities/invoiceEvent'
import ConnectionPool from '../../../../infra/database/postgresql'
import InvoiceEventRepositoryDatabase from './invoice-event-repository-database'

const invoice = new Invoice({
  code: '2021EM1A0001',
  month: 7,
  year: 2021,
  amount: 100
})
const connectionPool = new ConnectionPool()

let sut: InvoiceEventRepositoryDatabase

beforeAll(async () => {
  sut = new InvoiceEventRepositoryDatabase(connectionPool)
  await sut.clean()
})

afterEach(async () => {
  await sut.clean()
})

afterAll(async () => {
  await connectionPool.end()
})

describe('Testing InvoiceEventRepositoryDatabase', () => {
  describe('Find and Add method', () => {
    test('Should return the invoice event with code provided when it exists', async () => {
      await sut.add(invoice, new InvoiceEvent(InvoiceEventTypes.PAYMENT, 100))
      const invoiceEvents = await sut.findMany(invoice)
      expect(invoiceEvents).toEqual([new InvoiceEvent(InvoiceEventTypes.PAYMENT, 100)])
    })

    test('Should return undefined when the invoice event it is not exists', async () => {
      const invoiceEvents = await sut.findMany(invoice)
      expect(invoiceEvents).toHaveLength(0)
    })
  })

  describe('Clean method', () => {
    test('Should not found the register added', async () => {
      await sut.add(invoice, new InvoiceEvent(InvoiceEventTypes.PAYMENT, 100))
      await sut.clean()
      const invoiceEvents = await sut.findMany(invoice)
      expect(invoiceEvents).toHaveLength(0)
    })
  })
})
