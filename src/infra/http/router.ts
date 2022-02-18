import express from 'express'
import RegisterLevelController from '../../adapter/input/controllers/register-level-controller'
import RegisterModuleController from '../../adapter/input/controllers/register-module-controller'
import GetEnrollmentController from '../../adapter/input/controllers/get-enrollment-controller'
import EnrollStudentController from '../../adapter/input/controllers/enroll-student-controller'
import PayInvoiceController from '../../adapter/input/controllers/pay-invoice-controller'
import CancelEnrollmentController from '../../adapter/input/controllers/cancel-enrollment-controller'
import RepositoryAbstractFactory from '../../domain/factories/repository-abstract-factory'
import ExpressConverter from './express-controller-converter'
import RegisterClassroomController from '../../adapter/input/controllers/register-classroom-controller'

export default class Router {
  static build (repositoryFactory: RepositoryAbstractFactory) {
    const router = express.Router({ mergeParams: true })
    router.post('/levels', new ExpressConverter(
      new RegisterLevelController(repositoryFactory)).handler)
    router.post('/modules', new ExpressConverter(
      new RegisterModuleController(repositoryFactory)).handler)
    router.post('/classrooms', new ExpressConverter(
      new RegisterClassroomController(repositoryFactory)).handler)
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
