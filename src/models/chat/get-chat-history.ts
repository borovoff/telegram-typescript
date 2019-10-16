import {TdlibType} from "../tdlib-type";

export class GetChatHistory extends TdlibType {
    chat_id: number;
    from_message_id: number;
    offset: number;
    limit: number;

    constructor(chat_id: number, from_message_id: number, limit: number = 10, offset?: number) {
        super('getChatHistory');

        this.chat_id = chat_id;
        this.from_message_id = from_message_id;
        this.offset = offset;
        this.limit = limit;
    }
}
