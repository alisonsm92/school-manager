import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import GetEnrollment from "./get-enrollment";
import EnrollmentRepository from "./ports/enrollment-repository";
import EnrollmentBuilder from "./__test__/enrollment-builder";

let enrollmentRepository: EnrollmentRepository;
let sut: GetEnrollment;

beforeEach(function() {
    enrollmentRepository = new EnrollmentRepositoryInMemory();
    sut = new GetEnrollment(enrollmentRepository);
});

describe('Testing get enrollment', () => {
    test('Should get enrollment by code with invoice balance', () => {
        const enrollment = new EnrollmentBuilder().build();
        enrollmentRepository.add(enrollment);
        const outputData = sut.execute({ code: enrollment.code.value });
        expect(outputData).toHaveProperty('code', enrollment.code.value);
        expect(outputData).toHaveProperty('student.name', enrollment.student.name);
        expect(outputData).toHaveProperty('student.cpf', enrollment.student.cpf);
        expect(outputData).toHaveProperty('student.birthDate', new Date(enrollment.student.birthDate));
        expect(outputData).toHaveProperty('balance', enrollment.module.price);
    });
});