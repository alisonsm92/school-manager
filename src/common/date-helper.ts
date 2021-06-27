export default class DateHelper {
    static getDateAfter({ days }: { days: number }) {
        const date = new Date();
        const calculatedDate = date.getDate() + days;
        date.setDate(calculatedDate);
        return date;
    }
    
    static getDateBefore({ days }: { days: number }) {
        const date = new Date();
        const calculatedDate = date.getDate() - days;
        date.setDate(calculatedDate);
        return date;
    }
    
    static getDateString(date: Date) {
        return `${date.getUTCFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
}