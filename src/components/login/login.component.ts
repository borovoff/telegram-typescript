import {LoginText} from "../../models/interface/login-text";
import {BaseHTMLElement} from "../base-html-element";

export class LoginComponent extends BaseHTMLElement {
    header: HTMLElement;
    caption: HTMLElement;

    constructor(text?: LoginText) {
        super();

        this.classList.add('login-column');

        this.header = this.create('h1');
        this.header.classList.add('login-header');
        this.appendChild(this.header);

        this.caption = this.create('p');
        this.caption.classList.add('login-caption');
        this.appendChild(this.caption);

        this.header.innerText = text ? text.header : '';
        this.caption.innerText = text? text.caption : '';
    }
}