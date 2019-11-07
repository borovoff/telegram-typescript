import {ListCountry} from "../../../models/login/list-country";

export class CountryItemComponent extends HTMLElement {
    country: ListCountry;

    constructor(country: ListCountry) {
        super();

        this.country = country;

        const flag = document.createElement('span');
        flag.classList.add('flag-icon', 'flag-icon-' + country.iso);
        this.appendChild(flag);

        const text = document.createElement('span');
        text.innerText = country.name;
        text.classList.add('country-name');
        this.appendChild(text);

        const code = document.createElement('span');
        code.innerText = country.code;
        code.classList.add('country-code');
        this.appendChild(code);

        this.classList.add('country');
    }
}

customElements.define('tg-country', CountryItemComponent);