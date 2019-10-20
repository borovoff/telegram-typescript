import {LeftColumnComponent} from "./left-column/left-column.component";
import {RightColumnComponent} from "./right-column/right-column.component";

export class MainComponent extends HTMLElement {
    constructor() {
        super();

        const style = this.style;
        style.position = 'fixed';
        style.display = 'flex';
        style.height = '100vh';
        style.width = '100%';

        this.appendChild(new LeftColumnComponent());
        this.appendChild(new RightColumnComponent());
    }
}

customElements.define('tg-main', MainComponent);