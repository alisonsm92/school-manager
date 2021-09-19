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

    static today() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }
}