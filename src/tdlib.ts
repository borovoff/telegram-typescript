import TdClient from 'tdweb/dist/tdweb';
import {TdClientOptions} from "./models/td-client-options";
import {SetTdlibParameters} from './models/set-tdlib-parameters';
import {CheckDatabaseEncryptionKey} from './models/auth/check-database-encryption-key';
import {SetAuthenticationPhoneNumber} from './models/auth/set-authentication-phone-number';
import {Update} from './models/update';
import {CheckAuthenticationCode} from './models/auth/check-authentication-code';
import {CheckAuthenticationPassword} from './models/auth/check-authentication-password';
import {GetChats} from './models/chat/get-chats';
import {Chat} from './models/chat/chat';
import {UpdateChatLastMessage} from "./models/chat/update-chat-last-message";
import {UpdateListener} from "./models/update-listener";
import {UpdateChatOrder} from "./models/chat/update-chat-order";
import {LogOut} from "./models/log-out";
import {GetChatHistory} from "./models/chat/get-chat-history";
import {Error} from "./models/error";
import {Messages} from "./models/message/messages";
import {SendMessage} from "./models/message/send-message";
import {currentChatId} from "./current-chat-id";
import {InputMessageText} from "./models/message/input-message-text";
import {FormattedText} from "./models/message/formatted-text";
import {DownloadFile} from "./models/file/download-file";
import {File} from "./models/file/file";
import {fileStore} from "./stores/file-store";
import {ReadFile} from "./models/file/read-file";
import {Message} from "./models/message/message";
import {UpdateMessageSendSucceeded} from "./models/message/update-message-send-succeeded";
import {UpdateMessageContent} from "./models/message/update-message-content";
import {UpdateChatReadOutbox} from "./models/chat/update-chat-read-outbox";
import {UpdateAuthorizationState} from "./models/auth/update-authorization-state";
import {RegisterUser} from "./models/auth/register-user";
import {SECRET_HASH} from "./secret-hash";


export class Tdlib {
    private client: TdClient;

    authState = new UpdateListener<UpdateAuthorizationState>();
    chatLastMessage = new UpdateListener<UpdateChatLastMessage>();
    chatOrder = new UpdateListener<UpdateChatOrder>();
    newChat = new UpdateListener<Chat>();
    messages = new UpdateListener<Messages>();
    sendSucceeded = new UpdateListener<UpdateMessageSendSucceeded>();
    messageContent = new UpdateListener<UpdateMessageContent>();
    readOutbox = new UpdateListener<UpdateChatReadOutbox>();

    constructor() {
        this.createClient();
    }

    createClient() {
        const options: TdClientOptions = {
            logVerbosityLevel: 1,
            jsLogVerbosityLevel: 1,
            mode: 'wasm',
            prefix: 'tdlib',
            readOnly: false,
            isBackground: false,
            useDatabase: true,
            wasmUrl: 'b4b0d61282108a31908dd6b2dbd7067b.wasm?_sw-precache=b4b0d61282108a31908dd6b2dbd7067b'
        };

        this.client = new TdClient(options);

        this.setTdlibParameters();

        this.client.onUpdate = update => {
            console.log('receive update', update);
            const type = update['@type'];
            switch (type) {
                case Update.AuthorizationState:
                    this.authState.value = update;
                    break;
                case Update.Option:
                    break;
                case Update.SelectedBackground:
                    break;
                case Update.ConnectionState:
                    break;
                case Update.NewMessage:
                    break;
                case Update.UserStatus:
                    break;
                case Update.ScopeNotificationSettings:
                    break;
                case Update.HavePendingNotifications:
                    break;
                case Update.User:
                    break;
                case Update.NewChat:
                    this.newChat.value = update.chat;
                    break;
                case Update.ChatReadOutbox:
                    this.readOutbox.value = update;
                    break;
                case Update.ChatReadInbox:
                    break;
                case Update.ChatDraftMessage:
                    break;
                case Update.ChatNotificationSettings:
                    break;
                case Update.ChatLastMessage:
                    this.chatLastMessage.value = update;
                    break;
                case Update.ChatOrder:
                    this.chatOrder.value = update;
                    break;
                case Update.UserFullInfo:
                    break;
                case Update.Ok:
                    break;
                case Update.Supergroup:
                    break;
                case Update.BasicGroup:
                    break;
                case Update.SupergroupFullInfo:
                    break;
                case Update.UnreadMessageCount:
                    break;
                case Update.UnreadChatCount:
                    break;
                case Update.UserChatAction:
                    break;
                case Update.MessageViews:
                    break;
                case Update.DeleteMessages:
                    break;
                case Update.File:
                    fileStore.updateLocal(update.file);
                    break;
                case Update.MessageSendSucceeded:
                    this.sendSucceeded.value = update;
                    break;
                case Update.MessageContent:
                    this.messageContent.value = update;
                    break;
                case Update.MessageEdited:
                    break;
                case Update.BasicGroupFullInfo:
                    break;
                default:
                    console.log('default');
                    break;
            }
        };
    }

    private send(request: SetTdlibParameters | CheckDatabaseEncryptionKey | SetAuthenticationPhoneNumber | GetChats): Promise<any> {
        return this.client.send(request);
    }

    setAuthenticationPhoneNumber(phone: string): Promise<Error> {
        return this.send(new SetAuthenticationPhoneNumber(phone));
    }

    checkAuthenticationCode(code: string): Promise<Error> {
        return this.send(new CheckAuthenticationCode(code));
    }

    checkAuthenticationPassword(password: string): Promise<Error> {
        return this.send(new CheckAuthenticationPassword(password));
    }

    setTdlibParameters() {
        this.send(new SetTdlibParameters({
            '@type': 'tdParameters',
            use_test_dc: false,
            api_id: 113369,
            api_hash: SECRET_HASH,
            system_language_code: 'en',
            device_model: Tdlib.getBrowser(),
            system_version: Tdlib.getOSName(),
            application_version: '0.0.0',
            use_secret_chats: false,
            use_message_database: true,
            use_file_database: false,
            database_directory: '/db',
            files_directory: '/'
        }));
    }

    checkDatabaseEncryptionKey() {
        this.send(new CheckDatabaseEncryptionKey());
    }

    getChats() {
        this.send(new GetChats(0, 15));
    }

    appendChatHistory(chat_id: number, from_message_id): Promise<any> {
        return this.send(new GetChatHistory(chat_id, from_message_id));
    }

    getChatHistory(chat_id: number, lastMessage: Message) {
        this.send(new GetChatHistory(chat_id, lastMessage.id))
            .then((messages: Messages) => {
                messages.messages.unshift(lastMessage);
                this.messages.value = messages;
            })
            .catch((error: Error) => console.log('error: ', error))
    }

    logout() {
        this.send(new LogOut());
    }

    sendMessage(text: string) {
        const inputMessageText = new InputMessageText(new FormattedText(text));
        console.log(inputMessageText);

        this.send(new SendMessage(currentChatId.value, inputMessageText));
    }

    downloadFile(file: File) {
        this.send(new DownloadFile(file.id));
    }

    readFile(file_id: number) {
        return this.send(new ReadFile(file_id));
    }

    registerUser(first_name: string, last_name?: string) {
        return this.send(new RegisterUser(first_name, last_name))
    }

    private static getOSName() {
        const userAgent = navigator.userAgent;

        if (userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
        if (userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
        if (userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
        if (userAgent.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
        if (userAgent.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
        if (userAgent.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
        if (userAgent.indexOf('Mac') !== -1) return 'Mac/iOS';
        if (userAgent.indexOf('X11') !== -1) return 'UNIX';
        if (userAgent.indexOf('Linux') !== -1) return 'Linux';

        return 'Unknown';
    }

    private static getBrowser() {
        let browser_name = '';
        // @ts-ignore
        const documentMode = document.documentMode;

        let isIE = /*@cc_on!@*/ !!documentMode;
        let isEdge = !isIE && !!window.styleMedia;
        if (navigator.userAgent.indexOf('Chrome') !== -1 && !isEdge) {
            browser_name = 'Chrome';
        } else if (navigator.userAgent.indexOf('Safari') !== -1 && !isEdge) {
            browser_name = 'Safari';
        } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
            browser_name = 'Firefox';
        } else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!documentMode === true) {
            //IF IE > 10
            browser_name = 'IE';
        } else if (isEdge) {
            browser_name = 'Edge';
        } else {
            browser_name = 'Unknown';
        }

        return browser_name;
    }
}

export const tdlib = new Tdlib();
