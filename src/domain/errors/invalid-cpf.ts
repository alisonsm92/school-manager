export default class InvalidCpfError extends Error {
    constructor(message = 'Invalid cpf') {
        super(message);
        this.name = 'InvalidCpfError';
    }
}