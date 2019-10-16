import {Tdlib} from "./tdlib";
import {AuthorizationState} from "./models/authorization-state";
import {MainComponent} from "./components/main.component";
import {Error} from "./models/error";

export class App {
    tdlib: Tdlib;

    constructor() {
        this.createTdlib();
        document.body.style.margin = '0';
    }

    createTdlib() {
        this.tdlib = new Tdlib();
        this.tdlib.registerAuthorizationState((type: AuthorizationState) => this.renderLogin(type));
    }

    renderLogin(type: AuthorizationState) {
        this.removeChild();
        switch (type) {
            case AuthorizationState.WaitEncryptionKey:
                this.tdlib.checkDatabaseEncryptionKey();
                break;
            case AuthorizationState.WaitPhoneNumber:
                this.renderForm('Phone number', phone => this.tdlib.setAuthenticationPhoneNumber(phone));
                break;
            case AuthorizationState.WaitCode:
                this.renderForm('Code', code => this.tdlib.checkAuthenticationCode(code));
                break;
            case AuthorizationState.WaitPassword:
                this.renderForm('Password', password => this.tdlib.checkAuthenticationPassword(password));
                break;
            case AuthorizationState.WaitRegistration:
                break;
            case AuthorizationState.Ready:
                this.renderMain();
                break;
            case AuthorizationState.Closed:
                this.createTdlib();
                break;
            default:
                break;
        }
    }

    removeChild() {
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
    }

    renderForm(titleValue: string, submit: (value: string) => Promise<Error>) {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const title = document.createElement('p');
        title.innerText = titleValue;
        form.appendChild(title);
        form.appendChild(input);
        input.type = 'text';

        form.addEventListener('submit', (ev: Event) => {
            ev.preventDefault();
            submit(input.value).catch((error: Error) => {
                const errorElement = document.createElement('p');
                errorElement.innerText = error.message;
                document.body.appendChild(errorElement);
            });
        });

        document.body.appendChild(form);
    }

    renderMain() {
        new MainComponent(this.tdlib);
    }
}

new App();
