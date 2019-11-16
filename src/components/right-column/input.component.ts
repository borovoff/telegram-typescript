import {BaseHTMLElement} from "../base-html-element";
import {tdlib} from "../../tdlib";
import {currentChat} from "../../current-chat";
import {ButtonComponent} from "../button.component";
import {ButtonPath} from "../../models/interface/button-path";

export class InputComponent extends BaseHTMLElement {
    constructor() {
        super();
        this.css();

        this.classList.add('input-component');

        this.hideWithStyle();
        currentChat.subscribe(() => this.showWithStyle('flex'));

        const form = this.create('form');
        form.classList.add('main-form', 'my', 'last');
        this.appendChild(form);

        const smile = document.createElement('img');
        smile.src = 'assets/smile_svg.svg';
        smile.classList.add('input-smile');
        form.appendChild(smile);

        const attach = document.createElement('img');
        attach.src = 'assets/attach_svg.svg';
        attach.classList.add('input-attach');
        form.appendChild(attach);

        const tail = this.create();
        tail.classList.add('tail', 'input-tail');
        form.appendChild(tail);

        const input = document.createElement('input');
        input.classList.add('main-input');
        input.type = 'text';
        input.placeholder = 'Message';
        form.appendChild(input);

        const button = this.create('button');
        button.classList.add('input-microphone');
        this.appendChild(button);

        const img = this.create();
        img.classList.add('input-microphone-img');
        button.appendChild(img);

        form.addEventListener('submit', (ev: Event) => {
            ev.preventDefault();
            tdlib.sendMessage(input.value);
            input.value = '';
        })
    }

    css() {
        this.innerHTML = `<style>
    .input-component {
        height: 84px;
        max-width: 696px;
        z-index: 1;
        margin: auto;
        /*width: 100%;*/
        display: flex;
        align-items: center;
    }
    
    .input-attach {
        position: absolute;
        right: 16px;
        top: 16px;
    }

    .input-smile {
        position: absolute;
        left: 16px;
        top: 16px;
    }
    
    .input-microphone {
        height: 54px;
        width: 54px;
        margin: 0 8px;
        padding: 14px;
        border-radius: 50%;
        border: none;
        background-color: rgb(83, 166, 243);
        z-index: 3;
    }
    
    .input-microphone-img {
        background-color: white;
        width: 26px;
        height: 26px;
        -webkit-mask: url(${ButtonPath.Microphone}) no-repeat center;
        mask: url(${ButtonPath.Microphone}) no-repeat center;
    }

    .main-form {
        position: relative;
        height: 54px;
        background-color: transparent;
        align-self: normal !important;
        margin: 10px 2px 20px;
    }

    .main-input {
        padding: 15px 56px 15px 48px;
        border: none;
        border-radius: 12px 12px 0 12px;
        font-size: 14px;
        outline: none;
        width: calc(100% - 104px);
        height: calc(100% - 30px);
        background-color: white;
        box-shadow: 0 1px 2px rgb(204, 211, 216);
    }
    
    .input-tail {
        z-index: 2;
        background-color: white !important;
    }
    
    .input-tail:before {
        background-color: white !important;
    }
</style>`;
    }
}

customElements.define('tg-input', InputComponent);