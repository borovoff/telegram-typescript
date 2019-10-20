import {TdlibType} from "../tdlib-type";

export class DownloadFile extends TdlibType {
    file_id: number;
    priority: number;

    constructor(file_id: number, priority: number = 1) {
        super('downloadFile');

        this.file_id = file_id;
        this.priority = priority;
    }
}
