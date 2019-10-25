import {Message} from '../../models/message/message';

export class MessageComponent extends HTMLElement {
    private _message: Message;

    constructor(message: Message) {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<style>
    :host {
        position: relative;
    }

    .svg {
        position: absolute;
        left: -10px;
        bottom: -1px;
        z-index: 1000;
    }

    .chat {
        width: 300px;
        border: solid 1px #EEE;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .messages {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
    }

    .message {
        border-radius: 20px;
        padding: 8px 15px;
        margin-top: 5px;
        margin-bottom: 5px;
        display: inline-block;
    }

    .yours {
        align-items: flex-start;
    }

    .yours .message {
        margin-right: 25%;
        background-color: #eee;
        position: relative;
    }

    .yours .message.last:before {
        content: "";
        position: absolute;
        z-index: 0;
        bottom: 0;
        left: -7px;
        height: 20px;
        width: 20px;
        background: #eee;
        border-bottom-right-radius: 15px;
    }

    .yours .message.last:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: -10px;
        width: 10px;
        height: 20px;
        background: white;
        border-bottom-right-radius: 10px;
    }

    .mine {
        align-items: flex-end;
    }

    .mine .message {
        color: white;
        margin-left: 25%;
        background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
        background-attachment: fixed;
        position: relative;
    }

    .my .message:before {
        content: "";
        position: absolute;
        z-index: 0;
        bottom: 0;
        right: -8px;
        height: 20px;
        width: 20px;
        background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
        background-attachment: fixed;
        border-bottom-left-radius: 15px;
    }

    .my .message:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: -10px;
        width: 10px;
        height: 20px;
        background: white;
        border-bottom-left-radius: 10px;
    }
</style>`;

        this._message = message;

        const textEl = document.createElement('div');
        const text = message.content.text;
        if (text) {
            textEl.innerText = text.text;
        }

        this.classList.add('message');
        shadow.appendChild(textEl);
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