import Invoice from '../../../../domain/entities/invoice';
import InvoiceRepository from '../../../../domain/repositories/invoice-repository';
import postgreSQL from "../../../../infra/postgresql";

type InvoiceRegister = {
    enrollment: string,
    month: number,
    year: number,
    due_date: Date,
    amount: number
}

export default class InvoiceRepositoryDatabase implements InvoiceRepository {
    private database: typeof postgreSQL;

    constructor() {
        this.database = postgreSQL;
    }

    async find(enrollment: string, month: number, year: number) {
        const [row] = await this.database.query<InvoiceRegister>(`
            SELECT * 
            FROM system.invoice
            WHERE enrollment = $1
            AND month = $2
            AND year = $3`, [enrollment, month, year]);
        return row ? new Invoice({
            code: row.enrollment,
            month: row.month,
            year: row.year,
            amount: Number(row.amount),
        }) : undefined;
    }

    async add(invoice: Invoice) {
        await this.database.query(`
            INSERT INTO system.invoice (enrollment, month, year, due_date, amount)
            VALUES ($1, $2, $3, $4, $5);
        `, [
            invoice.code,
            invoice.month,
            invoice.year,
            invoice.dueDate,
            invoice.amount
        ]);
    }

    async update(invoice: Invoice) {
        await this.database.query(`
            UPDATE system.invoice
            SET enrollment = $1, month = $2, year = $3, due_date = $4, amount = $5
            WHERE enrollment = $1
            AND month = $2
            AND year = $3
        `, [
            invoice.code,
            invoice.month,
            invoice.year,
            invoice.dueDate,
            invoice.amount
        ]);
    }

    async clean() {
        await this.database.query('DELETE FROM system.invoice');
    }
}