import {BaseHTMLElement} from "../base-html-element";
import {Chat} from "../../models/chat/chat";
import {tdlib} from "../../tdlib";
import {fileStore} from "../../stores/file-store";
import {File} from "../../models/file/file";
import {FilePart} from "../../models/file/file-part";
import {Message} from "../../models/message/message";
import {DateHelper} from "../../date-helper";

export class ChatComponent extends HTMLElement {
    message: HTMLElement;
    read: HTMLElement;
    chat: Chat;

    private _lastMessage: Message;
    private colors = [
        '#cc90e2',
        '#80d066',
        '#ecd074',
        '#6fb1e4',
        '#e57979',
        '#f98bae',
        '#73cdd0',
        '#fba76f'
    ];

    constructor(chat: Chat) {
        super();

        this.innerHTML = `<style>
    .top, .bottom {
        display: flex;
        color: white;
    }

    .top, .bottom {
        justify-content: space-between;
    }

    .bottom {
        height: 40px;
        overflow-y: hidden;
    }

    .image, .letter-circle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    
    .letter-circle {
        text-align: center;
        line-height: 52px;
        font-size: 20px; 
    }

    .text {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 220px;
        color: white;
    }

    .counter, .read {
        align-self: flex-end;
    }
</style>`;

        this.chat = chat;

        this.classList.add('chat');

        const photo = chat.photo;
        if (photo) {
            const img = this.create('img') as HTMLImageElement;
            img.classList.add('image');
            this.appendChild(img);

            img.src = photo.small.local.path;
            fileStore.add(photo.small, (val: File) =>
                tdlib.readFile(val.id)
                    .then((r: FilePart) =>
                        img.src = URL.createObjectURL(r.data))
                    .catch(_ => {}));
            tdlib.downloadFile(photo.small);
        } else {
            const letterCircle = this.create();
            letterCircle.classList.add('letter-circle');
            letterCircle.style.backgroundColor = this.colors[Math.abs(chat.type.user_id) % 8];
            letterCircle.innerText = this.getInitials(chat.title);

            this.appendChild(letterCircle);
        }

        const text = this.create();
        text.classList.add('text');
        this.appendChild(text);

        const top = this.create();
        top.classList.add('top');
        text.appendChild(top);

        const bottom = this.create();
        bottom.classList.add('bottom');
        text.appendChild(bottom);


        const title = this.create();
        title.innerText = chat.title;
        top.appendChild(title);

        this.read = this.create();
        this.read.classList.add('read');
        if (chat.is_marked_as_unread) this.read.innerText = 'U';
        top.appendChild(this.read);

        this.message = this.create();
        bottom.appendChild(this.message);

        const counter = this.create();
        counter.classList.add('counter');
        counter.innerText = chat.unread_count.toString();
        bottom.appendChild(counter);
    }

    getInitials(title: string): string {
        const array = title.split(' ');

        const second = array[1];

        return this.getLetter(array[0]) + (second ? this.getLetter(second) : '');
    }

    getLetter(word: string) {
        const l = word.charAt(0).toUpperCase();

        return l.toLowerCase() !== l ? l : '';
    }

    create(tag: string = 'div'): HTMLElement {
        return document.createElement(tag);
    }

    setLastMessage(message: Message) {
        this._lastMessage = message;

        const text = message.content.text;
        if (text) {
            this.message.innerText = text.text;
        }

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