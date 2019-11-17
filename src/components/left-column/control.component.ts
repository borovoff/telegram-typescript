import {BaseHTMLElement} from "../base-html-element";
import {MenuButtonComponent} from "./menu-button.component";
import {SearchComponent} from "./search.component";

export class ControlComponent extends BaseHTMLElement {
    constructor() {
        super();

        const menu = new MenuButtonComponent();
        this.appendChild(menu);

        const search = new SearchComponent();
        this.appendChild(search);

        this.classList.add('control-row')
    }
}

customElements.define('tg-control', ControlComponent);