import {FormComponent} from "../form.component";
import {LoginPlaceholder} from "../../../models/interface/login-placeholder";
import {InputType} from "../../../models/interface/input-type";
import {FormPassword} from "../../../models/interface/form-password";

export class PasswordFormComponent extends FormComponent {
    button: HTMLButtonElement;
    img: HTMLImageElement;

    constructor(placeholder: LoginPlaceholder, type: InputType) {
        super(placeholder, type);

        this.input.autofocus = true;

        this.button = document.createElement('button');
        this.button.classList.add('form-button');
        this.button.type = 'button';
        this.form.appendChild(this.button);

        this.img = document.createElement('img');
        this.img.src = FormPassword.Show;
        this.button.appendChild(this.img);
    }
}

customElements.define('tg-password-form', PasswordFormComponent);