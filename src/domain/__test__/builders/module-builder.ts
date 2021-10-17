import Module from "../../entities/module";

export default class ModuleBuilder {
    build() {
        return new Module({
            level: "EM",
            code: "1",
            description: "1o Ano",
            minimumAge: 15,
            price: 17000
        });
    }
}