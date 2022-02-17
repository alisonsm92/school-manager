export default class EnrollLevelInputData {
    readonly code: string;
    readonly description: string;

    constructor (inputData: {
        code: string,
        description: string
    }) {
      this.code = inputData.code
      this.description = inputData.description
    }
}
