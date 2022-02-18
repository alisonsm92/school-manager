export default class RegisterClassroomInputData {
    readonly level: string;
    readonly module: string;
    readonly code: string;
    readonly capacity: number;
    readonly startDate: Date;
    readonly endDate: Date;

    constructor (inputData: {
        level: string,
        module: string,
        code: string,
        capacity: number,
        startDate: string,
        endDate: string
    }) {
      this.level = inputData.level
      this.module = inputData.module
      this.code = inputData.code
      this.capacity = inputData.capacity
      this.startDate = new Date(inputData.startDate)
      this.endDate = new Date(inputData.endDate)
    }
}
