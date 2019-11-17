import {Chat} from "../../models/chat/chat";
import {tdlib} from "../../tdlib";
import {fileStore} from "../../stores/file-store";
import {File} from "../../models/file/file";
import {FilePart} from "../../models/file/file-part";
import {Message} from "../../models/message/message";
import {DateHelper} from "../../date-helper";
import {ChatCounterComponent} from "./chat-counter.component";
import {ChatPhotoComponent} from "../chat-photo.component";
import {MessageComponent} from "../right-column/message.component";

export class ChatComponent extends HTMLElement {
    message: HTMLElement;
    read: HTMLElement;
    chat: Chat;

    private _lastMessage: Message;

    constructor(chat: Chat) {
        super();

        this.chat = chat;

        this.classList.add('chat');

        this.appendChild(new ChatPhotoComponent(chat));

        const text = this.create();
        text.classList.add('chat-text');
        this.appendChild(text);

        const top = this.create();
        top.classList.add('chat-top');
        text.appendChild(top);

        const title = this.create();
        title.innerText = chat.title;
        title.classList.add('chat-title');
        top.appendChild(title);

        console.log('chat title: ', chat.title);

        this.read = this.create();
        this.read.classList.add('chat-read');
        if (chat.is_marked_as_unread) this.read.innerText = 'U';
        top.appendChild(this.read);

        const bottom = this.create();
        bottom.classList.add('chat-bottom');
        text.appendChild(bottom);

        this.message = this.create();
        this.message.classList.add('chat-message');
        bottom.appendChild(this.message);

        const counter = new ChatCounterComponent(chat.unread_count);
        bottom.appendChild(counter);
    }

    create(tag: string = 'div'): HTMLElement {
        return document.createElement(tag);
    }

    setLastMessage(message: Message) {
        this._lastMessage = message;

        this.message.innerText = MessageComponent.getContent(message.content).replace(/\n/g, ' ');

        this.read.innerText = DateHelper.getTime(message.date);
    }

    get lastMessageId(): number {
        return this._lastMessage.id;
    }

    get lastMessage(): Message {
        return this._lastMessage;
    }

}

customElements.define('tg-chat', ChatComponent);