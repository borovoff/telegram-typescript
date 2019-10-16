import {Tdlib} from "../tdlib";
import {Chat} from "../models/chat/chat";
import {UpdateChatLastMessage} from "../models/chat/update-chat-last-message";
import {UpdateChatOrder} from "../models/chat/update-chat-order";
import {Message} from "../models/message/message";

interface ViewChat extends Chat {
    lastMessage: Message;
}

export class ChatsComponent extends HTMLElement {
    chats = {};
    currentChatId: number;

    constructor(private tdlib: Tdlib,
                private rootElement: HTMLElement) {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                min-width: 300px;
                overflow-y: auto;
            }
        </style>
        <slot></slot>`;

        rootElement.appendChild(this);
        tdlib.registerChatListener((chat: Chat) => this.chats[chat.id] = chat);
        tdlib.chatLastMessage.registerListener((update: UpdateChatLastMessage) => {
            if (update.order !== '0') this.updateChatOrder(update);
            const chat: ViewChat = this.chats[update.chat_id];

            // TODO Is it a good way? Because the object chat has the last message id. May be better store the last message near.
            chat.lastMessage = update.last_message;
        });
        tdlib.chatOrder.registerListener((chatOrder: UpdateChatOrder) => this.updateChatOrder(chatOrder));
        tdlib.getChats();
    }

    updateChatOrder(chatOrder: UpdateChatOrder | UpdateChatLastMessage) {
        const chatId = chatOrder.chat_id;
        const stringId = chatId.toString();
        let chatElement = document.getElementById(stringId);
        if (chatElement) {
            this.shadowRoot.insertBefore(chatElement, this.shadowRoot.firstChild);
        } else {
            chatElement = document.createElement('div');
            chatElement.id = stringId;
            const chat: ViewChat = this.chats[chatId];
            chatElement.innerText = chat.title;
            chatElement.addEventListener('click', () => {
                if (this.currentChatId !== chatId) {
                    this.currentChatId = chatId;
                    this.tdlib.getChatHistory(chatId, chat.lastMessage.id);
                }
            });

            this.shadowRoot.appendChild(chatElement);
        }
    }
}

customElements.define('tg-chats', ChatsComponent);