import EnrollmentCode from "../../entities/enrollment-code";

interface GetEnrollmentInputData {
    code: EnrollmentCode['value']
    currentDate: Date
}

export default GetEnrollmentInputData;