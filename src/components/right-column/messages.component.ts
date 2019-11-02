import {tdlib} from "../../tdlib";
import {Messages} from "../../models/message/messages";
import {MessageComponent} from "./message.component";
import {UpdateChatLastMessage} from "../../models/chat/update-chat-last-message";
import {currentChatId} from "../../current-chat-id";
import {Message} from "../../models/message/message";
import {UpdateMessageSendSucceeded} from "../../models/message/update-message-send-succeeded";
import {UpdateMessageContent} from "../../models/message/update-message-content";
import {currentChat} from "../../current-chat";

export class MessagesComponent extends HTMLElement {
    messagesContainer: HTMLElement;
    messages = new Map<number, MessageComponent>([]);
    canAppend = true;
    readOutbox = true;

    constructor() {
        super();
        this.innerHTML = `<style>
    .messages {
        display: flex;
        flex-direction: column;
        width: calc(100% - 13px);
        margin: 5px;
    }

    .message {
        max-width: 500px;
        border-radius: 20px;
        color: white;
        padding: 10px 16px;
        margin: 2px;
        word-break: break-word;
        position: relative;
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

    .stranger {
        align-self: flex-start;
        background-color: rgb(34, 48, 63);
    }

    .my {
        align-self: flex-end;
        background-color: rgb(63, 107, 149);
    }

    .my.last:before, .my.last:after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 20px;
    }

    .my.last:before {
        z-index: 0;
        right: -8px;
        width: 20px;
        background: rgb(63, 107, 149);
        border-bottom-left-radius: 15px;
    }

    .my.last:after {
        z-index: 1;
        right: -10px;
        width: 10px;
        background: rgb(24, 34, 45);
        border-bottom-left-radius: 10px;
    }

    .stranger.last:before, .stranger.last:after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 20px;
    }

    .stranger.last:before {
        z-index: 0;
        left: -7px;
        width: 20px;
        background: rgb(34, 48, 63);
        border-bottom-right-radius: 15px;
    }

    .stranger.last:after {
        z-index: 1;
        left: -10px;
        width: 10px;
        background: rgb(24, 34, 45);
        border-bottom-right-radius: 10px;
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
        height: 0;
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

            let last = messages.messages[0].is_outgoing !== topMessage.is_outgoing;

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

            const next = ++i;
            if (next < messages.total_count) last = m.is_outgoing !== messages.messages[next].is_outgoing;

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
            if (m.is_outgoing === previous.message.is_outgoing) previous.classList.remove('last');

            this.unshift(messageComponents, messageComponent);

            if (this.scrollHeight - this.scrollTop === this.clientHeight) {
                this.messagesContainer.appendChild(messageComponent);
                this.scrollTo(0, this.scrollHeight);
            } else {
                this.messagesContainer.appendChild(messageComponent);
            }
        }
    }
}

customElements.define('tg-messages', MessagesComponent);