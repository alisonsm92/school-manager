import EnrollmentCode from "../../entities/enrollment-code";

interface GetEnrollmentRequestData {
    code: EnrollmentCode['value']
}

export default GetEnrollmentRequestData;