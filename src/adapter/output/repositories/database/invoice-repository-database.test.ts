import Invoice from '../../../../domain/entities/invoice';
import postgresql from '../../../../infra/postgresql';
import InvoiceRepositoryDatabase from './invoice-repository-database';

const inputData = {
    code: '2021EM1A0001',
    month: 7,
    year: 2021,
    amount: 100
};

let sut: InvoiceRepositoryDatabase;

beforeEach(() => {
    sut = new InvoiceRepositoryDatabase();
});

afterEach(async () => {
    await sut.clean();
});

afterAll(async () => {
    await postgresql.end();
});

describe('Testing InvoiceRepositoryDatabase', () => {
    describe('Find and Add method', () => {
        test('Should return the invoice with code provided when it exists', async () => {
            await sut.add(new Invoice(inputData));
            const invoice = await sut.find(inputData.code, inputData.month, inputData.year);
            expect(invoice).toHaveProperty('code', inputData.code);
            expect(invoice).toHaveProperty('month', inputData.month);
            expect(invoice).toHaveProperty('year', inputData.year);
            expect(invoice).toHaveProperty('amount', inputData.amount);
        });

        test('Should return undefined when the invoice it is not exists', async () => {
            const invoice = await sut.find(inputData.code, inputData.month, inputData.year);
            expect(invoice).toBeUndefined();
        });
    });

    describe('Update method', () => {
        it('Should return the invoice with the data updated', async () => {
            await sut.add(new Invoice(inputData));
            inputData.amount = 101;
            await sut.update(new Invoice(inputData));
            const invoice = await sut.find(inputData.code, inputData.month, inputData.year);
            expect(invoice?.amount).toBe(101);
        });
    });

    describe('Clean method', () => {
        test('Should not found the register added', async () => {
            await sut.add(new Invoice(inputData));
            await sut.clean();
            const module = await sut.find(inputData.code, inputData.month, inputData.year);
            expect(module).toBeUndefined();
        });
    });
});