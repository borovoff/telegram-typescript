import {BaseHTMLElement} from "../base-html-element";

export class SearchComponent extends BaseHTMLElement {
    constructor() {
        super();

        this.css();

        const form = this.create('form');
        form.classList.add('search-form');
        this.appendChild(form);

        const img = this.create('img') as HTMLImageElement;
        img.classList.add('search-img');
        img.src = 'assets/search_svg.svg';
        form.appendChild(img);

        const input = this.create('input') as HTMLInputElement;
        input.placeholder = 'Search';
        input.classList.add('search-input');
        form.appendChild(input);
    }

    css() {
        this.innerHTML = `<style>
    .search-img {
        position: absolute;
        left: 7px;
        top: 9px;
    }
    
    .search-form {
        position: relative;
    }
    
    .search-input {
        padding: 15px 10px 15px 25px;
        border: solid 1px rgb(218, 220, 224);
        border-radius: 34px;
        height: 14px;
        font-size: 14px;
        outline: none;
        width: 200px;
        background-color: transparent;
    }
</style>`;
    }
}

customElements.define('tg-search', SearchComponent);