export default class RegisterModuleInputData {
    readonly level: string;
    readonly code: string;
    readonly description: string;
    readonly minimumAge: number;
    readonly price: number;

    constructor (inputData: {
        level: string,
        code: string,
        description: string,
        minimumAge: number
        price: number
    }) {
      this.level = inputData.level
      this.code = inputData.code
      this.description = inputData.description
      this.minimumAge = inputData.minimumAge
      this.price = inputData.price
    }
}
