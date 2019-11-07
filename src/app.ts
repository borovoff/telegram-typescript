import {tdlib} from "./tdlib";
import {AuthorizationState} from "./models/auth/authorization-state";
import {MainComponent} from "./components/main.component";
import {Error} from "./models/error";
import {CodeComponent} from "./components/login/code.component";
import {PhoneComponent} from "./components/login/phone/phone.component";
import {UpdateAuthorizationState} from "./models/auth/update-authorization-state";
import {PasswordComponent} from "./components/login/password.component";
import {RegistrationComponent} from "./components/login/registration.component";

export class App {
    private login: HTMLElement;

    constructor() {
        this.createTdlib();
        document.body.style.margin = '0';
        document.body.style.fontFamily = '"Helvetica", "Arial", sans-serif';

        this.css();

        this.login = document.createElement('div');
        document.body.appendChild(this.login);
    }

    createTdlib() {
        tdlib.authState.subscribe(update => this.renderLogin(update));
    }

    renderLogin(update: UpdateAuthorizationState) {
        this.clearLogin();

        const type = update.authorization_state['@type'];

        switch (type) {
            case AuthorizationState.WaitEncryptionKey:
                tdlib.checkDatabaseEncryptionKey();
                break;
            case AuthorizationState.WaitPhoneNumber:
                // this.login.appendChild(new PhoneComponent());
                this.login.appendChild(new RegistrationComponent());
                break;
            case AuthorizationState.WaitCode:
                // this.login.appendChild(new CodeComponent(update));
                this.login.appendChild(new RegistrationComponent());
                break;
            case AuthorizationState.WaitPassword:
                this.login.appendChild(new PasswordComponent());
                break;
            case AuthorizationState.WaitRegistration:
                this.login.appendChild(new RegistrationComponent());
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

    clearDocument() {
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
    }

    clearLogin() {
        while (this.login.firstChild) {
            this.login.firstChild.remove();
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
        this.clearDocument();
        document.body.appendChild(new MainComponent());
    }

    css() {
        document.body.innerHTML = `<style>
    :root {
        --invalid-color: rgb(211, 55, 55);
        --form-color: rgb(83, 166, 243);
    }
    
    .login-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .country-button-img {
        fill: var(--form-color);
    }
    
    .country:hover {
        background-color: rgb(244, 244, 245);
    }
    
    .country {
        padding: 10px;
        cursor: pointer;
        z-index: 10;
    }
    
    .flag-icon, .country-name, .country-code {
        pointer-events: none;
    }

    .country-code {
        float: right;
    }
    
    .country-list {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 30px;
        width: 220px;
        max-height: 400px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 8px;
        z-index: 10;
        background-color: white;
        overflow-y: auto;
    }
    
    .next {
        width: 220px;
        height: 40px;
        border: none;
        background-color: var(--form-color);
        color: white;
        border-radius: 8px;
    }
    
    .hide {
        display: none;
    }
    
    .number {
        position: absolute;
        left: 2px;
        top: 2px;
    }
    
    .caption {
        position: absolute;
        left: 2px;
        top: 2px;
        background-color: white;
        font-size: 10px;
    }
    
    form {
        position: relative;
    }
    
    .country-button {
        position: absolute;
        right: 0px;
        top: 0px;
        border: none;
        background-color: transparent;
        border-radius: 50%;
        height: 34px;
        width: 34px;
        z-index: -1;
    }
    
    input {
        padding: 10px;
        border: solid 1px rgb(218, 220, 224);
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        width: 200px;
        background-color: transparent;
        caret-color: var(--form-color);
    }
    
    .focus-caption {
        color: rgb(57, 146, 233);
    }
    
    input:focus {
        border: solid 1px var(--form-color);
    }
    
    .phone-input:focus::placeholder {
        color: transparent;
    }

    .invalid-input:focus {
        border-color: var(--invalid-color);
    }
    
    .invalid-caption {
        color: var(--invalid-color);
    }
    
    .photo-preview {
        --img-diameter: 200px;
        height: var(--img-diameter);
        width: var(--img-diameter);
        border-radius: 50%;
        background-color: var(--form-color);
        text-align: center;
        line-height: var(--img-diameter);
        cursor: pointer;
    }
    
    .add-photo {
        vertical-align: middle;
    }
    
    .cancel-area {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    
    .cancel-area-grab {
        cursor: grab;
    }
    
    .photo-picker {
        --diameter: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--diameter);
        height: var(--diameter);
        margin-top: -200px;
        margin-left: -200px;
        box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
        background-color: white;
        z-index: 1;
    }
    
    .avatar-rect {
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 300px;
        margin: 50px;
        background-color: transparent;
        cursor: grab;
    }

    .avatar-img {
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
    }

    .avatar-round {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        box-shadow: 0 0 2000px 2000px rgba(255, 255, 255, 0.5);
    }
</style>
`;
    }
}

new App();
