import {LoginButtonText} from "../../models/interface/login-button-text";

export class LoginButtonComponent extends HTMLElement {
    button: HTMLButtonElement;

    constructor(text: LoginButtonText) {
        super();

        this.button = document.createElement('button');
        this.button.classList.add('next', 'hide');
        this.button.innerText = text;
        this.appendChild(this.button);
    }
}

customElements.define('tg-login-button', LoginButtonComponent);