import {TdlibType} from "../tdlib-type";
import {AuthenticationCodeTypeBase} from "./authentication-code-type-base";

export class AuthenticationCodeInfo extends TdlibType {
    next_type: AuthenticationCodeTypeBase;
    type: AuthenticationCodeTypeBase;
    phone_number: string;
    timeout: number;
}
