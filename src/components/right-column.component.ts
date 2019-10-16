import {Tdlib} from "../tdlib";
import {MessagesComponent} from "./messages.component";

export class RightColumnComponent extends HTMLElement {
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

        new MessagesComponent(this.tdlib, this);
    }
}

customElements.define('tg-right-column', RightColumnComponent);