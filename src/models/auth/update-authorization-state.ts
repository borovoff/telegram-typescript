import {TdlibType} from "../tdlib-type";
import {AuthorizationStateWaitCode} from "./authorization-state-wait-code";

export class UpdateAuthorizationState extends TdlibType {
    authorization_state: AuthorizationStateWaitCode;
}
