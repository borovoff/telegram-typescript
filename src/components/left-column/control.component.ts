import {BaseHTMLElement} from "../base-html-element";
import {tdlib} from "../../tdlib";

export class ControlComponent extends BaseHTMLElement {
    constructor() {
        super(`
            :host {
                height: 100px;
            }`);
        this.renderLogOut();
    }

    renderLogOut() {
        const button = document.createElement('button');
        button.innerText = 'logout';
        button.addEventListener('click', _ => tdlib.logout());
        this.shadowRoot.appendChild(button);
    }
}

customElements.define('tg-control', ControlComponent);