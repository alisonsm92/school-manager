import InvalidCpfError from '../errors/invalid-cpf';

export default class Cpf {
    readonly value: string;
    private readonly FIRST_DIGIT_FACTOR = 10;
    private readonly SECOND_DIGIT_FACTOR = 11;

    constructor(value: string) {
        if(!this.isValid(value)) throw new InvalidCpfError();
        this.value = value;
    }

    private isValid(cpf: string) {
        const digits = this.extractDigits(cpf);
        if (this.isBlockedCpf(digits)) return false;

        const [firstCheckDigit, secondCheckDigit] = this.extractCheckDigits(digits);

        const firstDigitCalculated = this.calculateCheckDigit(digits, this.FIRST_DIGIT_FACTOR);
        if (firstDigitCalculated != firstCheckDigit) return false;

        const secondDigitCalculated = this.calculateCheckDigit(digits, this.SECOND_DIGIT_FACTOR);
        if (secondDigitCalculated != secondCheckDigit) return false;

        return true;
    }

    private extractDigits(cpf: string): string {
        return cpf.replace(/\D/g, '');
    }

    private isBlockedCpf(digits: string): boolean {
        const [firstDigit] = digits;
        return digits.split('').every(digit => digit === firstDigit);
    }

    private extractCheckDigits(digits: string) {
        return this.getNumberDigitsArray(digits, 9);
    }

    private getNumberDigitsArray(digits: string, init = 0, end = 11) {
        return digits
            .slice(init, end)
            .split('')
            .map(digit => parseInt(digit));
    }

    private calculateCheckDigit(digits: string, factor: number) :number {
        const init = 0;
        const end = factor - 1;
        const digitsArray = this.getNumberDigitsArray(digits, init, end);
        const sum = digitsArray.reduce((sum, digit, index) => sum + digit * (factor - index), 0);
        const checkDigit = (sum * 10) % 11;
        if(checkDigit === 10 || checkDigit === 11) return 0;
        
        return checkDigit;
    }
}