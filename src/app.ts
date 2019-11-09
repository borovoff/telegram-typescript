import {tdlib} from "./tdlib";
import {AuthorizationState} from "./models/auth/authorization-state";
import {MainComponent} from "./components/main.component";
import {CodeComponent} from "./components/login/code.component";
import {PhoneComponent} from "./components/login/phone/phone.component";
import {UpdateAuthorizationState} from "./models/auth/update-authorization-state";
import {PasswordComponent} from "./components/login/password.component";
import {RegistrationComponent} from "./components/login/registration.component";

export class App {
    private login: HTMLElement;

    constructor() {
        tdlib.authState.subscribe(update => this.renderLogin(update));
        document.body.style.margin = '0';
        document.body.style.fontFamily = '"Helvetica", "Arial", sans-serif';

        this.css();

        this.websocket();

        this.login = document.createElement('div');
        document.body.appendChild(this.login);
    }

    renderLogin(update: UpdateAuthorizationState) {
        this.clearLogin();

        const type = update.authorization_state['@type'];

        switch (type) {
            case AuthorizationState.WaitEncryptionKey:
                tdlib.checkDatabaseEncryptionKey();
                break;
            case AuthorizationState.WaitPhoneNumber:
                this.login.appendChild(new PhoneComponent());
                break;
            case AuthorizationState.WaitCode:
                this.login.appendChild(new CodeComponent(update));
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
                // TODO: reinit tdlib
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

    websocket() {
        const start = [0xEF, 0x0A];
        const authKeyId = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        const messageId = [0x4A, 0x96, 0x70, 0x27, 0xC4, 0x7A, 0xE5, 0x51];
        const messageLength = [0x14, 0x00, 0x00, 0x00];
        const reqPq = [0xbe, 0x7e, 0x8e, 0xf1];
        const nonce = [
            0x3E, 0x05, 0x49, 0x82, 0x8C, 0xCA, 0x27, 0xE9,
            0x66, 0xB3, 0x01, 0xA4, 0x8F, 0xEC, 0xE2, 0xFC
        ];

        const message = start.concat(authKeyId, messageId, messageLength, reqPq, nonce);

        const myArray = new ArrayBuffer(50);
        const longInt8View = new Uint8Array(myArray);

        for (let i = 0; i < longInt8View.length; i++) {
            longInt8View[i] = message[i];
        }

        const socket = new WebSocket('wss://venus.web.telegram.org:443/apiws', 'binary');
        // const socket = new WebSocket('wss://echo.websocket.org', 'binary');

        console.error('before list');
        socket.onopen = (event) => {
            console.error('message: ', myArray);
            socket.send(myArray);
        };

        socket.onerror = (err) => {
            console.error(err);
        };

        socket.onmessage = (event) => {
            console.error('MESSAGE: ', event.data);
        };
    }

    hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
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
        transform-origin: left top;
    }

    .avatar-round {
        position: relative;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        box-shadow: 0 0 2000px 2000px rgba(255, 255, 255, 0.5);
    }
</style>
`;
    }
}

new App();
