export class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();
    }

    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }
}