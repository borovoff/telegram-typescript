import {tdlib} from "../../tdlib";
import {Messages} from "../../models/message/messages";
import {MessageComponent} from "./message.component";
import {UpdateChatLastMessage} from "../../models/chat/update-chat-last-message";
import {currentChatId} from "../../current-chat-id";
import {Message} from "../../models/message/message";
import {UpdateMessageSendSucceeded} from "../../models/message/update-message-send-succeeded";
import {UpdateMessageContent} from "../../models/message/update-message-content";
import {currentChat} from "../../current-chat";
import {UpdateChatReadOutbox} from "../../models/chat/update-chat-read-outbox";

export class MessagesComponent extends HTMLElement {
    messagesContainer: HTMLElement;
    messages = new Map<number, MessageComponent>([]);
    canAppend = true;
    private readOutbox: boolean;

    constructor() {
        super();
        this.css();

        const style = this.style;
        style.overflowY = 'auto';
        style.height = 'calc(100vh - 50px)';
        style.scrollBehavior = 'smooth';

        this.messagesContainer = document.createElement('div');
        this.messagesContainer.classList.add('messages');
        this.appendChild(this.messagesContainer);

        this.addEventListener('scroll', (ev: Event) => {
            const target = ev.target as MessagesComponent;
            if (target.scrollTop < 50 && this.canAppend) {
                this.canAppend = false;
                const messageComponents = Array.from(this.messages.values());
                const topMessage = messageComponents[messageComponents.length - 1].message;
                tdlib.appendChatHistory(currentChatId.value, topMessage.id)
                    .then((messages: Messages) => {
                        this.appendMessages(messages, topMessage)
                    });
            }
        });

        tdlib.messages.subscribe((messages: Messages) => this.createMessages(messages));
        tdlib.chatLastMessage.subscribe((update: UpdateChatLastMessage) => this.updateChatLastMessage(update));
        tdlib.sendSucceeded.subscribe(update => this.updateMessageSendSucceed(update));
        tdlib.messageContent.subscribe(update => this.updateMessageContent(update));
        tdlib.readOutbox.subscribe(update => this.updateChatReadOutbox(update));
    }

    updateChatReadOutbox(update: UpdateChatReadOutbox) {
        if (currentChat.value.id === update.chat_id) {
            let readOutbox = false;

            for (const m of this.messages.values()) {
                if (readOutbox) {
                    if (m.checkContainer.childElementCount == 2) {
                        break;
                    } else {
                        m.readOutboxAnimate();
                    }
                } else if (m.message.id === update.last_read_outbox_message_id) {
                    readOutbox = true;

                    if (m.checkContainer.childElementCount == 2) {
                        break;
                    } else {
                        m.readOutboxAnimate();
                    }
                }
            }
        }
    }

    updateMessageContent(update: UpdateMessageContent) {
        const id = update.message_id;

        if (update.chat_id === currentChatId.value && this.messages.has(id)) {
            this.messages.get(id).updateMessageContent(update.new_content);
        }
    }

    updateMessageSendSucceed(update: UpdateMessageSendSucceeded) {
        const oldId = update.old_message_id;
        const messageComponent = this.messages.get(oldId);
        messageComponent.messageId = update.message.id;

        this.messages.delete(oldId);

        const messageComponents = Array.from(this.messages.values());
        this.unshift(messageComponents, messageComponent);
    }

    appendMessages(messages: Messages, topMessage: Message) {
        if (messages.total_count > 0) {
            const height = this.messagesContainer.offsetHeight;

            let last = false;
            if (messages.messages[0].is_outgoing !== topMessage.is_outgoing) {
                last = true;
                this.messages.get(topMessage.id).classList.add('first');
            }

            this.addMessages(messages, last);

            this.scrollTo(0, this.messagesContainer.offsetHeight - height);
        }

        this.canAppend = true;
    }

    createMessages(messages: Messages) {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.firstChild.remove();
        }
        this.readOutbox = false;

        this.addMessages(messages, true);

        this.scrollTo(0, this.scrollHeight);
    }

    addMessages(messages: Messages, last: boolean) {
        messages.messages.forEach((m, i) => {
            const messageComponent = new MessageComponent(m);

            messageComponent.addClasses(last, m.is_outgoing);
            this.messagesContainer.insertBefore(messageComponent, this.messagesContainer.firstChild);

            const next = i + 1;
            last = false;
            if (next < messages.total_count && m.is_outgoing !== messages.messages[next].is_outgoing) {
                last = true;
                messageComponent.classList.add('first');
            }

            // this.minimizeWidth(messageComponent);

            if (m.is_outgoing) {
                if (this.readOutbox) {
                    messageComponent.readOutbox();
                } else if (currentChat.value.last_read_outbox_message_id === m.id) {
                    this.readOutbox = true;
                    messageComponent.readOutbox();
                }
            }

            this.messages.set(m.id, messageComponent);
        });
    }

    minimizeWidth(messageComponent: MessageComponent) {
        let width = messageComponent.offsetWidth;
        const maxWidth = 0.78 * this.offsetWidth;

        if (width > maxWidth) {
            const height = messageComponent.offsetHeight;

            while (messageComponent.offsetHeight === height && width > 0) {
                messageComponent.style.width = --width + 'px';
            }

            messageComponent.style.width = ++width + 'px';
        }
    }

    unshift(components: MessageComponent[], component: MessageComponent) {
        components.unshift(component);
        this.messages.clear();
        components.forEach(m => this.messages.set(m.message.id, m));
    }

    updateChatLastMessage(update: UpdateChatLastMessage) {
        const m = update.last_message;

        if (update.chat_id === currentChatId.value && !this.messages.has(m.id)) {
            const messageComponent = new MessageComponent(m);
            const messageComponents = Array.from(this.messages.values());
            const previous = messageComponents[0] as MessageComponent;

            messageComponent.addClasses(true, m.is_outgoing);
            if (m.is_outgoing === previous.message.is_outgoing)
                previous.classList.remove('last');
            else
                messageComponent.classList.add('first');

            this.unshift(messageComponents, messageComponent);

            if (this.scrollHeight - this.scrollTop === this.clientHeight) {
                this.messagesContainer.appendChild(messageComponent);
                this.scrollTo(0, this.scrollHeight);
            } else {
                this.messagesContainer.appendChild(messageComponent);
            }
        }
    }

    css() {
        this.innerHTML = `<style>
    .messages {
        display: flex;
        flex-direction: column;
        width: calc(100% - 21px);
        margin: 10px;
    }

    .message {
        max-width: 500px;
        color: black;
        padding: 10px 16px;
        margin: 2px;
        word-break: break-word;
        position: relative;
        box-shadow: 0 1px 2px var(--message-shadow);
        z-index: 0;
    }

    .message-text {
        overflow: auto;
    }

    .float-container {
        float: right;
        margin-left: 10px;
        display: flex;
    }

    .message-date {
    }
    
    :root {
        --stranger-background: white;
        --chat-background: rgb(230, 235, 238);
        --my-background: rgb(238, 254, 233);
        --message-shadow: rgb(204, 211, 216);
    }

    .stranger {
        align-self: flex-start;
        background-color: var(--stranger-background);
        border-radius: 6px 12px 12px 6px;
    }

    .my {
        align-self: flex-end;
        background-color: var(--my-background);
        border-radius: 12px 6px 6px 12px;
    }
    
    .my.last {
        border-bottom-right-radius: 0;
    }
    
    .stranger.last {
        border-bottom-left-radius: 0;
    }
    
    .my.first {
        border-top-right-radius: 12px;
    }

    .stranger.first {
        border-top-left-radius: 12px;
    }
    
    .tail {
        position: absolute;
        z-index: -1;
        bottom: 0;
        height: 20px;
        width: 8px;
    }
    
    .my.last > .tail {
        right: -7px;
        border-radius: 0 0 1px 0 / 0 0 4px 0;
        background-color: var(--my-background);
        box-shadow: 1px 1px 2px var(--message-shadow);
    }

    .stranger.last > .tail {
        left: -7px;
        border-radius: 0 0 0 1px / 0 0 0 4px;
        background-color: var(--stranger-background);
        box-shadow: -1px 1px 2px  var(--message-shadow);
    }
    
    .tail:before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 2px;
        height: 2px;
        border-radius: 10px;
        z-index: -1;
    }

    .stranger.last > .tail:before {
        left: 0;
        background-color: var(--stranger-background);
    }
    
    .my.last > .tail:before {
        left: 6px;
        background-color: var(--my-background);
    }
    
    .tail:after {
        content: '';
        position: absolute;
        z-index: 16;
        width: 13px;
        height: 25px;
        top: -4px;
    }

    .stranger.last > .tail:after {
        right: 1px;
        border-radius: 0 0 100% 0 / 0 0 86% 0;
        background-color: var(--chat-background);
        box-shadow: inset -1px 0 2px -1px var(--message-shadow);
    }

    .my.last > .tail:after {
        right: -6px;
        border-radius: 0 0 0 100% / 0 0 0 86%;
        background-color: var(--chat-background);
        box-shadow: inset 1px 0 2px -1px var(--message-shadow);
    }
    
    .check-container {
        width: 20px;
        height: 18px;
        position: relative;
        margin-left: 6px;
    }

    .check-mark {
        display: inline-block;
        width: 0;
        height: 10px;
        transform: rotate(45deg);
    }

    .check-mark-received {
        margin-left: 2px;
    }

    .check-mark:before,
    .check-mark:after {
        content: "";
        position: absolute;
        background-color: white;
    }

    .check-mark:after {
        width: 1px;
        left: 0;
        bottom: 5px;
    }

    .check-mark:after {
        height: 10px;
    }

    .check-mark-animate:after {
        /*height: 0;*/
        animation: check-after 0.5s 550ms cubic-bezier(.4, .0, .23, 1) forwards;
    }

    .check-mark:before {
        height: 1px;
        left: -3px;
        top: 4px;
    }

    .check-mark:before {
        width: 4px;
    }

    .check-mark-animate:before {
        width: 0;
        animation: check-before 0.3s 250ms cubic-bezier(.4, .0, .23, 1) forwards;
    }

    .check-mark-received:before {
        display: none;
    }

    @keyframes check-before {
        from {
            width: 0;
        }
        to {
            width: 4px;
        }
    }

    @keyframes check-after {
        from {
            height: 0;
        }
        to {
            height: 10px;
        }
    }
</style>`;
    }
}

customElements.define('tg-messages', MessagesComponent);