export default class RegisterLevelInputData {
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
