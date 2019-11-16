import {BaseHTMLElement} from "../../base-html-element";
import {currentChat} from "../../../current-chat";
import {ChatPhotoHeaderComponent} from "./chat-photo-header.component";
import {ButtonComponent} from "../../button.component";
import {ButtonPath} from "../../../models/interface/button-path";

export class ChatHeaderComponent extends BaseHTMLElement {
    photo: ChatPhotoHeaderComponent;

    constructor() {
        super();
        this.css();

        this.classList.add('chat-header');

        this.photo = new ChatPhotoHeaderComponent();
        this.appendChild(this.photo);

        const textColumn = this.create();
        textColumn.classList.add('chat-title-column');
        this.appendChild(textColumn);

        const title = this.create();
        title.classList.add('chat-header-title');
        textColumn.appendChild(title);

        const online = this.create();
        online.classList.add('chat-online');
        online.innerText = 'online';
        textColumn.appendChild(online);

        const search = new ButtonComponent(ButtonPath.Search);
        this.appendChild(search);

        const more = new ButtonComponent(ButtonPath.More);
        this.appendChild(more);

        this.hideWithStyle();
        currentChat.subscribe(chat => {
            this.showWithStyle('flex');
            title.innerText = chat.title;
            this.photo.change(chat);
        });
    }

    css() {
        this.innerHTML = `<style>
    .chat-header {
        height: 62px;
        display: flex;
        align-items: center;
        background-color: white;
        box-shadow: 0 1px 2px rgb(218, 220, 224);
        padding: 0 12px;
        z-index: 2;
    }
    
    .chat-online {
        position: absolute;
        left: 0;
        bottom: -18px;
        font-size: 12px;
        color: rgb(57, 146, 233);
    }
    
    .chat-title-column {
        position: relative;
        width: 100%;
    }
    
    .chat-header-title {
        position: absolute;
        left: 0;
        bottom: -1px;
        font-size: 14px;
        font-weight: bold;    
    }
    
    .base-button-img {
        background-color: rgb(112, 117, 121);
        width: 20px;
        height: 20px;
    }
    
    .base-button-search {
        -webkit-mask: url(${ButtonPath.Search}) no-repeat center;
        mask: url(${ButtonPath.Search}) no-repeat center;
    }
    
    .base-button-more {
        -webkit-mask: url(${ButtonPath.More}) no-repeat center;
        mask: url(${ButtonPath.More}) no-repeat center;
    }
    
    .base-button {
        border-radius: 50%;
        width: 44px;
        height: 44px;
        background-color: transparent;
        border: none;
        padding: 12px;
        cursor: pointer;
        margin: 2px;
    }
    
    .base-button:hover {
        background-color: rgb(244, 244, 245);
    }
</style>`;
    }
}

customElements.define('tg-chat-header', ChatHeaderComponent);