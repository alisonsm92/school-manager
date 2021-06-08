export default class InvalidCpfError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCpfError';
    }
}