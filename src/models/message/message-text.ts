import {TdlibType} from '../tdlib-type';
import {FormattedText} from './formatted-text';
import {WebPage} from "./web-page";

export class MessageText extends TdlibType {
    text: FormattedText;
    web_page: WebPage;

    constructor(text: FormattedText, type?: string) {
        super(type ? type : 'messageText');

        this.text = text;
    }
}
