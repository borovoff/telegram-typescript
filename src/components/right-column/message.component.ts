import {Message} from '../../models/message/message';
import {DateHelper} from "../../date-helper";
import {MessageText} from "../../models/message/message-text";

export class MessageComponent extends HTMLElement {
    private _message: Message;
    private span: HTMLElement;

    constructor(message: Message) {
        super();
        this.innerHTML = `<style>
</style>`;
        this._message = message;

        const textEl = document.createElement('div');
        const text = message.content.text;
        this.span = document.createElement('span');
        if (text) {
            this.span.innerText = text.text;
        }
        textEl.appendChild(this.span);
        textEl.classList.add('message-text');

        const date = document.createElement('div');
        date.innerText = DateHelper.getTime(message.date);
        date.classList.add('message-date');
        textEl.appendChild(date);

        this.classList.add('message');
        this.appendChild(textEl);
    }

    get message(): Message {
        return this._message;
    }

    set messageId(id: number) {
        this._message.id = id;
    }

    updateMessageContent(newContent: MessageText) {
        const text = newContent.text;
        if (text) {
            this.span.innerText = text.text;
        }
    }

    addClasses(last: boolean, is_outgoing: boolean) {
        const classList = this.classList;
        classList.add(is_outgoing ? 'my' : 'stranger');
        if (last) classList.add('last');
    }
}

customElements.define('tg-message', MessageComponent);