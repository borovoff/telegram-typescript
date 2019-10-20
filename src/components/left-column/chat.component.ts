import {BaseHTMLElement} from "../base-html-element";
import {Chat} from "../../models/chat/chat";
import {tdlib} from "../../tdlib";
import {fileStore} from "../../stores/file-store";
import {File} from "../../models/file/file";
import {FilePart} from "../../models/file/file-part";
import {Message} from "../../models/message/message";

export class ChatComponent extends BaseHTMLElement {
    message: HTMLElement;
    read: HTMLElement;

    constructor(chat: Chat) {
        super(`
        :host, .top, .bottom {
            display: flex;
        }
        
        .top, .bottom {
            justify-content: space-between;
        }
        
        .bottom {
            height: 40px;
            overflow-y: hidden;
        }
        
        :host {
            padding: 10px;
        }
        
        .image {
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
        
        .text {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            width: 230px;
        }
       
        .counter, .read {
            align-self: flex-end;
        }`);

        const img = this.create('img') as HTMLImageElement;
        img.classList.add('image');
        this.shadowRoot.appendChild(img);

        const photo = chat.photo;
        if (photo) {
            img.src = photo.small.local.path;
            fileStore.add(photo.small, (val: File) =>
                tdlib.readFile(val.id)
                    .then((r: FilePart) =>
                        img.src = URL.createObjectURL(r.data))
                    .catch(_ => {}));
            tdlib.downloadFile(photo.small);
        }

        const text = this.create();
        text.classList.add('text');
        this.shadowRoot.appendChild(text);

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

    create(tag: string = 'div'): HTMLElement {
        return document.createElement(tag);
    }

    setLastMessage(message: Message) {
        const text = message.content.text;
        if (text) {
            this.message.innerText = text.text;
        }

        this.read.innerText = message.date.toString();
    }

}

customElements.define('tg-chat', ChatComponent);