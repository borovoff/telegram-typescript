import {LeftColumnComponent} from "./left-column/left-column.component";
import {RightColumnComponent} from "./right-column/right-column.component";

export class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.css();

        this.classList.add('main-component');

        this.appendChild(new LeftColumnComponent());
        this.appendChild(new RightColumnComponent());
    }

    css() {
        this.innerHTML = `<style>
    .main-component {
        margin: auto;
        display: flex;
        height: 100vh;
        width: 100%;
        max-width: 1678px;
        background-color: rgb(230, 235, 238);
        box-shadow: 0 0 2px 1px rgb(218, 220, 224);
    }
</style>`;
    }
}

customElements.define('tg-main', MainComponent);