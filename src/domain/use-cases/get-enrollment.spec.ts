import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import Classroom from "../entities/classroom";
import Enrollment from "../entities/enrollment";
import Level from "../entities/level";
import Module from "../entities/module";
import Student from "../entities/student";
import GetEnrollment from "./get-enrollment";

const fakeStudent = new Student({
    name: 'Maria Carolina Fonseca',
    cpf: '755.525.774-26',
    birthDate: new Date('2002-03-12')
});
const fakeLevel = new Level({
    code: "EM",
    description: "Ensino Médio"
});
const fakeModule = new Module({
    level: "EM",
    code: "1",
    description: "1o Ano",
    minimumAge: 15,
    price: 17000
});
const fakeClassroom = new Classroom({
    level: "EM",
    module: "1",
    code: "A",
    capacity: 10,
    startDate: new Date(),
    endDate: new Date()
});
const enrollment = new Enrollment({
    student: fakeStudent,
    level: fakeLevel,
    module: fakeModule,
    classroom: fakeClassroom,
    issueDate: new Date(),
    sequence: 0,
    installments: 12
});

function setup() {
    const enrollmentRepository = new EnrollmentRepositoryInMemory();
    const sut = new GetEnrollment(enrollmentRepository);
    return { sut, enrollmentRepository };
}

describe('Testing get enrollment', () => {
    test('Should get enrollment by code with invoice balance', () => {
        const { enrollmentRepository, sut } = setup();
        enrollmentRepository.add(enrollment);
        const result = sut.execute(enrollment.code);
        expect(result).toHaveProperty('code', enrollment.code);
        expect(result).toHaveProperty('student.name', enrollment.student.name);
        expect(result).toHaveProperty('student.cpf', enrollment.student.cpf);
        expect(result).toHaveProperty('student.birthDate', new Date(enrollment.student.birthDate));
    });
});