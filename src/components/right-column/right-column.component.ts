import {Tdlib} from "../../tdlib";
import {MessagesComponent} from "./messages.component";
import {InputComponent} from "./input.component";

export class RightColumnComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
        :host {
            display: flex;
            flex-direction: column;
        }`;

        shadow.appendChild(style);
        shadow.appendChild(new MessagesComponent());
        shadow.appendChild(new InputComponent());
    }
}

customElements.define('tg-right-column', RightColumnComponent);