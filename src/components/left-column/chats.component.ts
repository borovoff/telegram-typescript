import {tdlib} from "../../tdlib";
import {Chat} from "../../models/chat/chat";
import {UpdateChatLastMessage} from "../../models/chat/update-chat-last-message";
import {UpdateChatOrder} from "../../models/chat/update-chat-order";
import {currentChatId} from "../../current-chat-id";
import {ChatComponent} from "./chat.component";

export class ChatsComponent extends HTMLElement {
    chats = {};

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
        :host {
                width: 300px;
                overflow-y: auto;
        }`;

        this.shadowRoot.appendChild(style);

        tdlib.newChat.registerListener((chat: Chat) => this.newChat(chat));
        tdlib.chatLastMessage.registerListener((update: UpdateChatLastMessage) => this.updateChatLastMessage(update));
        tdlib.chatOrder.registerListener((chatOrder: UpdateChatOrder) => this.updateChatOrder(chatOrder));
        tdlib.getChats();
    }

    newChat(chat: Chat) {
        const chatComponent = new ChatComponent(chat);
        chatComponent.id = chat.id.toString();

        this.chats[chat.id] = chatComponent;
    }

    updateChatLastMessage(update: UpdateChatLastMessage) {
        const chatComponent = this.chats[update.chat_id];

        chatComponent.setLastMessage(update.last_message);

        chatComponent.addEventListener('click', () => {
            const id = parseInt(chatComponent.id);
            if (currentChatId.value !== id) {
                currentChatId.value = id;
                tdlib.getChatHistory(id, update.last_message.id);
            }
        });

        if (update.order !== '0') {
            this.updateChatOrder(update);
        }
    }

    updateChatOrder(chatOrder: UpdateChatOrder | UpdateChatLastMessage) {
        let chatElement = this.shadowRoot.getElementById(chatOrder.chat_id.toString()) as ChatComponent;

        if (chatElement) {
            this.shadowRoot.insertBefore(chatElement, this.shadowRoot.firstChild);
        } else {
            this.shadowRoot.appendChild(this.chats[chatOrder.chat_id]);
        }
    }
}

customElements.define('tg-chats', ChatsComponent);