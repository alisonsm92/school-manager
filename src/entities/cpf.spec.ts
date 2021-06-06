import Cpf from "./cpf";

describe('Testing CPF validation', () => {
    test('Should return true when CPF is valid', () => {
        const cpf = new Cpf('123.456.789-09');
        expect(cpf.isValid()).toBeTruthy();
    });

    test('Should return false when CPF is invalid', () => {
        const cpf = new Cpf('123.456.789-99');
        expect(cpf.isValid()).toBeFalsy();
    });

    test('Should return false when CPF contains only digits zero', () => {
        const cpf = new Cpf('000.000.000-00');
        expect(cpf.isValid()).toBeFalsy();
    });

    test('Should return false when CPF contains less than 11 digits', () => {
        const cpf = new Cpf('123.456.789-0');
        expect(cpf.isValid()).toBeFalsy();
    });
});