import {ListCountry} from "../../../models/login/list-country";

export class CountryItemComponent extends HTMLElement {
    country: ListCountry;

    constructor(country: ListCountry) {
        super();

        this.country = country;

        const container = document.createElement('div');
        container.classList.add('country-item');
        this.appendChild(container);

        const flag = document.createElement('div');
        flag.classList.add('flag-icon', 'flag-icon-' + country.iso);
        container.appendChild(flag);

        const text = document.createElement('div');
        text.innerText = country.name;
        text.classList.add('country-name');
        container.appendChild(text);

        const code = document.createElement('div');
        code.innerText = country.code;
        code.classList.add('country-code');
        container.appendChild(code);

        this.classList.add('country');
    }
}

customElements.define('tg-country', CountryItemComponent);