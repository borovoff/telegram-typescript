import {Message} from '../../models/message/message';
import {DateHelper} from "../../date-helper";
import {MessageText} from "../../models/message/message-text";

export class MessageComponent extends HTMLElement {
    private _message: Message;
    private span: HTMLElement;
    private checkContainer: HTMLElement;

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

        const floatContainer = document.createElement('div');
        floatContainer.classList.add('float-container');
        textEl.appendChild(floatContainer);

        const date = document.createElement('div');
        date.innerText = DateHelper.getTime(message.date);
        date.classList.add('message-date');
        floatContainer.appendChild(date);

        if (message.is_outgoing) {
            this.checkContainer = document.createElement('div');
            this.checkContainer.classList.add('check-container');

            this.addCheckMark(['check-mark']);

            floatContainer.appendChild(this.checkContainer);
        }

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

    addCheckMark(classes: string[]) {
        const check = document.createElement('span');
        classes.forEach(c => check.classList.add(c));
        this.checkContainer.appendChild(check);
    }

    readOutbox() {
        this.addCheckMark(['check-mark', 'check-mark-received'])
    }

    addClasses(last: boolean, is_outgoing: boolean) {
        const classList = this.classList;
        classList.add(is_outgoing ? 'my' : 'stranger');
        if (last) classList.add('last');
    }
}

customElements.define('tg-message', MessageComponent);