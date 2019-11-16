import {ChatPhotoComponent} from "../../chat-photo.component";
import {Chat} from "../../../models/chat/chat";

export class ChatPhotoHeaderComponent extends ChatPhotoComponent {
    constructor() {
        super();

        this.css();

        this.createImg();
        this.img.style.display = 'none';
        this.img.classList.add('chat-header-img');
        this.createCircle();
        this.letterCircle.style.display = 'none';
        this.letterCircle.classList.add('chat-header-img', 'chat-header-letter');
    }

    change(chat: Chat) {
        const photo = chat.photo;
        if (photo) {
            this.setSrc(photo);
            this.img.style.display = 'block';
            this.letterCircle.style.display = 'none';
        } else {
            this.setInitials(chat);
            this.img.style.display = 'none';
            this.letterCircle.style.display = 'block';
        }
    }

    css() {
        this.innerHTML = `<style>
    .chat-header-img {
        width: 44px;
        height: 44px;
        margin: 8px;
    }
    
    .chat-header-letter {
        line-height: 46px;
    }
</style>`;
    }
}

customElements.define('tg-chat-photo-header', ChatPhotoHeaderComponent);