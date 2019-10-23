import {tdlib} from "../../tdlib";
import {Messages} from "../../models/message/messages";
import {MessageComponent} from "./message.component";
import {UpdateChatLastMessage} from "../../models/chat/update-chat-last-message";
import {currentChatId} from "../../current-chat-id";

export class MessagesComponent extends HTMLElement {
    messagesContainer: HTMLElement;
    messages = new Map<number, MessageComponent>([]);

    constructor() {
        super();
        // this.attachShadow({mode: 'open'});
        this.innerHTML = `
        <style>
            .messages {
                display: flex;
                flex-direction: column;
                margin: 5px;
            }
            
            .message {
                max-width: 80%;
                border-radius: 20px;
                background-color: blue;
                color: white;
                padding: 10px 16px;
                margin: 2px;
                word-break: break-word;
            }
            
            .stranger {
                align-self: flex-start;
            }
            
            .my {
                align-self: flex-end;
            }
            
            .my.last:before, .my.last:after {
                content: "";
                position: absolute;
                bottom: 0;
                height: 20px;
            }

            .my.last:before {
                z-index: 0;
                right: -8px;
                width: 20px;
                background: blue;
                border-bottom-left-radius: 15px;
            }

            .my.last:after {
                z-index: 1;
                right: -10px;
                width: 10px;
                background: white;
                border-bottom-left-radius: 10px;
            }

            .stranger.last:before, .stranger.last:after {
                content: "";
                position: absolute;
                bottom: 0;
                height: 20px;
            }

            .stranger.last:before {
                z-index: 0;
                left: -7px;
                width: 20px;
                background: blue;
                border-bottom-right-radius: 15px;
            }

            .stranger.last:after {
                z-index: 1;
                left: -10px;
                width: 10px;
                background: white;
                border-bottom-right-radius: 10px;
            }
        </style>`;

        const style = this.style;
        style.overflowY = 'auto';
        style.height = 'calc(100vh - 50px)';
        style.width = '100%';

        this.messagesContainer = document.createElement('div');
        this.messagesContainer.classList.add('messages');
        this.appendChild(this.messagesContainer);

        tdlib.messages.subscribe((messages: Messages) => this.addMessages(messages));
        tdlib.chatLastMessage.subscribe((update: UpdateChatLastMessage) => this.updateChatLastMessage(update));
    }

    addMessages(messages: Messages) {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.firstChild.remove();
        }

        let last = true;
        messages.messages.forEach((m, i) => {
            const messageComponent = new MessageComponent(m);

            messageComponent.addClasses(last, m.is_outgoing);
            this.messagesContainer.insertBefore(messageComponent, this.messagesContainer.firstChild);

            const next = ++i;
            if (next < messages.total_count) last = m.is_outgoing !== messages.messages[next].is_outgoing;

            this.minimizeWidth(messageComponent);

            this.messages.set(m.id, messageComponent);
        })
    }

    minimizeWidth(messageComponent: MessageComponent) {
        let width = messageComponent.offsetWidth;
        const maxWidth = 0.78 * this.offsetWidth;

        if (width > maxWidth) {
            const height = messageComponent.offsetHeight;

            while (messageComponent.offsetHeight === height && width > 0) {
                messageComponent.style.width = --width + 'px';
            }

            messageComponent.style.width = ++width + 'px';
        }
    }

    updateChatLastMessage(update: UpdateChatLastMessage) {
        if (update.chat_id === currentChatId.value) {
            const m = update.last_message;
            const messageComponent = new MessageComponent(m);
            const messageComponents = Array.from(this.messages.values());
            const previous = messageComponents[0] as MessageComponent;

            messageComponent.addClasses(true, m.is_outgoing);
            if (m.is_outgoing === previous.message.is_outgoing) previous.classList.remove('last');

            messageComponents.unshift(messageComponent);

            this.messagesContainer.appendChild(messageComponent);
        }
    }
}

customElements.define('tg-messages', MessagesComponent);