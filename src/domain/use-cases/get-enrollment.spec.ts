import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import GetEnrollment from "./get-enrollment";
import EnrollmentBuilder from "./__test__/enrollment-builder";

function setup() {
    const enrollmentRepository = new EnrollmentRepositoryInMemory();
    const sut = new GetEnrollment(enrollmentRepository);
    return { sut, enrollmentRepository };
}

describe('Testing get enrollment', () => {
    test('Should get enrollment by code with invoice balance', () => {
        const { enrollmentRepository, sut } = setup();
        const enrollment = new EnrollmentBuilder().build();
        enrollmentRepository.add(enrollment);
        const result = sut.execute(enrollment.code.value);
        expect(result).toHaveProperty('code', enrollment.code);
        expect(result).toHaveProperty('student.name', enrollment.student.name);
        expect(result).toHaveProperty('student.cpf', enrollment.student.cpf);
        expect(result).toHaveProperty('student.birthDate', new Date(enrollment.student.birthDate));
        expect(result).toHaveProperty('balance', 17000);
    });
});