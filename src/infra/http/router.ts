import express from 'express'
import CancelEnrollmentController from '../../adapter/input/controllers/cancel-enrollment-controller'
import EnrollModuleController from '../../adapter/input/controllers/enroll-module-controller'
import EnrollStudentController from '../../adapter/input/controllers/enroll-student-controller'
import GetEnrollmentController from '../../adapter/input/controllers/get-enrollment-controller'
import PayInvoiceController from '../../adapter/input/controllers/pay-invoice-controller'
import RepositoryAbstractFactory from '../../domain/factories/repository-abstract-factory'
import ExpressConverter from './express-controller-converter'

export default class Router {
  static build (repositoryFactory: RepositoryAbstractFactory) {
    const router = express.Router({ mergeParams: true })
    router.post('/modules', new ExpressConverter(
      new EnrollModuleController(repositoryFactory)).handler)
    router.get('/enrollments/:code', new ExpressConverter(
      new GetEnrollmentController(repositoryFactory)).handler)
    router.post('/enrollments', new ExpressConverter(
      new EnrollStudentController(repositoryFactory)).handler)
    router.post('/enrollments/:code/payments', new ExpressConverter(
      new PayInvoiceController(repositoryFactory)).handler)
    router.post('/enrollments/:code/cancel', new ExpressConverter(
      new CancelEnrollmentController(repositoryFactory)).handler)
    return router
  }
}
