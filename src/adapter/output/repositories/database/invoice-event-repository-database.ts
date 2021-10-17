import Invoice from '../../../../domain/entities/invoice';
import InvoiceEvent, { InvoiceEventTypes } from '../../../../domain/entities/invoiceEvent';
import postgreSQL from "../../../../infra/postgresql";

type InvoiceEventRegister = {
    enrollment: string,
    month: number,
    year: number,
    type: string,
    amount: number
}

const buildInvoice = (row: InvoiceEventRegister) => {
    let eventType: InvoiceEventTypes;
    switch(row.type) {
        case InvoiceEventTypes.INTERESTS:
            eventType = InvoiceEventTypes.INTERESTS;
            break;
        case InvoiceEventTypes.PAYMENT:
            eventType = InvoiceEventTypes.PAYMENT;
            break;
        case InvoiceEventTypes.PENALTY:
            eventType = InvoiceEventTypes.PENALTY;
            break;
        default:
            throw new Error('Event type not mapped');
    }
    return new InvoiceEvent(eventType, Number(row.amount));
}

export default class InvoiceEventRepositoryDatabase {
    private database: typeof postgreSQL;

    constructor() {
        this.database = postgreSQL;
    }

    async findMany(invoice: Invoice) {
        const rows = await this.database.query<InvoiceEventRegister>(`
            SELECT * 
            FROM system.invoice_event
            WHERE enrollment = $1
            AND month = $2
            AND year = $3`, [invoice.code, invoice.month, invoice.year]);
        return rows.map(buildInvoice);
    }

    async add(invoice: Invoice, event: InvoiceEvent) {
        await this.database.query(`
            INSERT INTO system.invoice_event (enrollment, month, year, type, amount)
            VALUES ($1, $2, $3, $4, $5)
            on conflict do nothing;
        `, [
            invoice.code,
            invoice.month,
            invoice.year,
            event.type,
            event.amount
        ]);
    }

    async clean() {
        await this.database.query("DELETE FROM system.invoice_event");
    }
}