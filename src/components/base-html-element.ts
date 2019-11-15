export class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();
    }

    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }

    show() {
        this.classList.remove('hide');
    }

    hide() {
        this.classList.add('hide');
    }
}