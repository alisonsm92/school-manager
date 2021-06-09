import Cpf from "./cpf";
import Name from "./name";

export default class Student {
    readonly name: string;
    readonly cpf: string;

    constructor(name: string, cpf: string) {
        this.name = new Name(name).value;
        this.cpf = new Cpf(cpf).value;
    }
}