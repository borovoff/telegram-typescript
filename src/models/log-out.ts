import {TdlibType} from "./tdlib-type";

export class LogOut extends TdlibType {
    constructor() {
        super();
        this["@type"] = 'logOut';
    }
}