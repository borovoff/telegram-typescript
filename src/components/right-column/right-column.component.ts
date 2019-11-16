import {MessagesComponent} from "./messages.component";
import {InputComponent} from "./input.component";
import {ChatHeaderComponent} from "./chat-header/chat-header.component";
import {BeforeMessagesComponent} from "./before-messages/before-messages.component";

export class RightColumnComponent extends HTMLElement {
    constructor() {
        super();
        this.css();

        this.classList.add('right-column');

        this.appendChild(new BeforeMessagesComponent());

        this.appendChild(new ChatHeaderComponent());
        this.appendChild(new MessagesComponent());
        this.appendChild(new InputComponent());
    }

    css() {
        this.innerHTML = `<style>
    .hide {
        display: none;
    }
    
    .right-column {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 14px;
    }
</style>`;
    }
}

customElements.define('tg-right-column', RightColumnComponent);