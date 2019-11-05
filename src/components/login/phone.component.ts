import {CountryButton} from "../../models/interface/country-button";
import {COUNTRY_CODES} from "../../constants/country_codes";
import {CountryComponent} from "./country.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {Error} from "../../models/error";
import {tdlib} from "../../tdlib";
import 'flag-icon-css/css/flag-icon.min.css'


export class PhoneComponent extends HTMLElement {
    constructor() {
        super();

        this.render();
    }

    render() {
        this.classList.add('login-column');

        const mainImg = this.create('img') as HTMLImageElement;
        mainImg.src = 'assets/t_logo.png';
        this.appendChild(mainImg);

        const header = this.create('h2');
        header.innerText = 'Sign in to Telegram';
        this.appendChild(header);

        const caption = this.create('p');
        caption.innerText = 'Please confirm your country and enter phone number.';
        this.appendChild(caption);


        const country = this.create('form');
        this.appendChild(country);

        const countryCaption = this.createCaption(LoginPlaceholder.Country);
        country.appendChild(countryCaption);

        const button = this.create('button');
        button.classList.add('country-button');
        country.appendChild(button);

        const buttonImg = this.create('img') as HTMLImageElement;
        buttonImg.src = CountryButton.Down;
        buttonImg.classList.add('country-button-img');
        button.appendChild(buttonImg);

        const countryInput = this.create('input') as HTMLInputElement;
        countryInput.type = 'text';
        countryInput.placeholder = LoginPlaceholder.Country;
        country.appendChild(countryInput);

        const countryList = this.create();
        countryList.classList.add('country-list', 'hide');
        country.appendChild(countryList);

        const countryCodes = new Map<number, string>();
        const getIntCode = (code: string) => {
            return parseInt(code.replace(/\s/g, ''));
        };

        const countryComponents: CountryComponent[] = [];
        fetch('assets/i18n/en.json')
            .then(r => r.json())
            .then(r => {
                COUNTRY_CODES.forEach(c => {
                    const key = c[1];
                    const iso = c[0].toString().toLowerCase();

                    // @ts-ignore
                    const name = r[key];

                    for (let i = 2; i < c.length; i++) {
                        const code = c[i].toString();
                        const countryComponent = new CountryComponent(
                            {name: name, code: code, iso: iso, lowName: name.toLowerCase()});
                        countryList.appendChild(countryComponent);
                        countryComponents.push(countryComponent);

                        countryCodes.set(getIntCode(code), name);
                    }
                });
                console.log(countryCodes);
            });

        const number = this.create('form');
        this.appendChild(number);

        const numberInput = this.create('input') as HTMLInputElement;
        numberInput.type = 'tel';
        numberInput.autofocus = true;
        numberInput.placeholder = LoginPlaceholder.Phone;
        numberInput.classList.add('phone-input');
        number.appendChild(numberInput);

        const numberPlus = this.create('span');
        numberPlus.innerText = '+';
        numberPlus.classList.add('number', 'hide');
        number.appendChild(numberPlus);

        const numberCaption = this.createCaption(LoginPlaceholder.Phone);
        number.appendChild(numberCaption);


        const nextButton = this.create('button');
        nextButton.classList.add('next', 'hide');
        nextButton.innerText = 'NEXT';
        this.appendChild(nextButton);


        const numberAchieveContent = () => {
            numberCaption.classList.remove('hide');
            numberPlus.classList.remove('hide');
        };

        countryList.onmousedown = (ev: MouseEvent) => {
            const countryComponent = ev.target as CountryComponent;
            const country = countryComponent.country;
            countryInput.value = country.name;

            numberInput.value = country.code.slice(1);
            numberAchieveContent();
            setTimeout(() => numberInput.focus(), 0);

            countryCaption.classList.remove('hide');
        };

        let lastCountryComponent: CountryComponent;
        countryList.onmousemove = (ev: MouseEvent) => {
            const countryComponent = ev.target as CountryComponent;

            if (lastCountryComponent && lastCountryComponent !== countryComponent) {
                lastCountryComponent = countryComponent;
                countryInput.placeholder = lastCountryComponent.country.name;
            }
        };

        countryList.onmouseleave = () => {
            countryInput.placeholder = LoginPlaceholder.Country;
        };


        numberInput.onfocus = () => {
            numberAchieveContent();

            numberCaption.classList.add('focus-caption');
        };

        numberInput.onblur = () => {
            numberCaption.classList.remove('focus-caption');

            if (!numberInput.value) {
                numberPlus.classList.add('hide');
                numberCaption.classList.add('hide');
            }
        };

        numberInput.oninput = () => {
            const value = numberInput.value;

            if (value.length > 10) {
                this.show(nextButton);
            } else {
                this.hide(nextButton);
            }

            if (value.length < 9) {
                let found = false;

                for (let i = value.length; i > 0; i--) {
                    const code = value.slice(0, i);
                    const intCode = getIntCode(code);

                    if (countryCodes.has(intCode)) {
                        countryInput.value = countryCodes.get(intCode);
                        found = true;
                        break;
                    }
                }

                if (!found) countryInput.value = '';
            }
        };


        countryInput.onfocus = () => {
            buttonImg.src = CountryButton.Up;
            countryList.classList.remove('hide');
            countryCaption.classList.add('focus-caption');
        };

        countryInput.onblur = () => {
            buttonImg.src = CountryButton.Down;
            countryList.classList.add('hide');
            countryCaption.classList.remove('focus-caption');

            if (!countryInput.value) {
                countryCaption.classList.add('hide');
            }
        };

        countryInput.oninput = () => {
            if (countryInput.value) {
                countryCaption.classList.remove('hide');
            } else {
                countryCaption.classList.add('hide');
            }

            countryComponents.forEach(c => {
                const country = c.country;
                const value = countryInput.value.toLowerCase();

                if (country.lowName.includes(value) || country.code.includes(value)) {
                    c.classList.remove('hide');
                } else {
                    c.classList.add('hide');
                }
            });
        };

        const setNumber = (phone: string) => {
            this.setNumber(phone).catch((error: Error) => {
                const errorElement = document.createElement('p');
                errorElement.innerText = error.message;
                document.body.appendChild(errorElement);
            });
        };

        nextButton.onclick = () => {
            setNumber(numberInput.value);
        };

        country.onsubmit = (ev: Event) => {
            ev.preventDefault();
        };

        number.onsubmit = (ev: Event) => {
            ev.preventDefault();
            const value = numberInput.value;

            if (value.length > 10) setNumber(value);
        };
    }


    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }

    show(element) {
        element.classList.remove('hide');
    }

    hide(element) {
        element.classList.add('hide');
    }

    setNumber(phone: string): Promise<any> {
        return tdlib.setAuthenticationPhoneNumber(phone);
    }

    createCaption(text: string) {
        const caption = this.create();
        caption.innerText = text;
        caption.classList.add('caption', 'hide');

        return caption;
    }
}

customElements.define('tg-phone', PhoneComponent);