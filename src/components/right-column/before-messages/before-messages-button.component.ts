import {BaseHTMLElement} from "../../base-html-element";
import {BeforeMessagesCaption} from "../../../models/interface/before-messages-caption";

export class BeforeMessagesButtonComponent extends BaseHTMLElement {
    constructor(caption: BeforeMessagesCaption) {
        super();

        this.classList.add('bm-button-container');

        const button = this.create();
        button.classList.add('bm-button');
        this.appendChild(button);

        const img = this.create();
        img.classList.add('bm-img');
        button.appendChild(img);

        switch (caption) {
            case BeforeMessagesCaption.Channel:
                img.classList.add('bm-channel');
                break;
            case BeforeMessagesCaption.Group:
                img.classList.add('bm-group');
                break;
            case BeforeMessagesCaption.Private:
                img.classList.add('bm-private');
                break;
            default:
                break;
        }

        const captionEl = this.create();
        captionEl.classList.add('bm-caption');
        captionEl.innerText = caption;
        this.appendChild(captionEl);
    }
}

customElements.define('tg-bm-button', BeforeMessagesButtonComponent);