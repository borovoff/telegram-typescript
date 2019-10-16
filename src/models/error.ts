import {TdlibType} from "./tdlib-type";
import {ErrorMessage} from "./error-message";

export class Error extends TdlibType {
    code: number;
    message: ErrorMessage;
}
