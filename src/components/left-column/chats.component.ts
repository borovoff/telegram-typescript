import {tdlib} from "../../tdlib";
import {Chat} from "../../models/chat/chat";
import {UpdateChatLastMessage} from "../../models/chat/update-chat-last-message";
import {UpdateChatOrder} from "../../models/chat/update-chat-order";
import {currentChatId} from "../../current-chat-id";
import {ChatComponent} from "./chat.component";
import {currentChat} from "../../current-chat";
import {UpdateChatReadOutbox} from "../../models/chat/update-chat-read-outbox";

export class ChatsComponent extends HTMLElement {
    chats = {};

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
<style>
    :host {
        width: 300px;
        overflow-y: auto;
    }

    .chat {
        padding: 10px;
        display: flex;
        color: white;
    }
    
    .current-chat {
        background-color: rgb(63, 107, 149);
    }
</style>`;


        tdlib.newChat.subscribe((chat: Chat) => this.newChat(chat));
        tdlib.chatLastMessage.subscribe((update: UpdateChatLastMessage) => this.updateChatLastMessage(update));
        tdlib.chatOrder.subscribe((chatOrder: UpdateChatOrder) => this.updateChatOrder(chatOrder));
        tdlib.readOutbox.subscribe(update => this.updateChatReadOutbox(update));
        tdlib.getChats();
    }

    updateChatReadOutbox(update: UpdateChatReadOutbox) {
        const chatComponent = this.chats[update.chat_id] as ChatComponent;
        chatComponent.chat.last_read_outbox_message_id = update.last_read_outbox_message_id;
    }

    newChat(chat: Chat) {
        const chatComponent = new ChatComponent(chat);
        chatComponent.id = chat.id.toString();

        this.chats[chat.id] = chatComponent;
    }

    updateChatLastMessage(update: UpdateChatLastMessage) {
        const chatComponent = this.chats[update.chat_id] as ChatComponent;

        chatComponent.setLastMessage(update.last_message);

        chatComponent.removeEventListener('click', this.eventListener);
        chatComponent.addEventListener('click', this.eventListener);

        if (update.order !== '0') {
            this.updateChatOrder(update);
        }
    }

    eventListener = (ev: MouseEvent) => this.getChatHistory(ev);

    getChatHistory(ev: MouseEvent) {
        const chatComponent = ev.currentTarget as ChatComponent;
        const id = parseInt(chatComponent.id);
        if (currentChatId.value !== id) {
            currentChat.value = chatComponent.chat;

            if (currentChatId.value) {
                const previous = this.chats[currentChatId.value] as ChatComponent;
                previous.classList.remove('current-chat');
            }

            chatComponent.classList.add('current-chat');
            currentChatId.value = id;
            tdlib.getChatHistory(id, chatComponent.lastMessage);
        }
    };

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