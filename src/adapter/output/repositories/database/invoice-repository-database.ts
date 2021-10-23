import Invoice from '../../../../domain/entities/invoice';
import connectionPool from "../../../../infra/database/connection-pool";
import InvoiceEventRepositoryDatabase from './invoice-event-repository-database';

type InvoiceRegister = {
    enrollment: string,
    month: number,
    year: number,
    due_date: Date,
    amount: number
}

export default class InvoiceRepositoryDatabase {
    private database: typeof connectionPool;
    private invoiceEventsRepository: InvoiceEventRepositoryDatabase;

    constructor() {
        this.database = connectionPool;
        this.invoiceEventsRepository = new InvoiceEventRepositoryDatabase();
    }

    private async buildInvoice(row: InvoiceRegister) {
        const invoice = new Invoice({
            code: row.enrollment,
            month: row.month,
            year: row.year,
            amount: Number(row.amount),
        });
        const events = await this.invoiceEventsRepository.findMany(invoice);
        events.every(invoice.addEvent);
        return invoice;
    }

    async findMany(enrollment: string) {
        const rows = await this.database.query<InvoiceRegister>(`
            SELECT * 
            FROM system.invoice
            WHERE enrollment = $1
            ORDER BY month, year;`, [enrollment]);
        return await Promise.all(rows.map(this.buildInvoice, this));
    }

    async find(enrollment: string, month: number, year: number) {
        const [row] = await this.database.query<InvoiceRegister>(`
            SELECT * 
            FROM system.invoice
            WHERE enrollment = $1
            AND month = $2
            AND year = $3`, [enrollment, month, year]);
        return row ? this.buildInvoice(row) : undefined;
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

    private async addEvents(invoice: Invoice) {
        await Promise.all(
            invoice.events.map((event) => this.invoiceEventsRepository.add(invoice, event), this)
        );
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
        await this.addEvents(invoice);
    }

    async clean() {
        await this.invoiceEventsRepository.clean();
        await this.database.query('DELETE FROM system.invoice');
    }
}