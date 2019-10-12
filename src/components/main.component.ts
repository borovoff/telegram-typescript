import {Tdlib} from "../tdlib";
import {ChatsComponent} from "./chats.component";

export class MainComponent {
    constructor(private tdlib: Tdlib,
                private app: HTMLElement) {
        const chats = new ChatsComponent(this.tdlib, this.app);
    }

}