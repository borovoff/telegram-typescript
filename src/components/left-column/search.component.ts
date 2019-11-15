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
        left: 14px;
        top: 12px;
        width: 20px;
    }
    
    .search-form {
        position: relative;
        margin: 8px;
        height: 44px;
        width: 330px;
    }
    
    .search-input {
        padding: 15px 20px 15px 42px;
        border: none;
        border-radius: 22px;
        font-size: 14px;
        outline: none;
        width: calc(100% - 62px);
        height: calc(100% - 30px);
        background-color: rgb(244, 244, 245);
    }
</style>`;
    }
}

customElements.define('tg-search', SearchComponent);