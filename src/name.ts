export default class Name {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    isValid() {
        return /^([A-Za-z]+ )+([A-Za-z])+$/.test(this.name);
    }
}