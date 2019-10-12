import {TdlibType} from './tdlib-type';

export class CheckAuthenticationPassword extends TdlibType {
    password: string;

    constructor(password: string) {
        super();
        this['@type'] = 'checkAuthenticationPassword';

        this.password = password;
    }
}
