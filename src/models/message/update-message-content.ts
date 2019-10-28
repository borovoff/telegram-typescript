import {TdlibType} from "../tdlib-type";
import {MessageText} from "./message-text";

export class UpdateMessageContent extends TdlibType {
    chat_id: number;
    message_id: number;
    new_content: MessageText;
}
