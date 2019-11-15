import {BaseHTMLElement} from "../base-html-element";
import {tdlib} from "../../tdlib";
import {currentChat} from "../../current-chat";

export class InputComponent extends BaseHTMLElement {
    constructor() {
        super();

        this.hide();
        currentChat.subscribe(() => this.show());

        const form = document.createElement('form');
        const input = document.createElement('input');
        form.appendChild(input);
        input.type = 'text';

        this.appendChild(form);

        form.addEventListener('submit', (ev: Event) => {
            ev.preventDefault();
            tdlib.sendMessage(input.value);
            input.value = '';
        })
    }
}

customElements.define('tg-input', InputComponent);