import {Message} from '../../models/message/message';
import {DateHelper} from "../../date-helper";

export class MessageComponent extends HTMLElement {
    private _message: Message;

    constructor(message: Message) {
        super();
        this.innerHTML = `<style>
</style>`;
        this._message = message;

        const textEl = document.createElement('div');
        const text = message.content.text;
        if (text) {
            textEl.innerText = text.text;
        }
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

    addClasses(last: boolean, is_outgoing: boolean) {
        const classList = this.classList;
        classList.add(is_outgoing ? 'my' : 'stranger');
        if (last) classList.add('last');
    }
}

customElements.define('tg-message', MessageComponent);