import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import GetEnrollment from "./get-enrollment";
import PayInvoice from "./pay-invoice";
import PayInvoiceRequestData from "./ports/pay-invoice-request-data";
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
        const requestData: PayInvoiceRequestData = {
            code: enrollment.code.value,
            month: 1,
            year: 2021,
            amount: 1416.66
        };
        sut.execute(requestData);
        const getEnrollmentOutput = getEnrollment.execute({ code: requestData.code });
        expect(getEnrollmentOutput.balance).toBe(originalBalance - requestData.amount);
    });
});