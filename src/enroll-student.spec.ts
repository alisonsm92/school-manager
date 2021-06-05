import EnrollStudent from "./enroll-student";
import EnrollmentRequest from "./enrollment-request";

describe('Testing enroll student', () => {
    test('Should fullfil successfully when provide a valid name', () => {
        const enrollmentRequest: EnrollmentRequest = { student: { name: "Ana Clara" } };
        const sut = new EnrollStudent();
        expect(sut.execute(enrollmentRequest)).toBeTruthy();
    });
    
    test('Should not enroll without valid student name', () => {
        const enrollmentRequest: EnrollmentRequest = { student: { name: "Ana" } };
        const error = new Error("Invalid student name");
        const sut = new EnrollStudent();
        expect(() => sut.execute(enrollmentRequest)).toThrow(error);
    });
});