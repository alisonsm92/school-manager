export default class Currency {
    value: number;

    constructor(amount: number) {
        this.value = amount;
    }

    getFractional() {
        return this.value * 100;
    }

    roundUp() {
        this.value = Math.ceil(this.getFractional()) / 100;
    }

    truncate() {
        this.value = Math.trunc(this.getFractional()) / 100;
    }
}