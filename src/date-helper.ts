import {WeekDay} from "./models/interface/week-day";
import {Month} from "./models/interface/month";

export class DateHelper {
    static getTime(timestamp: number): string {
        const date = new Date(1000 * timestamp);
        const now = new Date();
        const nowTimestamp = now.getTime() / 1000;

        const delta = nowTimestamp - timestamp;

        if (delta > 0) {
            const hour = 60 * 60;
            const day = 24 * hour;
            const week = 7 * day;

            if (delta < day) {
                const hours = date.getHours();
                const minutes = '0' + date.getMinutes();

                return hours + ':' + minutes.substr(-2);
            } else if (delta >= day && delta < week) {
                const weekDay = date.getDay();

                return WeekDay[weekDay];
            } else {
                const d = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();

                if (now.getFullYear() === year) {
                    return d + ' ' + Month[month];
                } else {
                    return d + '/' + month + '/' + year;
                }
            }
        }

        return '';
    }
}