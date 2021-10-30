import express from "express";
import EnrollStudentController from "../../adapter/input/controllers/enroll-student-controller";
import GetEnrollmentController from "../../adapter/input/controllers/get-enrollment-controller";
import RepositoryAbstractFactory from "../../domain/factories/repository-abstract-factory";
import ExpressConverter from "./express-controller-converter";

export default class Router {
    static build (repositoryFactory: RepositoryAbstractFactory) {
        const router = express.Router({ mergeParams: true });
        router.get('/enrollments/:code', new ExpressConverter(
            new GetEnrollmentController(repositoryFactory)).handler);
        router.post('/enrollments', new ExpressConverter(
            new EnrollStudentController(repositoryFactory)).handler);
        return router;
    }
}