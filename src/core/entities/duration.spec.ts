import Duration from "./duration";

describe('Testing duration', () => {
    describe('GetPercentCompleteUntil method', () => {
        test('Should return 0 when the date provide is before start date', () => {
            const start = new Date('2021-06-01');
            const end = new Date('2021-07-01');
            const dateBeforeStart = new Date('2021-05-31');
            const sut = new Duration(start, end);
            expect(sut.getPercentCompleteUntil(dateBeforeStart)).toBe(0);
        });

        test('Should return 100 when the date provide is after start date', () => {
            const start = new Date('2021-06-01');
            const end = new Date('2021-07-01');
            const dateAfterStart = new Date('2021-07-02');
            const sut = new Duration(start, end);
            expect(sut.getPercentCompleteUntil(dateAfterStart)).toBe(100);
        });

        test('Should return 50 when until the date provided is half the duration', () => {
            const start = new Date('2021-06-01');
            const end = new Date('2021-07-01');
            const dateAfterStart = new Date('2021-06-16');
            const sut = new Duration(start, end);
            expect(sut.getPercentCompleteUntil(dateAfterStart)).toBe(50);
        });
    });
});