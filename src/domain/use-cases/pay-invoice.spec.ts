import EnrollmentRepositoryInMemory from "../../infra/repositories/enrollment-repository-in-memory";
import GetEnrollment from "./get-enrollment";
import PayInvoice from "./pay-invoice";
import EnrollmentRepository from "./ports/enrollment-repository";
import PayInvoiceInputData from "./ports/pay-invoice-input-data";
import EnrollmentBuilder from "./__test__/enrollment-builder";

let enrollmentRepository: EnrollmentRepository;
let getEnrollment: GetEnrollment;
let sut: PayInvoice;

beforeEach(function() {
    enrollmentRepository = new EnrollmentRepositoryInMemory();
    getEnrollment = new GetEnrollment(enrollmentRepository);
    sut = new PayInvoice(enrollmentRepository);
});

describe('Testing pay invoice', () => {
    test('Should pay enrollment invoice', () => {
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