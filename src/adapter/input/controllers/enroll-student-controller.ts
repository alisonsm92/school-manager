import EnrollStudentInputData from "../../../domain/data/enroll-student-input-data";
import EnrollStudentOutputData from "../../../domain/data/enroll-student-output-data";
import RepositoryAbstractFactory from "../../../domain/factories/repository-abstract-factory";
import EnrollStudent from "../../../domain/usecases/enroll-student";
import { HttpRequest } from "../http/http-request";
import Controller from "./controller";

interface EnrollStudentRequest extends HttpRequest {
    body: {
        student: {
            name: string,
            cpf: string,
            birthDate: string
        },
        level: string,
        module: string,
        classroom: string,
        installments: number
    }
}

export default class EnrollStudentController implements Controller {
    private readonly repositoryFactory: RepositoryAbstractFactory;

    constructor(repositoryFactory: RepositoryAbstractFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async handle(httpRequest: EnrollStudentRequest): Promise<EnrollStudentOutputData> {
        const inputData = new EnrollStudentInputData(httpRequest.body);
        const enrollStudent = new EnrollStudent(this.repositoryFactory);
        const enrollStudentOutputData = await enrollStudent.execute(inputData);
        return enrollStudentOutputData;
    }
}