import {Message} from "../../models/message/message";

export class MessageComponent extends HTMLElement {
    constructor(message: Message) {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const textEl = document.createElement('div');
        const text = message.content.text;
        if (text) {
            textEl.innerText = text.text;
        }

        this.classList.add('message');
        shadow.appendChild(textEl);
    }
}

customElements.define('tg-message', MessageComponent);