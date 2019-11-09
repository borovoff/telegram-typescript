export class ChatCounterComponent extends HTMLElement {
    constructor(unreadCount: number) {
        super();

        this.classList.add('chat-counter');
        this.innerText = unreadCount.toString();
        if (unreadCount < 1) this.style.display = 'none';
    }
}

customElements.define('tg-chat-counter', ChatCounterComponent);