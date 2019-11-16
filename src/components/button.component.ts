import {BaseHTMLElement} from "./base-html-element";
import {ButtonPath} from "../models/interface/button-path";

export class ButtonComponent extends BaseHTMLElement {
    constructor(path: ButtonPath) {
        super();

        const button = this.create('button');
        button.classList.add('base-button');
        this.appendChild(button);

        const img = this.create();
        img.classList.add('base-button-img');
        button.appendChild(img);

        switch (path) {
            case ButtonPath.More:
                img.classList.add('base-button-more');
                break;
            case ButtonPath.Search:
                img.classList.add('base-button-search');
                break;
            default:
                break;
        }
    }
}

customElements.define('tg-button', ButtonComponent);