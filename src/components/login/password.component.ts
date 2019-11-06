import {LOGIN_TEXT} from "../../models/interface/login-text";
import {LoginMonkey} from "../../models/interface/login-monkey";
import {MonkeyComponent} from "./monkey.component";
import {FormComponent} from "./form.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {InputType} from "../../models/interface/input-type";
import {tdlib} from "../../tdlib";

export class PasswordComponent extends MonkeyComponent {
    constructor() {
        super(LoginMonkey.Close, LOGIN_TEXT.password);

        const pass = new FormComponent(LoginPlaceholder.Password, InputType.Password);
        this.appendChild(pass);

        pass.form.onsubmit = () => {
            const value = pass.input.value;

            if (value.length > 0) this.checkPass(value).catch();
        }
    }

    checkPass(password: string): Promise<any> {
        return tdlib.checkAuthenticationPassword(password)
    }
}

customElements.define('tg-password', PasswordComponent);