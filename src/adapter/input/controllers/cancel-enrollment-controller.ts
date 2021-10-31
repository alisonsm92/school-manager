import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import CancelEnrollment from "../../../domain/usecases/cancel-enrollment";
import { HttpRequest } from "../http/http-request";
import Controller from "./controller";

interface CancelEnrollmentRequest extends HttpRequest {
    params: { code: string }
}

export default class CancelEnrollmentController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async handle(httpRequest: CancelEnrollmentRequest): Promise<void> {
        const { code } = httpRequest.params;
        const cancelEnrollment = new CancelEnrollment(this.repositoryFactory);
        return await cancelEnrollment.execute(code);
    }
}