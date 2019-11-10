import {ChatsComponent} from "./chats.component";
import {ControlComponent} from "./control.component";

export class LeftColumnComponent extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `<style>
    .left-column {
        display: flex;
        flex-direction: column;
        background-color: white;
    }
    
    .control-row {
        display: flex;
        height: 50px;;
    }
</style>`;

        this.classList.add('left-column');

        this.appendChild(new ControlComponent());
        this.appendChild(new ChatsComponent());
    }

}

customElements.define('tg-left-column', LeftColumnComponent);