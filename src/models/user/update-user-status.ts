import {TdlibType} from '../tdlib-type';
import {UserStatusOffline} from './user-status-offline';
import {UserStatusOnline} from './user-status-online';

export class UpdateUserStatus extends TdlibType {
    status: UserStatusOffline | UserStatusOnline;
    user_id: number;
}
