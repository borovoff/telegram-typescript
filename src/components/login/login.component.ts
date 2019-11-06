import {LoginText} from "../../models/interface/login-text";

export class LoginComponent extends HTMLElement {
    header: HTMLElement;
    caption: HTMLElement;

    constructor(text?: LoginText) {
        super();

        this.classList.add('login-column');

        this.header = this.create('h2');
        this.appendChild(this.header);

        this.caption = this.create('p');
        this.appendChild(this.caption);

        this.header.innerText = text ? text.header : '';
        this.caption.innerText = text? text.caption : '';
    }

    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }
}