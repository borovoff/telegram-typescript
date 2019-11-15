import {MessagesComponent} from "./messages.component";
import {InputComponent} from "./input.component";
import {ChatHeaderComponent} from "./chat-header.component";
import {BeforeMessagesComponent} from "./before-messages/before-messages.component";

export class RightColumnComponent extends HTMLElement {
    constructor() {
        super();
        this.css();

        const style = this.style;
        style.position = 'relative';
        style.display = 'flex';
        style.flexDirection = 'column';
        style.width = '100%';

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
</style>`;
    }
}

customElements.define('tg-right-column', RightColumnComponent);