import TdClient from 'tdweb/dist/tdweb';
import {Tdlib} from "./tdlib";
import {ChatsComponent} from "./components/chats.component";
import {AuthorizationState} from "./models/authorization-state";
import {MainComponent} from "./components/main.component";

export class App {
    public app: HTMLElement;
    tdlib: Tdlib;

    constructor() {
        this.app = document.createElement('div');
        document.body.appendChild(this.app);

        this.tdlib = new Tdlib();

        this.tdlib.registerAuthorizationState((type: AuthorizationState) => this.renderLogin(type));
    }

    renderLogin(type: AuthorizationState) {
        switch (type) {
            case AuthorizationState.WaitEncryptionKey:
                this.tdlib.checkDatabaseEncryptionKey();
                break;
            case AuthorizationState.WaitPhoneNumber:
                this.app.innerHTML = '<h2>HI!</h2>';
                break;
            case AuthorizationState.WaitCode:
                break;
            case AuthorizationState.WaitPassword:
                break;
            case AuthorizationState.WaitRegistration:
                break;
            case AuthorizationState.Ready:
                this.renderMain();
                break;
            default:
                break;
        }
    }

    renderMain() {
        const main = new MainComponent(this.tdlib, this.app);
    }
}

new App();
