import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import { EnrollmentStatus } from "../entities/enrollment";
import CancelEnrollment from "./cancel-enrollment";
import GetEnrollment from "./get-enrollment";
import EnrollmentBuilder from "./__test__/enrollment-builder";

function setup() {
    const enrollmentRepository = new EnrollmentRepositoryInMemory();
    const getEnrollment = new GetEnrollment(enrollmentRepository);
    const sut = new CancelEnrollment(enrollmentRepository);
    return { sut, getEnrollment, enrollmentRepository };
}

describe('Testing cancel enrollment', () => {
    test('Should cancel enrollment', () => {
        const { sut, getEnrollment, enrollmentRepository } = setup();
        const enrollment = new EnrollmentBuilder().build();
        enrollmentRepository.add(enrollment);
        sut.execute({ code: enrollment.code.value });
        const getEnrollmentOutput = getEnrollment.execute({ code: enrollment.code.value });
        expect(getEnrollmentOutput.status).toBe(EnrollmentStatus.CANCELLED);
    });
});