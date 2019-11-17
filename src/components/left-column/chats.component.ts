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
        width: 420px;
        height: 100%;
        overflow-y: auto;
    }

    .chat {
        margin: 2px 2px 2px 8px;
        padding: 8px 12px 8px 8px;
        display: flex;
        color: black;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
    }
    
    @-moz-document url-prefix() {
        .chat {
            margin-right: 8px;
        }
    }
    
    .chat:hover {
        background-color: rgb(241, 243, 244);
    }
    
    .current-chat {
        background-color: rgb(244, 244, 245);
    }

    .chat-image, .letter-circle {
        height: 54px;
        width: 54px;
        border-radius: 50%;
        color: white;
    }

    .letter-circle {
        text-align: center;
        line-height: 54px;
        font-size: 20px;
    }

    .chat-text {
        position: relative;
        margin-left: 10px;
        width: 320px;
    }

    .chat-top, .chat-bottom {
        position: absolute;
        display: flex;
        width: 100%;
    }
    
    .chat-top {
        left: 0;
        top: 6px;
        align-items: center;
        height: 20px;
    }

    .chat-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        font-weight: bold;
    }

    .chat-read {
        white-space: nowrap;
        color: rgb(95, 99, 105);
        font-size: 12px;
    }

    .chat-message {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        color: rgb(112, 117, 121);
        align-self: flex-start;
        height: 20px;
    }
    
    .chat-bottom {
        width: 100%;
        left: 0;
        bottom: 2px;
        height: 24px;
    }
    
    .chat-counter {
        background-color: rgb(83, 203, 99);
        color: white;
        padding: 0 8px;
        border-radius: 18px;
        line-height: 24px;
        font-size: 13px;
        height: 24px;
        align-self: flex-end;
    }
</style>`;
    }
}

customElements.define('tg-chats', ChatsComponent);