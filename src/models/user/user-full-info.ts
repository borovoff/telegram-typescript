import {TdlibType} from '../tdlib-type';

export class UserFullInfo extends TdlibType {
    bio: string;
    can_be_called: boolean;
    group_in_common_count: number;
    has_private_calls: boolean;
    is_blocked: boolean;
    share_text: string;
}
