import {Tdlib} from "../../tdlib";
import {ChatsComponent} from "../chats.component";

export class LeftColumnComponent extends HTMLElement {
    constructor(private tdlib: Tdlib,
                private main: HTMLElement) {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                flex-direction: column;
            }
        </style><slot></slot>`;

        main.appendChild(this);

        new ChatsComponent(this.tdlib, this);
    }

}

customElements.define('tg-left-column', LeftColumnComponent);