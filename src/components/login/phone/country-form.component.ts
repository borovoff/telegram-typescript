import {FormComponent} from "../form.component";
import {CountryItemComponent} from "./country-item.component";
import {COUNTRY_CODES} from "../../../constants/country_codes";
import {LoginPlaceholder} from "../../../models/interface/login-placeholder";
import {CountryButton} from "../../../models/interface/country-button";
import {InputType} from "../../../models/interface/input-type";
import {UpdateListener} from "../../../models/update-listener";

export class CountryFormComponent extends FormComponent {
    buttonImg: HTMLImageElement;
    countryCodes = new Map<number, string>();
    countryCode: UpdateListener<string> = new UpdateListener();

    constructor() {
        super(LoginPlaceholder.Country, InputType.Text);

        const button = this.create('button');
        button.classList.add('country-button');
        this.form.appendChild(button);

        this.buttonImg = this.create('img') as HTMLImageElement;
        this.buttonImg.src = CountryButton.Down;
        this.buttonImg.classList.add('country-button-img');
        button.appendChild(this.buttonImg);

        this.createCountryList();
    }

    createCountryList() {
        const countryList = this.create();
        countryList.classList.add('country-list', 'hide');
        this.form.appendChild(countryList);


        const countryComponents: CountryItemComponent[] = [];
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
                        const countryComponent = new CountryItemComponent(
                            {name: name, code: code, iso: iso, lowName: name.toLowerCase()});
                        countryList.appendChild(countryComponent);
                        countryComponents.push(countryComponent);

                        this.countryCodes.set(FormComponent.getIntCode(code), name);
                    }
                });
            });

        countryList.onmousedown = (ev: MouseEvent) => {
            const countryComponent = ev.target as CountryItemComponent;
            const country = countryComponent.country;
            this.input.value = country.name;

            this.countryCode.value = country.code.slice(1);

            FormComponent.show(this.caption);
        };

        let lastCountryComponent: CountryItemComponent;
        countryList.onmousemove = (ev: MouseEvent) => {
            const countryComponent = ev.target as CountryItemComponent;

            if (lastCountryComponent && lastCountryComponent !== countryComponent) {
                lastCountryComponent = countryComponent;
                this.input.placeholder = lastCountryComponent.country.name;
            }
        };

        countryList.onmouseleave = () => {
            this.input.placeholder = LoginPlaceholder.Country;
        };

        this.input.addEventListener('focus', () => {
            this.buttonImg.src = CountryButton.Up;
            FormComponent.show(countryList);
        });

        this.input.addEventListener('blur', () => {
            this.buttonImg.src = CountryButton.Down;
            FormComponent.hide(countryList);
        });

        this.input.oninput = () => {
            if (this.input.value) {
                FormComponent.show(this.caption);
            } else {
                FormComponent.hide(this.caption);
            }

            countryComponents.forEach(c => {
                const country = c.country;
                const value = this.input.value.toLowerCase();

                if (country.lowName.includes(value) || country.code.includes(value)) {
                    c.classList.remove('hide');
                } else {
                    c.classList.add('hide');
                }
            });
        };

        this.form.onsubmit = (ev: Event) => {
            ev.preventDefault();
        };
    }
}

customElements.define('tg-country-form', CountryFormComponent);