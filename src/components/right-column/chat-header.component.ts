import {BaseHTMLElement} from "../base-html-element";
import {currentChat} from "../../current-chat";

export class ChatHeaderComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.css();

        this.hide();
        currentChat.subscribe(chat => this.show());

    }

    css() {
        this.innerHTML = `<style>
    
</style>`;
    }
}

customElements.define('tg-chat-header', ChatHeaderComponent);