import {TdlibType} from "../tdlib-type";
import {InputMessageText} from "./input-message-text";

export class SendMessage extends TdlibType {
    chat_id: number;
    reply_to_message_id: number;
    disable_notification: boolean;
    from_background: boolean;
    reply_markup: any;
    input_message_content: InputMessageText;

    constructor(chat_id: number, input_message_content: InputMessageText, reply_to_message_id: number = 0, disable_notification: boolean = false,
                from_background: boolean = false, reply_markup: any = null) {
        super('sendMessage');

        this.chat_id = chat_id;
        this.reply_to_message_id = reply_to_message_id;
        this.disable_notification = disable_notification;
        this.from_background = from_background;
        this.reply_markup = reply_markup;
        this.input_message_content = input_message_content;
    }
}