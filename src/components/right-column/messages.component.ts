import {tdlib, Tdlib} from "../../tdlib";
import {Messages} from "../../models/message/messages";
import {MessageComponent} from "./message.component";

export class MessagesComponent extends HTMLElement {
    messagesContainer: HTMLElement;

    constructor() {
        super();
        // this.attachShadow({mode: 'open'});
        this.innerHTML = `
        <style>
            .messages {
                display: flex;
                flex-direction: column;
            }
            
            .message {
                max-width: 80%;
                align-self: flex-end;
            }
        </style>`;

        const style = this.style;
        style.overflowY = 'auto';
        style.height = 'calc(100vh - 50px)';
        style.width = '100%';

        this.messagesContainer = document.createElement('div');
        this.messagesContainer.classList.add('messages');
        this.appendChild(this.messagesContainer);

        tdlib.messages.registerListener((messages: Messages) => this.addMessages(messages));
    }

    addMessages(messages: Messages) {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.firstChild.remove();
        }

        messages.messages.forEach(m => {
            const messagesComponent = new MessageComponent(m);

            this.messagesContainer.insertBefore(messagesComponent, this.messagesContainer.firstChild);
        })
    }
}

customElements.define('tg-messages', MessagesComponent);