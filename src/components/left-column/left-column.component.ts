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
        box-shadow: 1px 0 2px rgb(218, 220, 224);
        z-index: 3;
    }
    
    .control-row {
        display: flex;
        height: 60px;;
    }
</style>`;

        this.classList.add('left-column');

        this.appendChild(new ControlComponent());
        this.appendChild(new ChatsComponent());
    }

}

customElements.define('tg-left-column', LeftColumnComponent);