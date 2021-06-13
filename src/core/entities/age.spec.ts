import Age from "./age";

function mockDate() {
    Date.now = jest.fn(() => new Date(Date.UTC(2021, 6, 13)).valueOf());
}

describe('Testing Age', () => {
    beforeEach(() => mockDate());

    test('Should return the current age with the birth date provided', () => {
        const birthDate = new Date('08-28-1992');
        const age = new Age(birthDate);
        expect(age.value).toBe(28);
    });
});