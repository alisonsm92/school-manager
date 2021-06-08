export default class InvalidNameError extends Error {
    constructor(message = 'Invalid name') {
        super(message);
        this.name = 'InvalidNameError';
    }
}