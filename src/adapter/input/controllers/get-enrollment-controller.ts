import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import GetEnrollmentOutputData from "../../../domain/ports/get-enrollment-output-data";
import GetEnrollment from "../../../domain/usecases/get-enrollment";
import { HttpRequest } from "../http/http-request";
import Controller from "./controller";

interface GetEnrollmentRequest extends HttpRequest {
    params: { code: string }
}

export default class GetEnrollmentController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async handle(httpRequest: GetEnrollmentRequest): Promise<GetEnrollmentOutputData> {
        const { code } = httpRequest.params;
        const currentDate = new Date();
        const getEnrollment = new GetEnrollment(this.repositoryFactory);
        const getEnrollmentOutputData = await getEnrollment.execute({ code, currentDate });
        return getEnrollmentOutputData;
    }
}