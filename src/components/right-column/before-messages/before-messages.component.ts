import {BaseHTMLElement} from "../../base-html-element";
import {currentChat} from "../../../current-chat";
import {BeforeMessagesButtonComponent} from "./before-messages-button.component";
import {BeforeMessagesCaption} from "../../../models/interface/before-messages-caption";

export class BeforeMessagesComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.css();

        this.classList.add('before-messages');

        const buttons = this.create();
        buttons.classList.add('bm-buttons');
        this.appendChild(buttons);

        const privateButton = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Private);
        buttons.appendChild(privateButton);

        const group = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Group);
        buttons.appendChild(group);

        const channel = new BeforeMessagesButtonComponent(BeforeMessagesCaption.Channel);
        buttons.appendChild(channel);



        currentChat.subscribe(() => this.hide());


    }

    css() {
        this.innerHTML = `<style>
    .before-messages {
        display: flex;
        flex-direction: column;
        align-items: center;
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
        color: rgb(112, 117, 121);
    }

    .bm-img {
        background-color: rgb(112, 117, 121);
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
    
    .bm-button:hover {
        background-color: rgb(83, 166, 243);
    }
    
    .bm-button:hover .bm-img {
        background-color: white;
    }

    .bm-button:hover ~ .bm-caption {
        color: rgb(57, 146, 233);
    }
</style>`;
    }
}

customElements.define('tg-before-message', BeforeMessagesComponent);