import {TdlibType} from "../tdlib-type";

export class ReadFile extends TdlibType {
    file_id: number;

    constructor(file_id: number) {
        super('readFile');

        this.file_id = file_id;
    }
}
