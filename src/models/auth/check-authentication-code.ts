import {TdlibType} from '../tdlib-type';

export class CheckAuthenticationCode extends TdlibType {
    code: string;

    constructor(code: string) {
        super();
        this['@type'] = 'checkAuthenticationCode';

        this.code = code;
    }

}
