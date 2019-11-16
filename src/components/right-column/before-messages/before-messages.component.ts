import {BaseHTMLElement} from "../../base-html-element";
import {currentChat} from "../../../current-chat";
import {BeforeMessagesButtonComponent} from "./before-messages-button.component";
import {BeforeMessagesCaption} from "../../../models/interface/before-messages-caption";

export class BeforeMessagesComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.css();

        this.classList.add('before-messages');

        const img = document.createElement('img');
        img.classList.add('before-messages-img');
        img.src = 'assets/chatsplaceholder_svg.svg';
        this.appendChild(img);

        const caption = this.create();
        caption.classList.add('before-messages-caption');
        caption.innerHTML = `Open Chat <br> or create a new one`;
        this.appendChild(caption);

        const buttons = this.create();
        buttons.classList.add('bm-buttons');
        this.appendChild(buttons);

        const privateButton = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Private);
        buttons.appendChild(privateButton);

        const group = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Group);
        buttons.appendChild(group);

        const channel = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Channel);
        buttons.appendChild(channel);

        currentChat.subscribe(() => this.hideWithStyle());
    }

    css() {
        this.innerHTML = `<style>
    :root {
        --placeholder-blue: rgb(57, 146, 233);
        --button-blue: rgb(83, 166, 243);
        --placeholder-gray: rgb(112, 117, 121);
    }
    
    .before-messages {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    .before-messages-caption {
        text-align: center;
        font-size: 22px;
        color: var(--placeholder-gray);
        margin: 20px;
    }
    
    .bm-buttons {
        display: flex;
        justify-content: space-between;
        width: 346px;
    }
    
    
    .bm-button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }
    
    .bm-caption {
        color: var(--placeholder-gray);
        font-size: 12px;
    }

    .bm-img {
        background-color: var(--placeholder-gray);
        width: 34px;
        height: 34px;
        margin: 20px;
    }
    
    .bm-private {
        -webkit-mask: url(assets/newprivate_svg.svg) no-repeat center;
        mask: url(assets/newprivate_svg.svg) no-repeat center;
    }
    
    .bm-group {
        -webkit-mask: url(assets/newgroup_svg.svg) no-repeat center;
        mask: url(assets/newgroup_svg.svg) no-repeat center;
    }
    
    .bm-channel {
        -webkit-mask: url(assets/newchannel_svg.svg) no-repeat center;
        mask: url(assets/newchannel_svg.svg) no-repeat center;
    }

    .bm-button {
        width: 74px;
        height: 74px;
        background-color: white;
        border-radius: 50%;
        margin: 8px;
    }

    .bm-button-container:hover .bm-button {
        background-color: var(--button-blue);
    }

    .bm-button-container:hover .bm-img {
        background-color: white;
    }

    .bm-button-container:hover .bm-caption {
        color: var(--placeholder-blue);
    }
</style>`;
    }
}

customElements.define('tg-before-message', BeforeMessagesComponent);