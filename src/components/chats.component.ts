import {Tdlib} from "../tdlib";
import {Chat} from "../models/chat/chat";
import {App} from "../app";
import {UpdateChatLastMessage} from "../models/chat/update-chat-last-message";

export class ChatsComponent {
    chatsElement: HTMLElement;
    chats = {};

    constructor(private tdlib: Tdlib,
                private app: HTMLElement) {
        this.chatsElement = document.createElement('div');
        app.appendChild(this.chatsElement);
        tdlib.registerChatListener((chat: Chat) => this.chats[chat.id] = chat);
        tdlib.registerLastMessageListener((lastMessage: UpdateChatLastMessage) => this.updateLastMessage(lastMessage));
        tdlib.getChats();
    }

    updateLastMessage(lastMessage: UpdateChatLastMessage) {
        const chatElement = document.createElement('div');
        chatElement.id = lastMessage.chat_id.toString();
        const chat: Chat = this.chats[lastMessage.chat_id];
        chatElement.innerText = chat.title;
        this.chatsElement.appendChild(chatElement);
    }

}