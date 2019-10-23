import {TdlibType} from "../tdlib-type";

export class GetChatHistory extends TdlibType {
    chat_id: number;
    from_message_id: number;
    offset: number;
    limit: number;
    only_local: boolean;

    constructor(chat_id: number, from_message_id: number, limit: number = 20, offset: number = 0, only_local: boolean = false) {
        super('getChatHistory');

        this.chat_id = chat_id;
        this.from_message_id = from_message_id;
        this.offset = offset;
        this.limit = limit;
        this.only_local = only_local;
    }
}
