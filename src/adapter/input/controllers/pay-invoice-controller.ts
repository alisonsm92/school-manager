import PayInvoiceInputData from '../../../domain/data/pay-invoice-input-data'
import RepositoryAbstractFactory from '../../../domain/factories/repository-abstract-factory'
import PayInvoice from '../../../domain/usecases/pay-invoice'
import { HttpRequest } from '../http/http-request'
import Controller from './controller'

interface PayInvoiceRequest extends HttpRequest {
    params: { code: string },
    body: {
        month: number,
        year: number,
        amount: number
    }
}

export default class PayInvoiceController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor (repositoryFactory: RepositoryAbstractFactory) {
      this.repositoryFactory = repositoryFactory
    }

    async handle (httpRequest: PayInvoiceRequest): Promise<void> {
      const { code } = httpRequest.params
      const paymentDate = new Date()
      const inputData = new PayInvoiceInputData({ code, paymentDate, ...httpRequest.body })
      const payInvoice = new PayInvoice(this.repositoryFactory)
      return await payInvoice.execute(inputData)
    }
}
