import Cpf from "./cpf";
import Name from "./name";

export default class Student {
    readonly name: string;
    readonly cpf: string;
    readonly birthDate: Date;

    constructor(name: string, cpf: string, birthDate: string) {
        this.name = new Name(name).value;
        this.cpf = new Cpf(cpf).value;
        this.birthDate = new Date(birthDate);
    }
}