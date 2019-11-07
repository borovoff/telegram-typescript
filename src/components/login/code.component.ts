import {LoginMonkey} from "../../models/interface/login-monkey";
import {UpdateAuthorizationState} from "../../models/auth/update-authorization-state";
import {AuthenticationCodeTypeBase} from "../../models/auth/authentication-code-type-base";
import {AuthenticationCodeType} from "../../models/auth/authentication-code-type";
import {FormComponent} from "./form.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {InputType} from "../../models/interface/input-type";
import {tdlib} from "../../tdlib";
import {Error} from "../../models/error";
import {ErrorMessage} from "../../models/error-message";
import {MonkeyComponent} from "./monkey.component";

export class CodeComponent extends MonkeyComponent {
    constructor(update: UpdateAuthorizationState) {
        super(LoginMonkey.Idle);

        const codeInfo = update.authorization_state.code_info;
        this.setText(this.getCaption(codeInfo.type), codeInfo.phone_number);

        this.render();
    }

    render() {
        // fetch('assets/TwoFactorSetupMonkeyClose.tgs')
        //     .then(response => response.text())
        //     .then(text => console.log(JSON.parse(text)));

        const code = new FormComponent(LoginPlaceholder.Code, InputType.Text);
        code.input.maxLength = 5;
        code.input.autofocus = true;
        this.appendChild(code);

        code.input.oninput = () => {
            const value = code.input.value;

            if (value.length > 4) {
                this.checkCode(value).catch((error: Error) => {
                    if (error.message === ErrorMessage.PhoneCodeInvalid) {
                        code.setInvalid('Invalid Code');
                    }
                });
            } else {
                code.removeInvalid(LoginPlaceholder.Code);
            }
        }
    }

    checkCode(code: string): Promise<any> {
        return tdlib.checkAuthenticationCode(code);
    }

    setText(caption: string, header: string) {
        this.caption.innerText = caption;
        this.header.innerText = '+' + header;
    }

    getCaption(type: AuthenticationCodeTypeBase) {
        switch (type["@type"]) {
            case AuthenticationCodeType.Sms:
                return 'We have sent you an SMS with the code.';
            case AuthenticationCodeType.TelegramMessage:
                return 'We have sent the code to the Telegram app on your other device.';
            default:
                break;
        }
    }
}

customElements.define('tg-code', CodeComponent);