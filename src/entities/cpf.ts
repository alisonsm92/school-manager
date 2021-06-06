export default class Cpf {
    private readonly digits: string;
    private readonly FIRST_DIGIT_FACTOR = 10;
    private readonly SECOND_DIGIT_FACTOR = 11;

    constructor(cpf: string) {
        this.digits = Cpf.extractDigits(cpf);
    }

    private static extractDigits(cpf: string): string {
        return cpf.replace(/\D/g, '');
    }

    isValid() {
        if (this.isBlockedCpf()) return false;

        const [firstCheckDigit, secondCheckDigit] = this.getCheckDigits();

        const firstDigitCalculated = this.calculateCheckDigit(this.FIRST_DIGIT_FACTOR);
        if (firstDigitCalculated != firstCheckDigit) return false;

        const secondDigitCalculated = this.calculateCheckDigit(this.SECOND_DIGIT_FACTOR);
        if (secondDigitCalculated != secondCheckDigit) return false;

        return true;
    }

    private isBlockedCpf(): boolean {
        const [firstDigit] = this.digits;
        return this.digits.split('').every(digit => digit === firstDigit);
    }

    private calculateCheckDigit(factor: number) :number {
        const digitsToConsider = factor - 1;
        const digitsArray = this.getNumberDigitsArray(0, digitsToConsider);
        const sum = digitsArray.reduce((sum, digit, index) => sum + digit * (factor - index), 0);
        const checkDigit = (sum * 10) % 11;
        if(checkDigit === 10 || checkDigit === 11) return 0;
        
        return checkDigit;
    }

    private getNumberDigitsArray(init = 0, end = 11) {
        return this.digits
            .slice(init, end)
            .split('')
            .map(digit => parseInt(digit));
    }

    private getCheckDigits() {
        return this.getNumberDigitsArray(9);
    }
}