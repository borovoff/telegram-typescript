import {BaseHTMLElement} from "../base-html-element";
import {tdlib} from "../../tdlib";

export class MenuButtonComponent extends BaseHTMLElement {
    constructor() {
        super();

        this.css();

        const button = this.create('button');
        button.onclick = () => tdlib.logout();
        button.classList.add('menu-button');
        this.appendChild(button);

        const img = this.create('img') as HTMLImageElement;
        img.src = 'assets/menu_svg.svg';
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
    }
    
    .menu-button:hover {
        cursor: pointer;
        background-color: rgb(244, 244, 245);
    }
</style>`;
    }
}

customElements.define('tg-menu-button', MenuButtonComponent);