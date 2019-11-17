import {Message} from '../../models/message/message';
import {DateHelper} from "../../date-helper";
import {MessageText} from "../../models/message/message-text";
import {BaseHTMLElement} from "../base-html-element";

export class MessageComponent extends BaseHTMLElement {
    private _message: Message;
    private span: HTMLElement;
    checkContainer: HTMLElement;
    img: HTMLImageElement;

    constructor(message: Message) {
        super();
        this._message = message;

        const tail = this.create();
        tail.classList.add('tail');
        this.appendChild(tail);

        const textEl = document.createElement('div');
        const text = message.content.text;
        this.span = document.createElement('span');
        this.span.classList.add('message-span');
        if (text) {
            this.span.innerText = text.text;
        }
        textEl.appendChild(this.span);
        textEl.classList.add('message-text');

        const floatContainer = document.createElement('div');
        floatContainer.classList.add('float-container');
        textEl.appendChild(floatContainer);

        const date = document.createElement('div');
        date.innerText = DateHelper.getTimeMessage(message.date);
        date.classList.add('message-date');
        floatContainer.appendChild(date);

        if (message.is_outgoing) {
            this.img = document.createElement('img');
            this.img.src = 'assets/1check_svg.svg';
            this.img.classList.add('check-img');
            floatContainer.appendChild(this.img);
        }

        this.classList.add('message');
        this.appendChild(textEl);
    }

    get message(): Message {
        return this._message;
    }

    set messageId(id: number) {
        this._message.id = id;
    }

    updateMessageContent(newContent: MessageText) {
        const text = newContent.text;
        if (text) {
            this.span.innerText = text.text;
        }
    }

    private addCheckMark(classes: string[]) {
        const check = document.createElement('span');
        classes.forEach(c => check.classList.add(c));
        this.checkContainer.appendChild(check);
    }

    readOutbox() {
        this.img.src = 'assets/2checks_svg.svg';
        // this.addCheckMark(['check-mark', 'check-mark-received'])
    }

    readOutboxAnimate() {
        this.img.src = 'assets/2checks_svg.svg';
        // this.addCheckMark(['check-mark', 'check-mark-received'])
    }

    addClasses(last: boolean, is_outgoing: boolean) {
        const classList = this.classList;
        classList.add(is_outgoing ? 'my' : 'stranger');
        if (last) classList.add('last');
    }
}

customElements.define('tg-message', MessageComponent);