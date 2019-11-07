import {LOGIN_TEXT} from "../../models/interface/login-text";
import {LoginMonkey} from "../../models/interface/login-monkey";
import {MonkeyComponent} from "./monkey.component";
import {FormComponent} from "./form.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {InputType} from "../../models/interface/input-type";
import {tdlib} from "../../tdlib";
import {Error} from "../../models/error";
import {ErrorMessage} from "../../models/error-message";

export class PasswordComponent extends MonkeyComponent {
    constructor() {
        super(LoginMonkey.Close, LOGIN_TEXT.password);

        const pass = new FormComponent(LoginPlaceholder.Password, InputType.Password);
        this.appendChild(pass);

        pass.form.onsubmit = () => {
            const value = pass.input.value;

            if (value.length > 0) this.checkPass(value).catch((error: Error) => {
                pass.setInvalid('Invalid Password');
                if (error.message === ErrorMessage.PhoneCodeInvalid) {

                }
            });
        };

        pass.input.oninput = () => pass.removeInvalid(LoginPlaceholder.Password);
    }

    checkPass(password: string): Promise<any> {
        return tdlib.checkAuthenticationPassword(password)
    }
}

customElements.define('tg-password', PasswordComponent);