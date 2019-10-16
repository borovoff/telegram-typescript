import {LeftColumnComponent} from "./left-column/left-column.component";
import {RightColumnComponent} from "./right-column/right-column.component";

export class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
        :host {
                position: fixed;
                display: flex;
                height: 100vh;
        }`;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(new LeftColumnComponent());
        this.shadowRoot.appendChild(new RightColumnComponent());
    }
}

customElements.define('tg-main', MainComponent);