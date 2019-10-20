import {Tdlib} from "../../tdlib";
import {MessagesComponent} from "./messages.component";
import {InputComponent} from "./input.component";

export class RightColumnComponent extends HTMLElement {
    constructor() {
        super();

        const style = this.style;
        style.display = 'flex';
        style.flexDirection = 'column';
        style.width = '100%';

        this.appendChild(new MessagesComponent());
        this.appendChild(new InputComponent());
    }
}

customElements.define('tg-right-column', RightColumnComponent);