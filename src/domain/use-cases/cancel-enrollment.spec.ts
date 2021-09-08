import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import { EnrollmentStatus } from "../entities/enrollment";
import CancelEnrollment from "./cancel-enrollment";
import GetEnrollment from "./get-enrollment";
import EnrollmentRepository from "./ports/enrollment-repository";
import EnrollmentBuilder from "./__test__/enrollment-builder";

let enrollmentRepository: EnrollmentRepository;
let getEnrollment: GetEnrollment;
let sut: CancelEnrollment;

beforeEach(function() {
    enrollmentRepository = new EnrollmentRepositoryInMemory();
    getEnrollment = new GetEnrollment(enrollmentRepository);
    sut = new CancelEnrollment(enrollmentRepository);
});

describe('Testing cancel enrollment', () => {
    test('Should cancel enrollment', () => {
        const enrollment = new EnrollmentBuilder().build();
        enrollmentRepository.add(enrollment);
        sut.execute({ code: enrollment.code.value });
        const getEnrollmentOutput = getEnrollment.execute({ code: enrollment.code.value });
        expect(getEnrollmentOutput.status).toBe(EnrollmentStatus.CANCELLED);
    });
});