
import EnrollmentRepository from "../../../../domain/repositories/enrollment-repository";
import EnrollmentRepositoryInMemory from "./enrollment-repository-in-memory";


export default class EnrollmentRepositoryInMemorySingleton {
    static instance: EnrollmentRepository | undefined;

    private constructor () {}

    static getInstance (): EnrollmentRepository {
        if (!EnrollmentRepositoryInMemorySingleton.instance) {
            EnrollmentRepositoryInMemorySingleton.instance = new EnrollmentRepositoryInMemory();
        }
        return EnrollmentRepositoryInMemorySingleton.instance;
    }

    static destroy () {
        EnrollmentRepositoryInMemorySingleton.instance = undefined;
    }
}