export default class Cpf {
    private readonly digits: string;

    constructor(cpf: string) {
        this.digits = Cpf.extractDigits(cpf);
    }

    private static extractDigits(cpf: string) {
        return cpf.replace(/\D/g, '');
    }

    isValid() {
        var Soma;
        var Resto;
        Soma = 0;
        if (this.digits == "00000000000") return false;

        this.digits // ?

        for (let i=1; i<=9; i++) Soma = Soma + parseInt(this.digits.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(this.digits.substring(9, 10)) ) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(this.digits.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(this.digits.substring(10, 11) ) ) return false;
        return true;
    }
}