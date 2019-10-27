export class DateHelper {
    static getTime(timestamp: number) {
        const date = new Date(1000 * timestamp);
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();

        return hours + ':' + minutes.substr(-2);
    }
}