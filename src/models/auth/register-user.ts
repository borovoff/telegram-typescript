import {TdlibType} from "../tdlib-type";

export class RegisterUser extends TdlibType {
    first_name: string;
    last_name?: string;

    constructor(first_name: string, last_name?: string) {
        super('registerUser');

        this.first_name = first_name;
        this.last_name = last_name;
    }
}
