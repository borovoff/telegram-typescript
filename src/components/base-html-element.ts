export class BaseHTMLElement extends HTMLElement {
    constructor(style?: string) {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = style;
    }
}