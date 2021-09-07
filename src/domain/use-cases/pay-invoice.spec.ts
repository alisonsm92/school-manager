import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import GetEnrollment from "./get-enrollment";
import PayInvoice from "./pay-invoice";
import PayInvoiceInputData from "./ports/pay-invoice-input-data";
import EnrollmentBuilder from "./__test__/enrollment-builder";

describe('Testing pay invoice', () => {
    function setup() {
        const enrollmentRepository = new EnrollmentRepositoryInMemory();
        const getEnrollment = new GetEnrollment(enrollmentRepository);
        const sut = new PayInvoice(enrollmentRepository);
        return { sut, getEnrollment, enrollmentRepository };
    }

    test('Should pay enrollment invoice', () => {
        const { sut, getEnrollment, enrollmentRepository } = setup();
        const enrollment = new EnrollmentBuilder().build();
        enrollmentRepository.add(enrollment);
        const originalBalance =  enrollment.balance;
        const inputData: PayInvoiceInputData = {
            code: enrollment.code.value,
            month: 1,
            year: 2021,
            amount: 1416.66
        };
        sut.execute(inputData);
        const getEnrollmentOutput = getEnrollment.execute({ code: inputData.code });
        expect(getEnrollmentOutput.balance).toBe(originalBalance - inputData.amount);
    });
});