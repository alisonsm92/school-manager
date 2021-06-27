import InvalidNameError from '../errors/invalid-name';

export default class Name {
    readonly value: string;

    constructor(value: string) {
        if(!this.isValid(value)) throw new InvalidNameError();
        this.value = value;
    }

    private isValid(value: string) {
        return /^([A-Za-z]+ )+([A-Za-z])+$/.test(value);
    }
}