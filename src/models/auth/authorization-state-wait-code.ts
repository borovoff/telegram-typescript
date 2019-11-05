import {TdlibType} from "../tdlib-type";
import {AuthenticationCodeInfo} from "./authentication-code-info";

export class AuthorizationStateWaitCode extends TdlibType {
    code_info: AuthenticationCodeInfo;
}
