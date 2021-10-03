import Student from "../entities/student";

export default class StudentBuilder {
    build() {
        return new Student({
            name: 'Maria Carolina Fonseca',
            cpf: '755.525.774-26',
            birthDate: new Date('2002-03-12')
        });
    }
}