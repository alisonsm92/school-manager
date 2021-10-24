import express from "express";
import GetEnrollmentController from "../../adapter/input/controllers/get-enrollment-controller";
import RepositoryAbstractFactory from "../../domain/factories/repository-abstract-factory";
import ExpressControllerConverter from "./express-controller-converter";

export default class Router {
    static build (repositoryFactory: RepositoryAbstractFactory) {
        const router = express.Router({ mergeParams: true });
        const getEnrollmentController = new GetEnrollmentController(repositoryFactory);
        router.get('/enrollments/:code',
            new ExpressControllerConverter(getEnrollmentController).handler);
        return router;
    }
}