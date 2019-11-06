import {Error} from "../../../models/error";
import {tdlib} from "../../../tdlib";
import 'flag-icon-css/css/flag-icon.min.css'
import {FormComponent} from "../form.component";
import {CountryFormComponent} from "./country-form.component";
import {PhoneFormComponent} from "./phone-form.component";
import {LoginComponent} from "../login.component";
import {LOGIN_TEXT} from "../../../models/interface/login-text";


export class PhoneComponent extends LoginComponent {
    constructor() {
        super(LOGIN_TEXT.phone);

        this.render();
    }

    render() {
        const mainImg = this.create('img') as HTMLImageElement;
        mainImg.src = 'assets/t_logo.png';
        this.insertBefore(mainImg, this.firstChild);

        const countryComponent = new CountryFormComponent();
        this.appendChild(countryComponent);

        const phoneComponent = new PhoneFormComponent();
        this.appendChild(phoneComponent);

        const nextButton = this.create('button');
        nextButton.classList.add('next', 'hide');
        nextButton.innerText = 'NEXT';
        this.appendChild(nextButton);


        const setNumber = (phone: string) => {
            this.setNumber(phone).catch((error: Error) => {
                const errorElement = document.createElement('p');
                errorElement.innerText = error.message;
                document.body.appendChild(errorElement);
            });
        };

        phoneComponent.form.onsubmit = (ev: Event) => {
            ev.preventDefault();
            const value = phoneComponent.input.value;

            if (value.length > 10) setNumber(value);
        };

        nextButton.onclick = () => {
            setNumber(phoneComponent.input.value);
        };

        countryComponent.countryCode.subscribe(c => {
            phoneComponent.input.value = c;
            phoneComponent.numberAchieveContent();
            setTimeout(() => phoneComponent.input.focus(), 0);
        });

        phoneComponent.value.subscribe(v => {
            if (v.length > 10) {
                FormComponent.show(nextButton);
            } else {
                FormComponent.hide(nextButton);
            }

            if (v.length < 9) {
                let found = false;

                for (let i = v.length; i > 0; i--) {
                    const code = v.slice(0, i);
                    const intCode = FormComponent.getIntCode(code);

                    if (countryComponent.countryCodes.has(intCode)) {
                        countryComponent.input.value = countryComponent.countryCodes.get(intCode);
                        FormComponent.show(countryComponent.caption);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    countryComponent.input.value = '';
                    FormComponent.hide(countryComponent.caption);
                }
            }
        })
    }

    setNumber(phone: string): Promise<any> {
        return tdlib.setAuthenticationPhoneNumber(phone);
    }
}

customElements.define('tg-phone', PhoneComponent);