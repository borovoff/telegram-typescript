import {TdlibType} from "../tdlib-type";
import {FormattedText} from "./formatted-text";
import {Document} from "./document";

export class MessageDocument extends TdlibType {
    caption: FormattedText;
    document: Document;
}
