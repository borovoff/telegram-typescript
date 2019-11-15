import {tdlib} from "./tdlib";
import {AuthorizationState} from "./models/auth/authorization-state";
import {MainComponent} from "./components/main.component";
import {CodeComponent} from "./components/login/code.component";
import {PhoneComponent} from "./components/login/phone/phone.component";
import {UpdateAuthorizationState} from "./models/auth/update-authorization-state";
import {PasswordComponent} from "./components/login/password/password.component";
import {RegistrationComponent} from "./components/login/registration/registration.component";

export class App {
    private login: HTMLElement;

    constructor() {
        tdlib.authState.subscribe(update => this.renderLogin(update));
        document.body.style.margin = '0';
        document.body.style.fontFamily = '"Helvetica", "Arial", sans-serif';

        this.css();

        // this.websocket();

        this.login = document.createElement('div');
        document.body.appendChild(this.login);
    }

    renderLogin(update: UpdateAuthorizationState) {
        this.clearLogin();

        const type = update.authorization_state['@type'];

        switch (type) {
            case AuthorizationState.WaitTdlibParameters:
                // tdlib.setTdlibParameters();
                break;
            case AuthorizationState.WaitEncryptionKey:
                tdlib.checkDatabaseEncryptionKey();
                break;
            case AuthorizationState.WaitPhoneNumber:
                this.login.appendChild(new PhoneComponent());
                break;
            case AuthorizationState.WaitCode:
                const codeComponent = new CodeComponent(update);
                this.login.appendChild(codeComponent);
                codeComponent.editPhone.subscribe(editPhone => this.renderPhone(editPhone));
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
            case AuthorizationState.LoggingOut:
                break;
            case AuthorizationState.Closing:
                break;
            default:
                console.log('DEFAULT AUTH STATE');
                break;
        }
    }

    renderPhone(editPhone: string) {
        this.clearLogin();
        this.login.appendChild(new PhoneComponent(editPhone));
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
        --form-width: 360px;
        --form-height: 54px;
        --border-radius: 10px;
    }
    
    .login-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: var(--form-width);
        margin: auto;
    }
    
    .login-caption {
        color: rgb(112, 117, 121);
        max-width: 220px;
        text-align: center;
        margin: 7px 0 38px;
    }
    
    .login-header {
        margin: 40px 0 7px;
    }
    
    .main-logo {
        margin-top: 100px;
    }
    
    .country-button-img {
        fill: var(--form-color);
    }
    
    .country:hover {
        background-color: rgb(244, 244, 245);
    }
    
    .country {
        padding: 0 16px;
        cursor: pointer;
        z-index: 10;
    }
    
    
    .country-item {
        display: flex;
        align-items: center;
        height: 56px;
    }
    
    .country-name {
        width: 100%;
        margin: 0 15px;
        font-size: 14px;
    }
    
    .country-code {
        white-space: nowrap;
    }
    
    .flag-icon {
        margin-right: 15px;
        width: 24px;
    }
    
    .flag-icon, .country-name, .country-code, .country-item {
        pointer-events: none;
    }
    
    .country-list {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: calc(var(--form-height) + 6px);
        width: var(--form-width);
        max-height: 300px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: var(--border-radius);
        z-index: 10;
        background-color: white;
        overflow-y: auto;
    }
    
    .next {
        width: var(--form-width);
        height: var(--form-height);
        border: none;
        background-color: var(--form-color);
        color: white;
        border-radius: var(--border-radius);
        font-size: 14px;
        margin: 12px;
        cursor: pointer;
    }
    
    .login-checkbox {
        display: flex;
        align-items: center;
        align-self: flex-start;
        margin: 12px 0 36px;
    }
    
    .code-edit {
        margin: 0 6px;
        height: 20px;
        cursor: pointer;
    }
    
    .monkey-face {
        position: relative;
        height: 160px;
        width: 160px;
        margin-top: 110px;
    }
    
    .animation-container {
        position: absolute;
        left: 0;
        top: 0;
        height: 160px;
        width: 160px;
    }
    
    .checkbox-img {
        margin: 0 20px;
    }
    
    .hide {
        display: none;
    }
    
    .number {
        position: absolute;
        left: 18px;
        top: 18px;
    }
    
    .caption {
        padding: 0 4px;
        position: absolute;
        left: 14px;
        top: -6px;
        background-color: white;
        font-size: 12px;
        color: rgb(102, 102, 102);
    }
    
    form {
        position: relative;
        width: var(--form-width);
        height: var(--form-height);
        margin: 12px;
    }
    
    .country-button {
        z-index: -1;
    }
    
    .form-button {
        position: absolute;
        right: 11px;
        top: 11px;
        border: none;
        background-color: transparent;
        border-radius: 50%;
        height: 34px;
        width: 34px;
        cursor: pointer;
    }
    
    ::-webkit-credentials-auto-fill-button {
        visibility: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
    }
    
    input {
        padding: 17px 16px;
        border: solid 2px rgb(218, 220, 224);
        border-radius: var(--border-radius);
        font-size: 14px;
        outline: none;
        width: calc(100% - 38px);
        height: calc(100% - 38px);
        background-color: transparent;
        caret-color: var(--form-color);
    }
    
    .focus-caption {
        color: rgb(57, 146, 233);
    }
    
    input:focus {
        border: solid 2px var(--form-color);
    }
    
    .phone-input:focus::placeholder {
        color: transparent;
    }
    
    .phone-input-focus {
        padding-left: 28px;
        width: calc(100% - 50px);
    }

    .invalid-input, .invalid-input:focus {
        border-color: var(--invalid-color);
    }
    
    .invalid-caption {
        color: var(--invalid-color);
    }
    
    .photo-preview {
        position: relative;
        --img-diameter: 160px;
        height: var(--img-diameter);
        width: var(--img-diameter);
        border-radius: 50%;
        background-color: var(--form-color);
        text-align: center;
        line-height: var(--img-diameter);
        cursor: pointer;
        margin-top: 120px;
        overflow: hidden;
        z-index: 1;
    }
    
    .add-photo {
        vertical-align: middle;
        width: 50px;
        z-index: 2;
    }
    
    .cancel-area {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(104, 104, 104, 0.5);
        z-index: 5;
    }
    
    .cancel-area-grab {
        cursor: grab;
    }
    
    .main-avatar {
        position: absolute;
        left: 0;
        top: 0;
        transform-origin: left top;
        z-index: -1;
        filter: brightness(70%);
    }
    
    .photo-picker {
        --diameter: 500px;
        position: absolute;
        top: calc(50% - var(--diameter) / 2);
        left: calc(50% - var(--diameter) / 2);
        width: var(--diameter);
        height: var(--diameter);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        background-color: white;
        
        border-radius: 10px;
        z-index: 1;
    }
    
    .avatar-rect {
        position: relative;
        overflow: hidden;
        width: 360px;
        height: 360px;
        margin: 70px;
        background-color: transparent;
        cursor: grab;
        border-radius: 6px;
        z-index: 1;
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
        margin: 20px;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        box-shadow: 0 0 2000px 2000px rgba(255, 255, 255, 0.5);
    }
    
    .close-picker {
        cursor: pointer;
        position: absolute;
        left: 20px;
        top: 20px;
    }
    
    .check-picker {
        cursor: pointer;
        position: absolute;
        right: 20px;
        bottom: 20px;
        background-color: var(--form-color);
        border: none;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-shadow: 0 1px 2px rgb(209, 212, 215);
    }
    
    .picker-caption {
        position: absolute;
        left: 68px;
        top: 2px;
    }
</style>
`;
    }
}

new App();
