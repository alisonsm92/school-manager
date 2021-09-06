import EnrollmentCode from "../../entities/enrollment-code";

type CancelEnrollmentRequestData = {
    code: EnrollmentCode['value'];
}

export default CancelEnrollmentRequestData;