import Age from './age';
import Cpf from './cpf';
import Name from './name';

export default class Student {
    readonly name: Name;
    readonly cpf: Cpf;
    readonly birthDate: Date;
    readonly age: Age;

    constructor({ name, cpf, birthDate }: { name: string, cpf: string, birthDate: Date }) {
        this.name = new Name(name);
        this.cpf = new Cpf(cpf);
        this.birthDate = birthDate;
        this.age = new Age(this.birthDate);
    }
}