import {LOGIN_TEXT} from "../../../models/interface/login-text";
import {LoginMonkey} from "../../../models/interface/login-monkey";
import {FormComponent} from "../form.component";
import {LoginPlaceholder} from "../../../models/interface/login-placeholder";
import {InputType} from "../../../models/interface/input-type";
import {tdlib} from "../../../tdlib";
import {Error} from "../../../models/error";
import {ErrorMessage} from "../../../models/error-message";
import {LoginComponent} from "../login.component";
import lottie, {AnimationItem} from "lottie-web";
import {PasswordFormComponent} from "./password-form.component";
import {FormPassword} from "../../../models/interface/form-password";

interface Animation {
    container: HTMLElement;
    animation: AnimationItem;
}

export class PasswordComponent extends LoginComponent {
    animationContainer: HTMLElement;

    constructor() {
        super(LOGIN_TEXT.password);


        const type = InputType.Password;
        const pass = new PasswordFormComponent(LoginPlaceholder.Password, type);
        this.appendChild(pass);

        pass.form.onsubmit = () => {
            const value = pass.input.value;

            if (value.length > 0) this.checkPass(value).catch((error: Error) => {
                console.log('error: ', error);

                pass.setInvalid('Invalid Password');

                switch (error.message) {
                    case ErrorMessage.PasswordHashInvalid:
                        pass.setInvalid('Password Hash Invalid');
                        break;
                    default:
                        break;
                }
            });
        };

        pass.input.oninput = () => {
            if (pass.input.classList.contains('invalid-input'))
                pass.removeInvalid(LoginPlaceholder.Password);
        };

        pass.button.onclick = ev => {
            ev.preventDefault();

            const peek = animations.get(LoginMonkey.Peek);
            if (pass.input.type === type) {
                pass.input.type = InputType.Text;
                pass.img.src = FormPassword.Hide;
                peek.animation.playSegments([0, 15], true);
            } else {
                pass.input.type = InputType.Password;
                pass.img.src = FormPassword.Show;
                peek.animation.playSegments([16, 33], true);
            }

            pass.input.focus();
        };

        this.animationContainer = this.create();
        this.animationContainer.classList.add('monkey-face');
        this.insertBefore(this.animationContainer, this.firstChild);

        const animations: Map<LoginMonkey, Animation> = new Map();

        for (const name of [LoginMonkey.Close, LoginMonkey.Peek]) {
            const container = this.create();
            container.classList.add('animation-container');
            this.animationContainer.appendChild(container);

            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/' + name
            });

            if (name === LoginMonkey.Close) {
                animation.playSegments([0, 50], true);
                animation.onEnterFrame = ev => {
                    if (ev.currentTime > 50) {
                        animation.pause();
                        FormComponent.hide(container);
                        const peek = animations.get(LoginMonkey.Peek);
                        FormComponent.show(peek.container);
                    }
                }
            } else {
                FormComponent.hide(container);
            }

            animations.set(name, {container: container, animation: animation});
        }
    }

    checkPass(password: string): Promise<any> {
        return tdlib.checkAuthenticationPassword(password)
    }
}

customElements.define('tg-password', PasswordComponent);