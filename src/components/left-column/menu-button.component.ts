import {BaseHTMLElement} from "../base-html-element";

export class MenuButtonComponent extends BaseHTMLElement {
    constructor() {
        super();

        this.css();

        const button = this.create('button');
        button.classList.add('menu-button');
        this.appendChild(button);

        const img = document.createElement('img');
        img.src = 'assets/menu_svg.svg';
        img.classList.add('menu-img');
        button.appendChild(img);
    }

    css() {
        this.innerHTML = `<style>
    .menu-button {
        border-radius: 50%;
        width: 44px;
        height: 44px;
        background-color: transparent;
        border: none;
        margin: 8px 6px 8px 14px;
        padding: 12px;
        cursor: pointer;
    }
    
    .menu-img {
        width: 20px;
    }
    
    .menu-button:hover {
        background-color: rgb(244, 244, 245);
    }
</style>`;
    }
}

customElements.define('tg-menu-button', MenuButtonComponent);