import {TdlibType} from '../tdlib-type';

export class UpdateChatReadInbox extends TdlibType {
    chat_id: number;
    last_read_inbox_message_id: number;
    unread_count: number;
}
