import {ChatsComponent} from "./chats.component";
import {ControlComponent} from "./control.component";

export class LeftColumnComponent extends HTMLElement {
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
        shadow.appendChild(new ChatsComponent());
        shadow.appendChild(new ControlComponent());
    }

}

customElements.define('tg-left-column', LeftColumnComponent);