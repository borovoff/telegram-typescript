import {MessageText} from "./message-text";
import {FormattedText} from "./formatted-text";

export class InputMessageText extends MessageText {
    disable_web_page_preview: boolean;
    clear_draft: boolean;
    text: FormattedText;

    constructor(text: FormattedText, disable_web_page_preview: boolean = true, clear_draft: boolean = false) {
        super(text, 'inputMessageText');

        this.disable_web_page_preview = disable_web_page_preview;
        this.clear_draft = clear_draft;
        this.text = text;
    }
}