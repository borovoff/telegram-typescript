import {TdlibType} from '../tdlib-type';
import {UserStatusOffline} from './user-status-offline';

export class User extends TdlibType {
    first_name: string;
    have_access: true;
    id: number;
    incoming_link: TdlibType;
    is_scam: boolean;
    is_support: boolean;
    is_verified: boolean;
    language_code: string;
    last_name: string;
    outgoing_link: TdlibType;
    phone_number: string;
    restriction_reason: string;
    status: UserStatusOffline;
    type: TdlibType;
    username: string;
}
