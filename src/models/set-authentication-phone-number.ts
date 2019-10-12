import {TdlibType} from './tdlib-type';

export class SetAuthenticationPhoneNumber extends TdlibType {
    phone_number: string;

    constructor(phone_number: string) {
        super();
        this['@type'] = 'setAuthenticationPhoneNumber';

        this.phone_number = phone_number;
    }
}
