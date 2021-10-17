import Invoice from "../entities/invoice";

interface InvoiceRepository {
    find(enrollment: string, month: number, year: number): Promise<Invoice|undefined>
    add(invoice: Invoice): Promise<void>
    update(invoice: Invoice): Promise<void>
    clean(): Promise<void>
}

export default InvoiceRepository;