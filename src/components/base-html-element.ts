export class BaseHTMLElement extends HTMLElement {
    constructor(style: string) {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const styleElement = document.createElement('style');
        styleElement.textContent = style;

        shadow.appendChild(styleElement);
    }
}