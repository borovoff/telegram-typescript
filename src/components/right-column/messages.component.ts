import {tdlib, Tdlib} from "../../tdlib";
import {Messages} from "../../models/message/messages";

export class MessagesComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                overflow-y: auto;
                height: calc(100vh - 50px);
            }
        </style><slot></slot>`;

        tdlib.messages.registerListener((messages: Messages) => this.addMessages(messages));
    }

    addMessages(messages: Messages) {
        messages.messages.forEach(m => {
            const messageElement = document.createElement('div');
            messageElement.innerText = m.content.text.text;
            this.shadowRoot.insertBefore(messageElement, this.shadowRoot.firstChild);
        })
    }
}

customElements.define('tg-messages', MessagesComponent);