import {TdlibType} from '../tdlib-type';

export class UpdateChatReadOutbox extends TdlibType {
    chat_id: number;
    last_read_outbox_message_id: number;
}
