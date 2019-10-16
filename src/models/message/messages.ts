import {TdlibType} from "../tdlib-type";
import {Message} from "./message";

export class Messages extends TdlibType {
    messages: Message[];
    total_count: number;
}
