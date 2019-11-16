import {BaseHTMLElement} from "./base-html-element";
import {Chat} from "../models/chat/chat";
import {fileStore} from "../stores/file-store";
import {File} from "../models/file/file";
import {tdlib} from "../tdlib";
import {FilePart} from "../models/file/file-part";
import {ChatPhoto} from "../models/chat/chat-photo";

export class ChatPhotoComponent extends BaseHTMLElement {
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

    letterCircle: HTMLElement;
    img: HTMLImageElement;

    constructor(chat?: Chat) {
        super();

        if (chat) this.render(chat);
    }

    render(chat: Chat) {
        const photo = chat.photo;
        if (photo) {
            this.createImg();
            this.setSrc(photo);
        } else {
            this.createCircle();
            this.setInitials(chat);
        }
    }

    createImg() {
        this.img = this.create('img') as HTMLImageElement;
        this.img.classList.add('chat-image');
        this.appendChild(this.img);
    }

    createCircle() {
        this.letterCircle = this.create();
        this.letterCircle.classList.add('letter-circle');
        this.appendChild(this.letterCircle);
    }

    setSrc(photo: ChatPhoto) {
        this.img.src = photo.small.local.path;
        fileStore.add(photo.small, (val: File) =>
            tdlib.readFile(val.id)
                .then((r: FilePart) =>
                    this.img.src = URL.createObjectURL(r.data))
                .catch(_ => {}));
        tdlib.downloadFile(photo.small);
    }

    setInitials(chat: Chat) {
        this.letterCircle.style.backgroundColor = this.colors[Math.abs(chat.type.user_id) % 8];
        this.letterCircle.innerText = this.getInitials(chat.title);
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
}

customElements.define('tg-chat-photo', ChatPhotoComponent);