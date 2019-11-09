import {ChatsComponent} from "./chats.component";
import {ControlComponent} from "./control.component";

export class LeftColumnComponent extends HTMLElement {
    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = `
        .left-column {
            display: flex;
            flex-direction: column;
        }`;

        this.classList.add('left-column');

        this.appendChild(style);
        this.appendChild(new ChatsComponent());
        this.appendChild(new ControlComponent());
    }

}

customElements.define('tg-left-column', LeftColumnComponent);