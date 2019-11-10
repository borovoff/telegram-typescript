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

        this.classList.add('chats');
        this.css();

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
        let chatElement = document.getElementById(chatOrder.chat_id.toString()) as ChatComponent;

        if (chatElement) {
            this.insertBefore(chatElement, this.firstChild);
        } else {
            this.appendChild(this.chats[chatOrder.chat_id]);
        }
    }

    css() {
        this.innerHTML = `
<style>
    .chats {
        width: 300px;
        height: calc(100% - 50px);
        overflow-y: auto;
    }

    .chat {
        padding: 10px;
        display: flex;
        color: black;
    }
    
    .current-chat {
        background-color: rgb(244, 244, 245);
    }

    .chat-image, .letter-circle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        color: white;
    }

    .letter-circle {
        text-align: center;
        line-height: 52px;
        font-size: 20px;
    }

    .chat-text {
        position: relative;
        margin-left: 10px;
        width: 200px;
    }

    .chat-top, .chat-bottom {
        position: absolute;
        display: flex;
        width: 200px;
    }
    
    .chat-top {
        left: 0;
        top: 0;
    }

    .chat-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .chat-read {
        white-space: nowrap;
        color: rgb(95, 99, 105);
    }

    .chat-message {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        color: rgb(112, 117, 121);
    }
    
    .chat-bottom {
        left: 0;
        bottom: 0;
        display: flex;
        width: 200px;
    }
    
    .chat-counter {
        background-color: rgb(83, 203, 99);
        color: white;
        padding: 5px 10px;
        border-radius: 18px;
    }
</style>`;
    }
}

customElements.define('tg-chats', ChatsComponent);