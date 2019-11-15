import {LoginButtonText} from "../../models/interface/login-button-text";

export class LoginButtonComponent extends HTMLElement {
    button: HTMLButtonElement;
    baseText: LoginButtonText;

    constructor(text: LoginButtonText) {
        super();

        this.baseText = text;
        this.button = document.createElement('button');
        this.button.classList.add('next', 'hide');
        this.button.innerText = text;
        this.appendChild(this.button);
    }

    load() {
        this.button.innerText = 'PLEASE WAIT...'
    }

    setBaseText() {
        this.button.innerText = this.baseText;
    }
}

customElements.define('tg-login-button', LoginButtonComponent);