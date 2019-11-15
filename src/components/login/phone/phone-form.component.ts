import {FormComponent} from "../form.component";
import {LoginPlaceholder} from "../../../models/interface/login-placeholder";
import {InputType} from "../../../models/interface/input-type";
import {UpdateListener} from "../../../models/update-listener";

export class PhoneFormComponent extends FormComponent {
    plus: HTMLElement;
    value: UpdateListener<string> = new UpdateListener();

    constructor() {
        super(LoginPlaceholder.Phone, InputType.Tel);

        this.input.autofocus = true;
        this.input.classList.add('phone-input');

        this.plus = this.create('span');
        this.plus.innerText = '+';
        this.plus.classList.add('number', 'hide');
        this.form.appendChild(this.plus);

        this.input.addEventListener('focus', () => {
            this.numberAchieveContent();
            this.input.classList.add('phone-input-focus');
        });

        this.input.addEventListener('blur', () => {
            if (!this.input.value) {
                FormComponent.hide(this.plus);
                this.input.classList.remove('phone-input-focus');
            }
        });

        this.input.oninput = () => {
            this.value.value = this.input.value;
            FormComponent.show(this.caption);
            this.removeInvalid(LoginPlaceholder.Phone);
        }
    }

    numberAchieveContent() {
        FormComponent.show(this.caption);
        FormComponent.show(this.plus);
    };
}

customElements.define('tg-phone-form', PhoneFormComponent);