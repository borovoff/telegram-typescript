import {TdlibType} from '../tdlib-type';
import {Message} from '../message/message';

export class UpdateChatLastMessage extends TdlibType {
    chat_id: number;
    last_message: Message;
    order: string;
}
