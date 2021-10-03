import EnrollmentCode from "../entities/enrollment-code";

interface CancelEnrollmentInputData {
    code: EnrollmentCode['value'];
}

export default CancelEnrollmentInputData;