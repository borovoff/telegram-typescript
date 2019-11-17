import {Message} from '../../models/message/message';
import {DateHelper} from "../../date-helper";
import {MessageText} from "../../models/message/message-text";
import {BaseHTMLElement} from "../base-html-element";
import {MessageContent} from "../../models/message/message-content";
import {MessageCheck} from "../../models/interface/message-check";

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
        textEl.classList.add('message-text');
        this.appendChild(textEl);

        this.span = document.createElement('span');
        this.span.classList.add('message-span');
        this.span.innerText = MessageComponent.getContent(message.content);
        textEl.appendChild(this.span);

        const floatContainer = document.createElement('div');
        floatContainer.classList.add('float-container');
        textEl.appendChild(floatContainer);

        const date = document.createElement('div');
        date.innerText = DateHelper.getTimeMessage(message.date);
        date.classList.add('message-date');
        floatContainer.appendChild(date);

        if (message.is_outgoing) {
            this.img = document.createElement('img');
            this.img.src = MessageCheck.One;
            this.img.classList.add('check-img');
            floatContainer.appendChild(this.img);
        }

        this.classList.add('message');
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
        this.img.src = MessageCheck.Two;
        // this.addCheckMark(['check-mark', 'check-mark-received'])
    }

    readOutboxAnimate() {
        this.img.src = MessageCheck.Two;
        // this.addCheckMark(['check-mark', 'check-mark-received'])
    }

    addClasses(last: boolean, is_outgoing: boolean) {
        const classList = this.classList;
        classList.add(is_outgoing ? 'my' : 'stranger');
        if (last) classList.add('last');
    }

    static getContent(messageContent): string {
        const contentType = messageContent['@type'];
        let text = '';

        switch (contentType) {
            // case MessageContent.Animation:
            //     break;
            // case MessageContent.Audio:
            //     break;
            // case MessageContent.BasicGroupChatCreate:
            //     break;
            // case MessageContent.Call:
            //     break;
            // case MessageContent.ChatAddMembers:
            //     break;
            // case MessageContent.ChatChangePhoto:
            //     break;
            // case MessageContent.ChatChangeTitle:
            //     break;
            // case MessageContent.ChatDeleteMember:
            //     break;
            // case MessageContent.ChatDeletePhoto:
            //     break;
            // case MessageContent.ChatJoinByLink:
            //     break;
            // case MessageContent.ChatSetTtl:
            //     break;
            // case MessageContent.ChatUpgradeFrom:
            //     break;
            // case MessageContent.ChatUpgradeTo:
            //     break;
            // case MessageContent.Contact:
            //     break;
            // case MessageContent.ContactRegistered:
            //     break;
            // case MessageContent.CustomServiceAction:
            //     break;
            // case MessageContent.Document:
            //     break;
            // case MessageContent.ExpiredPhoto:
            //     break;
            // case MessageContent.ExpiredVideo:
            //     break;
            // case MessageContent.Game:
            //     break;
            // case MessageContent.GameScore:
            //     break;
            // case MessageContent.Invoice:
            //     break;
            // case MessageContent.Location:
            //     break;
            // case MessageContent.PassportDataReceived:
            //     break;
            // case MessageContent.PassportDataSent:
            //     break;
            // case MessageContent.PaymentSuccessful:
            //     break;
            // case MessageContent.PaymentSuccessfulBot:
            //     break;
            // case MessageContent.Photo:
            //     break;
            // case MessageContent.PinMessage:
            //     break;
            // case MessageContent.Poll:
            //     break;
            // case MessageContent.ScreenshotTaken:
            //     break;
            // case MessageContent.Sticker:
            //     break;
            // case MessageContent.SupergroupChatCreate:
            //     break;
            case MessageContent.Text:
                text = messageContent.text.text;
                break;
            // case MessageContent.Unsupported:
            //     break;
            // case MessageContent.Venue:
            //     break;
            // case MessageContent.Video:
            //     break;
            // case MessageContent.VideoNote:
            //     break;
            // case MessageContent.VoiceNote:
            //     break;
            // case MessageContent.WebsiteConnected:
            //     break;
            default:
                text = '[' + contentType.slice(7) + ']';
                break;
        }

        return text;
    }
}

customElements.define('tg-message', MessageComponent);