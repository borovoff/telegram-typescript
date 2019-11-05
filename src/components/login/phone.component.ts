import {CountryButton} from "../../models/interface/country-button";
import {COUNTRY_CODES} from "../../constants/country_codes";
import {CountryComponent} from "./country.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";


export class PhoneComponent extends HTMLElement {
    constructor() {
        super();

        this.render();
    }

    render() {
        this.css();

        const column = this.create();
        column.classList.add('login-column');
        document.body.appendChild(column);

        const mainImg = this.create('img') as HTMLImageElement;
        mainImg.src = 'assets/t_logo.png';
        column.appendChild(mainImg);

        const header = this.create('h2');
        header.innerText = 'Sign in to Telegram';
        column.appendChild(header);

        const caption = this.create('p');
        caption.innerText = 'Please confirm your country and enter phone number.';
        column.appendChild(caption);


        const country = this.create('form');
        column.appendChild(country);

        const countryCaption = this.createCaption(LoginPlaceholder.Country);
        country.appendChild(countryCaption);

        const button = this.create('button');
        country.appendChild(button);

        const buttonImg = this.create('img') as HTMLImageElement;
        buttonImg.src = CountryButton.Down;
        buttonImg.classList.add('country-button');
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
        column.appendChild(number);

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

        const numberAchieveContent = () => {
            numberCaption.classList.remove('hide');
            numberPlus.classList.remove('hide');
        };

        const codeSearch = (number: string) => {

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

            if (lastCountryComponent !== countryComponent) {
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

        country.onsubmit = (ev: Event) => {
            ev.preventDefault();
            // submit(input.value).catch((error: Error) => {
            //     const errorElement = document.createElement('p');
            //     errorElement.innerText = error.message;
            //     document.body.appendChild(errorElement);
            // });
        };
    }

    css() {
        this.innerHTML = `<style>
    body {
        font-family: 'Helvetica', 'Arial', sans-serif;
    }

    :root {
        --my-form-widht: 60px;
    }


    .login-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .country-button {
        fill: rgb(83, 166, 243);
    }
    
    .country:hover {
        background-color: rgb(244, 244, 245);
    }
    
    .country {
        padding: 10px;
        cursor: pointer;
        z-index: 10;
    }
    
    .flag-icon, .country-name, .country-code {
        pointer-events: none;
    }

    .country-code {
        float: right;
    }
    
    .country-list {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 30px;
        width: 220px;
        max-height: 400px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 8px;
        z-index: 10;
        background-color: white;
        overflow-y: auto;
    }
    
    .hide {
        display: none;
    }
    
    .number {
        position: absolute;
        left: 2px;
        top: 2px;
    }
    
    .caption {
        position: absolute;
        left: 2px;
        top: 2px;
        background-color: white;
        font-size: 10px;
    }
    
    form {
        position: relative;
    }
    
    button {
        position: absolute;
        right: 0px;
        top: 0px;
        border: none;
        background-color: transparent;
        border-radius: 50%;
        height: 34px;
        width: 34px;
        z-index: -1;
    }
    
    input {
        padding: 10px;
        border: solid 1px rgb(218, 220, 224);
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        width: 200px;
        background-color: transparent;
        caret-color: rgb(83, 166, 243);
    }
    
    .focus-caption {
        color: rgb(57, 146, 233);
    }
    
    input:focus {
        border: solid 1px rgb(83, 166, 243);
    }
    
    .phone-input:focus::placeholder {
        color: transparent;
    }
</style>
`;
    }

    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }

    createCaption(text: string) {
        const caption = this.create();
        caption.innerText = text;
        caption.classList.add('caption', 'hide');

        return caption;
    }
}

customElements.define('tg-phone', PhoneComponent);