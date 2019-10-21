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
                border: 1px solid black;
                border-radius: 16px;
                padding: 5px;
                margin: 5px;
                word-break: break-word;
            }
            
            .stranger {
                align-self: flex-start;
            }
            
            .my {
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
            const messageComponent = new MessageComponent(m);
            messageComponent.classList.add(m.is_outgoing ? 'my' : 'stranger');
            this.messagesContainer.insertBefore(messageComponent, this.messagesContainer.firstChild);

            let width = messageComponent.offsetWidth;
            const maxWidth = 0.78 * this.offsetWidth;

            if (width > maxWidth) {
                const height = messageComponent.offsetHeight;

                while (messageComponent.offsetHeight === height && width > 0) {
                    messageComponent.style.width = --width + 'px';
                }

                messageComponent.style.width = ++width + 'px';
            }
        })
    }
}

customElements.define('tg-messages', MessagesComponent);