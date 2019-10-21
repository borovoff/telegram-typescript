import {Message} from '../../models/message/message';

export class MessageComponent extends HTMLElement {
    constructor(message: Message) {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<style>
            :host {
                position: relative;
            }

            .svg {
                position: absolute;
                left: -10px;
                bottom: -1px;
                z-index: 1000;
            }
        </style>`;

        const textEl = document.createElement('div');
        const text = message.content.text;
        if (text) {
            textEl.innerText = text.text;
        }



        this.classList.add('message');
        shadow.appendChild(textEl);
        this.renderCurves();
    }

    renderCurves() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const top = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const bottom = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.classList.add('svg');

        top.setAttribute('d', 'M 0 16 C 8 8, 8 8, 8 0');
        top.setAttribute('fill', 'transparent');
        top.setAttribute('stroke', 'black');

        bottom.setAttribute('d', 'M 0 16 C 8 16, 8 16, 12 12');
        bottom.setAttribute('fill', 'transparent');
        bottom.setAttribute('stroke', 'black');

        this.shadowRoot.appendChild(svg);
        svg.appendChild(top);
        svg.appendChild(bottom);
    }
}

customElements.define('tg-message', MessageComponent);