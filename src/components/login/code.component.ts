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
import {UpdateListener} from "../../models/update-listener";
import {LoginComponent} from "./login.component";

export class CodeComponent extends LoginComponent {
    editPhone: UpdateListener<string> = new UpdateListener();
    currentName = LoginMonkey.Idle;
    lottie;

    constructor(update: UpdateAuthorizationState) {
        super();

        const codeInfo = update.authorization_state.code_info;
        this.setText(this.getCaption(codeInfo.type), codeInfo.phone_number);

        import(/* webpackPrefetch: true */ "lottie-web").then(lottie => {
            this.lottie = lottie;
            this.loadAnimation([LoginMonkey.Idle, LoginMonkey.Tracking]);
        });

        this.render();
    }

    render() {
        const code = new FormComponent(LoginPlaceholder.Code, InputType.Text);
        code.input.maxLength = 5;
        code.input.autofocus = true;
        this.appendChild(code);

        code.input.oninput = () => {
            const value = code.input.value;

            if (value.length > 0) {
                this.currentName = LoginMonkey.Tracking;
            } else {
                this.currentName = LoginMonkey.Idle;
            }

            if (value.length > 4) {
                this.checkCode(value).catch((error: Error) => {
                    if (error.message === ErrorMessage.PhoneCodeInvalid) {
                        code.setInvalid('Invalid Code');
                    }
                });
            } else {
                code.removeInvalid(LoginPlaceholder.Code);
            }
        };
    }

    loadAnimation(animationNames: LoginMonkey[]) {
        const animationContainer = this.create();
        animationContainer.classList.add('monkey-face');
        this.insertBefore(animationContainer, this.firstChild);

        animationNames.forEach(name => {
            const container = this.create();
            container.classList.add('animation-container');
            animationContainer.appendChild(container);

            const animation = this.lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'assets/' + name
            });

            this.updateAnimation(container, name);

            animation.addEventListener('DOMLoaded', () =>
                animation.addEventListener('loopComplete', () =>
                    this.updateAnimation(container, name))
            );
        });
    }

    updateAnimation(container: HTMLElement, name: LoginMonkey) {
        if (this.currentName !== name)
            FormComponent.hide(container);
        else
            FormComponent.show(container);
    }

    checkCode(code: string): Promise<any> {
        return tdlib.checkAuthenticationCode(code);
    }

    setText(caption: string, header: string) {
        this.caption.innerText = caption;

        this.header.innerText = '+' + header;

        const edit = document.createElement('img');
        edit.src = 'assets/edit_svg.svg';
        edit.classList.add('code-edit');
        this.header.appendChild(edit);

        edit.onclick = () => {
            this.editPhone.value = header;
        };
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