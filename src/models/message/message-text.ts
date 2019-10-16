import {TdlibType} from '../tdlib-type';
import {FormattedText} from './formatted-text';

export class MessageText extends TdlibType {
    text: FormattedText;

    constructor(text: FormattedText, type?: string) {
        super(type ? type : 'messageText');

        this.text = text;
    }
}
