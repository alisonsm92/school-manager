import Age from './age';
import Cpf from './cpf';
import Name from './name';

export default class Student {
    readonly name: string;
    readonly cpf: string;
    readonly birthDate: Date;
    readonly age: Number;

    constructor({ name, cpf, birthDate }: { name: string, cpf: string, birthDate: Date }) {
        this.name = new Name(name).value;
        this.cpf = new Cpf(cpf).value;
        this.birthDate = birthDate;
        this.age = new Age(this.birthDate).value;
    }
}