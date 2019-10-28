import {TdlibType} from "../tdlib-type";
import {Message} from "./message";

export class UpdateMessageSendSucceeded extends TdlibType {
    message: Message;
    old_message_id: number;
}
