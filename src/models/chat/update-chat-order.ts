import {TdlibType} from "../tdlib-type";

export class UpdateChatOrder extends TdlibType {
    chat_id: number;
    order: string;
}
