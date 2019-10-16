import {TdlibType} from '../tdlib-type';

export class Supergroup extends TdlibType {
    date: number;
    id: number;
    is_channel: boolean;
    is_scam: boolean;
    is_verified: boolean;
    member_count: number;
    restriction_reason: string;
    sign_messages: boolean;
    status: TdlibType;
    username: string;
}
